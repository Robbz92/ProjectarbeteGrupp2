let myArr = [];
let dataID;
let myCategoryArr=[];
let categoryID;
// Add todoItem to db

getJSON();
getCategoryJSON();
function addToDo(){
    let desc = document.querySelector("#ToDo");

    if(desc.value == ""){
        alert("You need to enter a text!");
    }
    else{
        POSTJSON(desc.value)
    }
}
async function POSTJSON(desc){
    // the text is the key that we use to fetch the json text with
    let objJSON = JSON.stringify({text: desc});

    // send object to /rest/notes
    let result = await fetch("/rest/notes", {
        method: "POST",
        body: objJSON
    });

    // Continue here to fetch a JSON object from db..
    getJSON();
}

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
         <li id="li">
            ${content.text}
        
             <span class="close" id="myID" data-id="${content.id}">x</span>
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




function addCategory(){
    
    //create a new category
    

    if(categoryInput.value == ""){
        alert("You need to enter a text!");
    }
    else{
        categoryPOSTJSON(categoryInput.value)
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
async function categoryPOSTJSON(categoryInput){
    // the text is the key that we use to fetch the json text with
    let categoryObjJSON = JSON.stringify({text: categoryInput});

    // send object to /rest/notes
    let result = await fetch("/rest/index", {
        method: "POST",
        body: categoryObjJSON
    });

    // Continue here to fetch a JSON object from db..
    getCategoryJSON();
}
async function getCategoryJSON(){
    console.log("tjoho")
    let result = await fetch("/rest/index");

    content = await result.json();
    myCategoryArr = content;

    console.log(myCategoryArr);

    rendCategories();
}
function rendCategories(){
    newCategoryList = document.querySelector(".category-list");
    newCategoryList.innerHTML = "";

    for(let categoryContent of myCategoryArr){
        let categoryLi = `
         <li>
            ${categoryContent.category}
        
             <span class="categoryClose" data-id="${categoryContent.id}">x</span>
         </li>
        `;
        newCategoryList.innerHTML += categoryLi;
    }
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
        async function postCategoryDataID(){
            let categoryDataIDJSON = JSON.stringify({id: categoryID});
        
            let result = await fetch("/rest/index", {
                method: "POST",
                body: categoryDataIDJSON
            });
        }
