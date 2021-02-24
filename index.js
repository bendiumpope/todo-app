/* GLOBAL VARIABLE DECLARATION */
let selectedTag = null;
let selectedTagId = null;
let todos = [];
let todoIds = []
let resultId = JSON.parse(window.localStorage.getItem("idCode"));
let todoResults = JSON.parse(window.localStorage.getItem("todoCodes")) || [];


function onFormSubmit() {

    if (selectedTag === null) {
        insertNewTodo(readFormData());  
    } else {
        data = document.getElementById("todoInputId").value;
        updateRecord(data);
    }
    
    resetForm();
}

/* readFormData() function reads data from input and 
handles insertion to local storage then return the read data */

function readFormData() {
    var formData = {};

    if (resultId === null) {
        formData["id"] = 0
    } else {
        formData["id"] = resultId[resultId.length - 1] + 1;
    }

    formData["todoInput"] = document.getElementById("todoInputId").value;
    formData["date"] = appDate();
    todoIds.push(formData["id"]);
    todos.push(formData);
    
    if (resultId === null) {
        window.localStorage.setItem("todoCodes", JSON.stringify(todos));
        window.localStorage.setItem("idCode", JSON.stringify(todoIds));       
    } else {
        let newId = (resultId[resultId.length - 1] * 1) + 1;
        resultId.push(newId);
        window.localStorage.setItem("idCode", JSON.stringify(resultId));
        todoResults.push(formData)
        window.localStorage.setItem("todoCodes", JSON.stringify(todoResults));
    }

    return formData;
}


/* insertNewTodo(data) function calls the appendTodo(data) 
function to populate the dom with the input data */

function insertNewTodo(data) {
        appendTodos(data);
};

/* preTodos(todoArray) function calls the appendTodo(el) 
function to populate the dom with the todos from read from
 the local storage */

function preTodos(todosArray) {

   todosArray.forEach((el) => { 
        appendTodos(el)

   });    
};

/* appendTodos(el) function recieves a todo and populate the 
dom with the todo recieved */

function appendTodos(el) {

        //todo Text
        var todoTitle = document.createElement('h5');
        todoTitle.setAttribute("id", `${el.id}h5`);
        todoTitle.classList.add('mb-auto', 'todoText');

        //todo Date
        var todoDate = document.createElement('p');
        todoDate.setAttribute("id", `${el.id}todoDate`);
        todoDate.classList.add('ptag');
        todoDate.innerHTML = el.date;
    
        //todo text div
        var textDiv = document.createElement('div');
        textDiv.setAttribute("id", `${el.id}textDiv`);
        textDiv.classList.add('todoTextDiv', 'col-8', 'mr-auto', 'd-flex', 'flex-column');
    
        textDiv.appendChild(todoTitle);
        textDiv.appendChild(todoDate);
    
        todoTitle.textContent = el.todoInput;

        var newTodoDiv = document.createElement('div');
        newTodoDiv.setAttribute("id", `${el.id}newTododiv`);
        newTodoDiv.classList.add('todoDiv1', 'row');

        var iconDiv = document.createElement('div');
        iconDiv.setAttribute("id", `${el.id}icondiv`);
        iconDiv.classList.add('icons', 'd-flex', 'align-items-end');

        iconDiv.innerHTML = `<a class="ml-3" onclick="onCopy(this);" id=${el.id}><i class="far fa-save"></i></a> 
    <a class="ml-3" onClick="onEdit(this);" id=${el.id}><i class="fas fa-edit"></i></a> 
    <a class="ml-3 mr-3" onClick="onDelete(this);" id=${el.id}><i class="fas fa-trash"></i></a>`;
    
        newTodoDiv.appendChild(textDiv);
        newTodoDiv.appendChild(iconDiv);

        var todoDiv = document.querySelector('#todoDiv');
        todoDiv.appendChild(newTodoDiv);

};

/* resetForm() function resets the inputfield */

function resetForm() {
    document.getElementById("todoInputId").value = " ";
    selectedTag = null;
}


function onEdit(ele) {

    let saveTodo = document.getElementById("saveTodo");
    selectedTag = ele.parentElement.firstElementChild.firstElementChild
    selectedTagId = ele.id;
    
    if(saveTodo.value == "Add Todo"){
        saveTodo.value = "Save Todo"
    }    
    document.getElementById("todoInputId").value = document.getElementById(`${ele.id}h5`).innerHTML;

}


function updateRecord(data) {
     let result = JSON.parse(window.localStorage.getItem("todoCodes"));

    document.getElementById(`${selectedTagId}h5`).innerText = data;
    let saveTodo = document.getElementById("saveTodo");

    result.forEach((el) => { 

        if (selectedTagId == el.id) {

            if(saveTodo.value == "Save Todo"){
                saveTodo.value = "Add Todo"
            }
            el.todoInput = data;  

        }
    });
    window.localStorage.removeItem('todoCodes');
    window.localStorage.setItem("todoCodes", JSON.stringify(result));
    
}

function onDelete(ele) {
    
    let newResult = [];
    selectedTagId = ele.id;
    document.getElementById(`${selectedTagId}newTododiv`).remove();
    
    todoResults.forEach((el) => { 

        if (selectedTagId != el.id) {
            newResult.push(el); 
        }
    });
    window.localStorage.removeItem('todoCodes');
    window.localStorage.setItem("todoCodes", JSON.stringify(newResult));    
}


function onCopy(ele) {

    selectedTagId = ele.id;
    var text = document.getElementById(`${selectedTagId}h5`).innerHTML;
    document.getElementById("todoInputId").value = text;
    var copyText = document.getElementById("todoInputId");
    copyText.select();
    document.execCommand("copy");
    resetForm()
    alert("Copied: " + text);
}  

/* Dynamic Search */
let search_Input = document.getElementById("search_Input");
search_Input.addEventListener("keyup", function (e) {
    let search_item = e.target.value.toLowerCase();

    searchTodo(search_item);

})

/* searchTodo(search_item) function recieves a search item and populate the 
dom with the todos that matches the search item recieved */

function searchTodo(search_item) {
    
    let todoDiv = document.getElementById("todoDiv");

    let result = JSON.parse(window.localStorage.getItem("todoCodes"));
    
        result.forEach((todo) => {
        
            if (todo.todoInput.toLowerCase().indexOf(search_item) != -1) {
           
                document.getElementById(`${todo.id}newTododiv`).closest("div").style.display = "block";
            }else {
                document.getElementById(`${todo.id}newTododiv`).closest("div").style.display = "none"; 
            } 
        })

}

/* appDate() function returns the formated date, day, 
month, year and time the todo was created */

function appDate () {

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


    const currentDate = new Date();
    const currentHour = currentDate.getHours() + 1
    const currentMinute = currentDate.getMinutes()
    const currentDateOfWeek = currentDate.getDate()
    const currentDayOfWeek = currentDate.getDay();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

   
    return `${days[currentDayOfWeek]}, ${currentDateOfWeek} ${months[currentMonth]} ${currentYear}, ${currentHour}:${currentMinute}`
}

preTodos(todoResults);
