let selectedTag = null;
let selectedTagId = null;
let todos = [];
let todoIds = []

// window.localStorage.clear()

function onFormSubmit() {

    
    if (selectedTag === null) {
        insertNewRecord(readFormData());  
    } else {
        data = document.getElementById("todoInputId").value;
        // console.log(data)
        updateRecord(data);
    }
    
    resetForm();
    
}

function readFormData() {
    var formData = {};
    let resultId = JSON.parse(window.localStorage.getItem("idCode"));
    let todoResults = JSON.parse(window.localStorage.getItem("todoCodes")) || [];

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

function appDate () {

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


    const currentDate = new Date();
    const currentHour = currentDate.getHours() + 1
    const currentMinute = currentDate.getMinutes()
    const currentDateOfWeek = currentDate.getDate()
    const currentDayOfWeek = currentDate.getDay();
    const currentMonth = currentDate.getMonth(); // Be careful! January is 0, not 1
    const currentYear = currentDate.getFullYear();

   
    return `${days[currentDayOfWeek]}, ${currentDateOfWeek} ${months[currentMonth]} ${currentYear}, ${currentHour}:${currentMinute}`
}

function insertNewRecord(data) {

        var todoTitle = document.createElement('h5');
        todoTitle.setAttribute("id", `${data.id}h5`);
        todoTitle.classList.add('mb-auto', 'todoText');

        //todo Date
        var todoDate = document.createElement('p');
        todoDate.setAttribute("id", `${data.id}todoDate`);
        todoDate.classList.add('ptag');
        todoDate.innerHTML = data.date;
    
        //todo text div
        var textDiv = document.createElement('div');
        textDiv.setAttribute("id", `${data.id}textDiv`);
        textDiv.classList.add('todoTextDiv', 'col-8', 'mr-auto', 'd-flex', 'flex-column');
    
        textDiv.appendChild(todoTitle);
        textDiv.appendChild(todoDate);
        // console.log(`${data.id}`)
    
        todoTitle.textContent = data.todoInput;

        var newTodoDiv = document.createElement('div');
        newTodoDiv.setAttribute("id", `${data.id}newTododiv`);
        newTodoDiv.classList.add('todoDiv1', 'row');

        var iconDiv = document.createElement('div');
        iconDiv.setAttribute("id", `${data.id}icondiv`);
        iconDiv.classList.add('icons', 'd-flex', 'align-items-end');

        iconDiv.innerHTML = `<a class="ml-3" onclick="onCopy(this);" id=${data.id}><i class="far fa-save"></i></a> 
    <a class="ml-3" onClick="onEdit(this);" id=${data.id}><i class="fas fa-edit"></i></a> 
    <a class="ml-3 mr-3" onClick="onDelete(this);" id=${data.id}><i class="fas fa-trash"></i></a>`;
    
        newTodoDiv.appendChild(textDiv);
        newTodoDiv.appendChild(iconDiv);

        var todoDiv = document.querySelector('#todoDiv');
        todoDiv.appendChild(newTodoDiv);
};

function preTodos() {
    
    let result = JSON.parse(window.localStorage.getItem("todoCodes"));

    result.forEach((el) => {

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
    
    
    })
};


function resetForm() {
    document.getElementById("todoInputId").value = " ";
    selectedTag = null;
}

function onEdit(ele) {

    selectedTag = ele.parentElement.firstElementChild.firstElementChild
    selectedTagId = ele.id;
    
    document.getElementById("todoInputId").value = document.getElementById(`${ele.id}h5`).innerHTML;

}

function updateRecord(data) {
     let result = JSON.parse(window.localStorage.getItem("todoCodes"));

    document.getElementById(`${selectedTagId}h5`).innerText = data;
    
    result.forEach((el) => { 
        if (selectedTagId == el.id) {
            // console.log(`el.id: ${el.id} ..... selectedTagId: ${selectedTagId}`)
            el.todoInput = data; 
            // console.log(`el.todoInput: ${el.todoInput}`)

        }
    });
    window.localStorage.removeItem('todoCodes');
    window.localStorage.setItem("todoCodes", JSON.stringify(result));
    
}

function onDelete(ele) {
    let result = JSON.parse(window.localStorage.getItem("todoCodes"));
    let newResult = [];
    selectedTagId = ele.id;
    document.getElementById(`${selectedTagId}newTododiv`).remove();
    
    result.forEach((el) => { 

        if (selectedTagId != el.id) {
            // console.log(`el.id: ${el.id} ..... selectedTagId: ${selectedTagId}`)
            newResult.push(el); 
            // console.log(`el.todoInput: ${el.todoInput}`)

        }
    });
    window.localStorage.removeItem('todoCodes');
    window.localStorage.setItem("todoCodes", JSON.stringify(newResult));    
}

function onCopy(ele) {
    selectedTagId = ele.id;
    /* Get the text field */
    var text = document.getElementById(`${selectedTagId}h5`).innerHTML;
    document.getElementById("todoInputId").value = text;
    var copyText = document.getElementById("todoInputId");
    copyText.select();
    document.execCommand("copy");
    resetForm()
    alert("Copied the text: " + copyText.value);
}  

let search_Input = document.getElementById("search_Input");
search_Input.addEventListener("keyup", function (e) {
    let search_item = e.key.toLowerCase();

    searchTodo(search_item);

})


function searchTodo(search_item) {
    
    let todoDiv = document.getElementById("todoDiv");

    let result = JSON.parse(window.localStorage.getItem("todoCodes"));
    
    // let search_item = e.target.value.toLowerCase();
        
    
        result.forEach((todo) => {
        
            if (todo.todoInput.toLowerCase().indexOf(search_item) != -1) {
           
                document.getElementById(`${todo.id}newTododiv`).closest("div").style.display = "block";
            
            }else {
                document.getElementById(`${todo.id}newTododiv`).closest("div").style.display = "none";  
            } 
        })

}

preTodos();
