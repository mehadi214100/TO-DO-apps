document.addEventListener("DOMContentLoaded", showData);

function showData() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => addTaskToDOM(task));
}

function addTaskToDOM(task) {
    let taskList = document.getElementById("taskList");
    let element = document.createElement("li");
    element.innerHTML = `
        <span>${task}</span>
        <div>
            <button class="mybtn" onclick="editTask(this)" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                Edit
            </button>
            <button class="mybtn delete" onclick="deleteTask(this)">
                Delete
            </button>
        </div>
    `;
    taskList.appendChild(element);
}

function localSave(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
    let taskInput = document.getElementById("task");
    let task = taskInput.value.trim();
    if (task === "") {
        alert("Task cannot be empty!");
        return;
    }
    addTaskToDOM(task);
    localSave(task);
    taskInput.value = "";
}

function deleteTask(element) {
    let li = element.parentElement.parentElement;
    let task = li.firstElementChild.innerText;
    li.remove();
    
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(data => data !== task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function editTask(element) {
    let oldTask = element.parentElement.parentElement.firstElementChild.innerText;
    document.getElementById("previus-data").value = oldTask;
    document.getElementById("update-data").value = "";
    localStorage.setItem("oldTask", JSON.stringify(oldTask));
}

function updateData() {
    let updatedTask = document.getElementById("update-data").value.trim();
    let oldTask = JSON.parse(localStorage.getItem("oldTask"));
    
    if (!updatedTask) {
        alert("Updated task cannot be empty!");
        return;
    }
    
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let index = tasks.indexOf(oldTask);
    if (index !== -1) {
        tasks[index] = updatedTask;
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
    location.reload();
}

function exitBtn(){
    location.reload();
}