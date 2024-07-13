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
    
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? String(hours).padStart(2, "0") : '12';
    
    const dateTimeValue = `${day}${month}${year}${String(now.getHours()).padStart(2, "0")}${minutes}`;
    const formattedTime = `${hours}:${minutes}:${seconds} ${ampm}`;
    const formattedDate = `${day}-${month}-${year}`;
    
    return [dateTimeValue, formattedTime, formattedDate];
}

function taskItemCreation() {
    const taskInput = getElementById("task-input");
    const taskList = getElementById("task-list");
    let taskDescription = taskInput.value;
    if (String(taskDescription).length < 3) {
        alert("Task description must be at least 3 characters long");
        return;
    }
    let taskId = `${getCurrentDateTimeValue()[0]}_TaskItem`;
    let taskItem = document.createElement("li");
    taskItem.id = taskId;
    const taskItemFormat = `<div class="card" id="${taskId}_Card" ><p id="${taskId}_Description">${taskDescription}<br><span>Created at ${getCurrentDateTimeValue()[1]} on ${getCurrentDateTimeValue()[2]}</span></p><button type="button" class="delete-button" id="${taskId}_Button" onclick="deleteTaskItem('${taskId}')">Delete Task</button></div>`;
    taskItem.innerHTML = taskItemFormat;
    taskList.appendChild(taskItem);
    taskInput.value = "";
}

function deleteTaskItem(taskId) {
    let taskItem = getElementById(taskId);
    taskItem.remove();
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
