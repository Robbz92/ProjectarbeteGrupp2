let myArr = [];
// Add todoItem to db

getJSON();

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
                
                <span data-id="${content.id}"></span>
            </li>
        `;
        noteList.innerHTML += textLi;
    }
}
const categoryInput= document.querySelector('.category-input');
const categoryList= document.querySelector('.category-list');

var categoryID=1;


function addCategory(){
    
    //create a new category
const categoryDiv= document.createElement('div');
categoryDiv.classList.add("category");

const newCategory=document.createElement('li');
newCategory.innerText=categoryInput.value;
newCategory.classList.add('category-item');
categoryDiv.appendChild(newCategory);

categoryList.appendChild(categoryDiv);

newCategory.id=categoryID;



categoryID++;

categoryInput.value= "";


}
