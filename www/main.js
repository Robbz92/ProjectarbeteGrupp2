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
