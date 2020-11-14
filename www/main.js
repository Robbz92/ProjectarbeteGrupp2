let myArr = [];
let dataID;
let myCategoryArr=[];
let categoryDataID;
// Add todoItem to db
getCategoryJSON(); // display current categorys


// sends text from textbox with button to db
function addToDo(){
    let desc = document.querySelector("#ToDo");

    if(desc.value == ""){
        alert("You need to enter a text!");
    }
    else{
        POSTJSON(desc.value, "/rest/notes");
        //getJSON();
        getCatagoryJSON();
    }
    desc.value="";
}

async function POSTJSON(value, path) {

    const json = JSON.stringify({text: value});
    const result = await fetch(path, {
        method: "POST",
        body: json
    });
    
    return await result.json();
}

// Do not touch, we need this to rend text correctly.
async function getJSON(){
    let result = await fetch("/rest/test");

    content = await result.json();
    myArr = content

    console.log(myArr);

    rendText();
}

function rendText(){
    noteList = document.querySelector("#myList");
    noteList.innerHTML = "";

    for(let content of myArr){
        let textLi = `
         <li class="close">
            ${content.text}
        
             <span id="myID" data-id="${content.id}">x</span>
         </li>
        `;
        noteList.innerHTML += textLi;
    }
     // remove item from span
     $('.close').mousedown(function(event) { 
        console.log('event',event.which);
        switch (event.which) { 
            case 1: dataID = parseInt(event.target.dataset.id); postDataID(); getJSON();
            break;
            default: console.log(`Sorry, we are out of index.`);
        } 
    }); 
}

async function postDataID(){
    let dataIDJSON = JSON.stringify({id: dataID});

    let result = await fetch("/rest/dataID", {
        method: "POST",
        body: dataIDJSON
    });
}


const categoryInput= document.querySelector('.category-input');
const categoryList= document.querySelector('.category-list');



// for new category
function addCategory(){
    
    //create a new category

    if(categoryInput.value == ""){
        alert("You need to enter a text!");
    }
    else{
        POSTJSON(categoryInput.value, "/rest/index");
        getCategoryJSON()
    }
    console.log("hallå")
    const categoryDiv= document.createElement('div');
    categoryDiv.classList.add("category");

    const newCategory=document.createElement('li');
    newCategory.innerText=categoryInput.value;
    newCategory.classList.add('category-item');
    categoryDiv.appendChild(newCategory);

    categoryList.appendChild(categoryDiv);

    categoryInput.value= "";


}
async function getCategoryJSON(){
    if(categoryDataID == 1){
        alert("You cannot delete all categories");
    }
    else{
        let result = await fetch("/rest/index");

        content = await result.json();
        myCategoryArr = content;

        console.log(myCategoryArr);

        rendCategories();
    }
}

function rendCategories(){
    newCategoryList = document.querySelector(".category-list");
    newCategoryList.innerHTML = "";

    for(let categoryContent of myCategoryArr){
        let categoryLi = `
         <li class="category-item" data-id="${categoryContent.categoryID}">
            ${categoryContent.category}
               
             <span class="categoryClose" data-id="${categoryContent.categoryID}">x</span>
         </li>
        `;
        
        newCategoryList.innerHTML += categoryLi;
    }
     
     $('.category-item').mousedown(function(event) {
        showToDo()
        console.log('event',event.which);
        switch (event.which) { 
            case 1: categoryDataID = parseInt(event.target.dataset.id); sendCatagoryDataID();
            break;
        } 
    });
      // remove item from span
      $('.categoryClose').mousedown(function(event) { 
        console.log('event',event.which);
        switch (event.which) { 
            case 1: categoryDataID = parseInt(event.target.dataset.id); postCategoryDataID(); getCategoryJSON();
            break;
            default: console.log(`Sorry, we are out of index.`);
        } 
    });
    
}
// delete category
async function postCategoryDataID(){
    let categoryDataIDJSON = JSON.stringify({id: categoryDataID});

    let result = await fetch("/rest/index2", {
        method: "POST",
        body: categoryDataIDJSON
    });
}

// skickar id på den text man trycker på (categorys)
async function sendCatagoryDataID(){
    let categoryDataIDJSON = JSON.stringify({id: categoryDataID});
    let result = await fetch("/rest/currID", {
        method: "POST",
        body: categoryDataIDJSON
    });
    getCatagoryJSON();
}

async function getCatagoryJSON(){

    if(categoryDataID == 1){
        let result = await fetch("/rest/test");

        content = await result.json();
        myArr = content

        console.log(myArr);

        rendSelectiveText();
    }

    else{
        let result = await fetch("/rest/appet");

        content = await result.json();
        myArr = content

        console.log(myArr);

        rendSelectiveText();
    }
}

function rendSelectiveText(){
    noteList = document.querySelector("#myList");
    noteList.innerHTML = "";

    for(let content of myArr){
        let textLi = `
            <li class="some">
            ${content.text}
                <span id="newID" data-id="${content.id}">x</span>
            </li>
        `;
        noteList.innerHTML += textLi;
    }

        // remove item from span
        $('.some').mousedown(function(event) { 
        console.log('event',event.which);
        switch (event.which) { 
            case 1: dataID = parseInt(event.target.dataset.id); postDataID(); getCatagoryJSON();
            break;
            default: console.log(`Sorry, we are out of index.`);
        } 
    }); 
}

//Hantering av bilder

// skapar array med posts
let posts = [];
getPosts();

async function getPosts(){
    let result = await fetch('/rest/posts');
    posts = await result.json();

    console.log(posts);

    renderPosts();
}

function renderPosts(){
    let postList = document.querySelector("#post-list");
    postList.innerHTML = "";

    for(let post of posts){
        let date = new Date(post.timestamp).toLocaleString();

        let postLi = `
            <li>
                <br>
                <img src="${post.imageUrl}" alt="post-image">
                id: ${post.id} <br>
                published: ${date} <br>
                <h3>:${post.title}</h3>

                <p>${post.content}</p><br>
            </li> <br>
        `;

        postList.innerHTML += postLi;
    }
}

async function createPost(e){
    e.preventDefault();

    // upload image, formdata
    let files = document.querySelector('input[type=file]').files;
    let fromData = new FormData();

    for(let file of files){
        fromData.append('files', file, file.name);
    }

    // upload selected files to server
    let uploadResult = await fetch('/api/file-upload', {
        method: 'POST',
        body: fromData
    });

    let imageUrl = await uploadResult.text();

    let titleInput = document.querySelector('#title');
    let contentInput = document.querySelector('#content');

    let post = {
        title: titleInput.value,
        content: contentInput.value,
        imageUrl: imageUrl
    }

    let result = await fetch("/rest/posts", {
        method: "POST",
        body: JSON.stringify(post)
    });

    posts.push(post);

    console.log(await result.text());
}

function filterOut(){
    getJSON();
}

async function getTextPost(){
    getTextContent();
}

async function getTextContent(){
    let result = await fetch('/rest/textFile');
    posts = await result.json();
    myArr = posts;
    console.log(posts);

    rendTextFileContent();
}

function rendTextFileContent(){
    noteList = document.querySelector("#textContent");
    noteList.innerHTML = "";

    for(let content of myArr){
        let textLi = `
         <li>
            ${content}
         </li>
        `;
        noteList.innerHTML += textLi;
    }
}
function hideToDo(){
    document.getElementById('todoInput').style.display="none"
    document.getElementById("chooseCategory").style.display="block"
}
function showToDo(){
document.getElementById('todoInput').style.display="block"
document.getElementById("chooseCategory").style.display="none"
}