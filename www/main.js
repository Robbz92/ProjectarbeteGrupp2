// Add todoItem to db
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
}