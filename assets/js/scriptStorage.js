function getElementById(eleId) {
    return document.getElementById(eleId);
}

function getCurrentDateTimeValue() {
    const now = new Date();

    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = now.getFullYear();

    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? String(hours).padStart(2, "0") : "12";

    const dateTimeValue = `${day}${month}${year}${String(
        now.getHours()
    ).padStart(2, "0")}${minutes}`;
    const formattedTime = `${hours}:${minutes}:${seconds} ${ampm}`;
    const formattedDate = `${day}-${month}-${year}`;

    return [dateTimeValue, formattedTime, formattedDate];
}

function saveTaskToLocalStorage(taskId, taskDescription, createdAt) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ taskId, taskDescription, createdAt });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function deleteTaskFromLocalStorage(taskId) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let newTasks = [];
    tasks.forEach((task) => {
        if (task.taskId !== taskId) {
            newTasks.push(task);
        }
    });
    console.log(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
}

function loadTasksFromLocalStorage() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((task) => {
        addTaskToDOM(task.taskId, task.taskDescription, task.createdAt);
    });
}

function addTaskToDOM(taskId, taskDescription, createdAt) {
    const taskList = getElementById("task-list");
    let taskItem = document.createElement("li");
    taskItem.id = taskId;
    const taskItemFormat = `
        <div class="card" id="${taskId}_Card">
            <p id="${taskId}_Description">
                ${taskDescription}<br>
                <span>Created at ${createdAt}</span>
            </p>
            <button type="button" class="delete-button" id="${taskId}_Button" onclick="deleteTaskItem('${taskId}')">Delete Task</button>
        </div>`;
    taskItem.innerHTML = taskItemFormat;
    taskList.appendChild(taskItem);
}

function taskItemCreation() {
    const taskInput = getElementById("task-input");
    let taskDescription = taskInput.value;
    const [taskId, formattedTime, formattedDate] = getCurrentDateTimeValue();
    const createdAt = `${formattedTime} on ${formattedDate}`;

    addTaskToDOM(taskId, taskDescription, createdAt);
    saveTaskToLocalStorage(taskId, taskDescription, createdAt);
    taskInput.value = "";
}

function deleteTaskItem(taskId) {
    let taskItem = getElementById(taskId);
    taskItem.remove();
    deleteTaskFromLocalStorage(taskId);
}

const addButton = getElementById("add-button");

addButton.onclick = () => {
    taskItemCreation();
};

const taskInput = getElementById("task-input");

taskInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        addButton.click();
    }
});

window.onload = loadTasksFromLocalStorage;
