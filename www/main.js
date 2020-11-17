let myArr = [];
let dataID;
let myCategoryArr=[];
let categoryDataID = 0;

// Add todoItem to db
getCategoryJSON(); // display current categorys
populateAllTodos();

// sends text from textbox with button to db
function addToDo(){
    let desc = document.querySelector("#ToDo");

    if(desc.value == ""){
        alert("You need to enter a text!");
    }
    else{
        performPOST("/rest/notes", JSON.stringify({text: desc.value}));
        getCatagoryJSON();
    }
    desc.value="";
}

// Do not touch, we need this to rend text correctly.
async function populateAllTodos(){
    let result = await fetch("/rest/test");

    content = await result.json();
    myArr = content

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
        switch (event.which) { 
            case 1: dataID = parseInt(event.target.dataset.id); postDataID(); populateAllTodos();
            break;
            default: console.log(`Sorry, we are out of index.`);
        } 
    }); 
}

async function postDataID(){
    performPOST("/rest/dataID", JSON.stringify({id: dataID}));
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
    performPOST("/rest/index", JSON.stringify({text: categoryInput.value}));
    getCategoryJSON()

}
categoryInput.value="";
}

async function getCategoryJSON(){
   
        let result = await fetch("/rest/index");
        content = await result.json(); // seems like this is broken sometimes.
        myCategoryArr = content;

        rendCategories();
    
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
        switch (event.which) { 
            case 1: {
                categoryDataID = parseInt(event.target.dataset.id); 
                sendCatagoryDataID();
            }
            break;
        } 
    });
      // remove item from span
      $('.categoryClose').mousedown(function(event) {
        switch (event.which) { 
            case 1: categoryDataID = parseInt(event.target.dataset.id); postCategoryDataID(); getCategoryJSON();
            break;
            default: console.log(`Sorry, we are out of index.`);
        } 
    });
    
}
// delete category
async function postCategoryDataID(){
    performPOST("/rest/index2", JSON.stringify({id: categoryDataID}));
}

// skickar id på den text man trycker på (categorys)
async function sendCatagoryDataID(){
    performPOST("/rest/currID", JSON.stringify({id: categoryDataID}));
    getCatagoryJSON();
}

async function getCatagoryJSON(){
    const path = categoryDataID === 1 ? "/rest/test" : "/rest/appet";
    let result = await fetch(path);
    content = await result.json();
    myArr = content

    rendSelectiveText();
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
        switch (event.which) { 
            case 1: dataID = parseInt(event.target.dataset.id); postDataID(); getCatagoryJSON();
            break;
            default: console.log(`Sorry, we are out of index.`);
        } 
    }); 
}

//Hantering av bilder
let posts = [];
getPosts();

// rätt grejor för drop
async function getPosts(){
    let result = await fetch('/rest/posts');
    posts = await result.json();

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
    let files = document.querySelector('#imagesinput').files;
    let fromData = new FormData();

    for(let file of files){
        fromData.append('files', file, file.name);
    }

    // upload selected files to server
    let imageUrl = await performPOST('/api/file-upload', fromData, 'text');

    let titleInput = document.querySelector('#title');
    let contentInput = document.querySelector('#content');

    let post = {
        title: titleInput.value,
        content: contentInput.value,
        imageUrl: imageUrl
    }

    let result = await performPOST("/rest/posts", JSON.stringify(post), 'text');
    
    posts.push(post);
}

function filterOut(){
    populateAllTodos();
}

function rendTextFileContent(){
    noteList = document.querySelector("#textContent");
    noteList.innerHTML = `
    <li>
       ${myArr}
    </li>
   `;
}

getTextPosts();
async function textFiles(){

    document.getElementById('inputfileID') 
    .addEventListener('change', async function() { 
        
        var fr=new FileReader(); 
        fr.onload=function(){ 
            document.getElementById('output') 
            .textContent=fr.result; 
        } 
        
        fr.readAsText(this.files[0]); 
        var fileInput = document.getElementById('inputfileID');
        var textFilename = fileInput.files[0].name;

        // upload image, formdata
        let files = document.querySelector('input[type=file]').files;
        let fromData = new FormData();
    
        for(let file of files){
            fromData.append('files', file, textFilename);
        }
    
        // upload selected files to server
        let uploadResult = await fetch('/api/file-upload', {
            method: 'POST',
            body: fromData
        });
    
        let imageUrl = await uploadResult.text();
    
        let titleInput = textFilename;
    
        let post = {
            title: titleInput,
            imageUrl: imageUrl
        }
    
        let result = await fetch("/rest/posts", {
            method: "POST",
            body: JSON.stringify(post)
        });
    
        posts.push(post);
    
    });
    getTextPosts();
}
async function getTextPosts(){
    let result = await fetch('/rest/textFiles');
    posts = await result.json();
    myArr=posts;
    
    renderTextPosts();
}
function renderTextPosts(){
    let postList = document.querySelector("#dropDownID");
    postList.innerHTML = "";

    for(let post of myArr){

        let postLi = `
            <option class="testOptionClass" data-id=${post.id}>
            ${post.title}
            </option>
            
        `;

        postList.innerHTML += postLi;
    }
    $('#dropDownID').change(function(){
        dataID = $(this).find('option:selected').attr('data-id')
        postTextFileID();
    })
}
async function postTextFileID(){
    myArr = await performPOST('/rest/textFile', JSON.stringify({id: dataID}), "json");
    rendTextFileContent();
}

// depending on return_type it doesnt do anything or converts to text or converts to json
// if return_type is null it doesnt convert anything
// if its 'json' itll try to convert to json
/// otherwise itll convert to text
async function performPOST(path, data, return_type=null) {   
    let result = await fetch(path, {
        method: "POST",
        body: data
    });
    
    if(return_type) {
        try{    
            const text = await result.text();
            if (return_type === "json"){
                return JSON.parse(text);
            } else {
                return text;
            }
        }catch(err) {
            console.error(err, err.stack);
            return null;
        }
    } else {
        return null;
    }
}

function hideToDo(){
    document.getElementById('todoInput').style.display="none"
    document.getElementById("chooseCategory").style.display="block"
    populateAllTodos();
}
function showToDo(){
document.getElementById('todoInput').style.display="block"
document.getElementById("chooseCategory").style.display="none"
}