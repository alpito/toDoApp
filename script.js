const newTask = document.querySelector('.input-task');
const addNewTaskBtn = document.querySelector('.btn-add-task');
const taskList = document.querySelector('.task-list');

addNewTaskBtn.addEventListener('click', addTask);
taskList.addEventListener('click', deleteAndCheckTask);
document.addEventListener('DOMContentLoaded', getTasks);


function deleteAndCheckTask(e) {
    const item = e.target;

    if (item.classList.contains('task-done')) {
        console.log('done');
        item.parentElement.classList.toggle('task-finished');

    }

    if (item.classList.contains('task-removed')) {
        console.log('removed');
        item.parentElement.classList.toggle('gtfo')
        removeTaskFromLocalStorage(item.parentElement);
        item.parentElement.addEventListener('transitionend', function () {
            item.parentElement.remove();
        })
    }
}

function addTask(e) {
    e.preventDefault();

    //Prevent empty task
    if (newTask.value === '') {
        
        alert('You must enter a task description');
        return; 
    }

    //creating div

    const taskDiv = document.createElement('div');
    taskDiv.classList.add('task-item');

    //creating li

    const taskLi = document.createElement('li');
    taskLi.classList.add('task-description');
    taskLi.innerText = newTask.value;
    taskDiv.appendChild(taskLi);

    //creating button
    const taskFinishedBtn = document.createElement('button');
    taskFinishedBtn.classList.add('task-btn');
    taskFinishedBtn.classList.add('task-done');
    taskFinishedBtn.innerHTML = '<i class="fas fa-check"></i>';
    taskDiv.appendChild(taskFinishedBtn);

    //creating button
    const taskDeleteBtn = document.createElement('button');
    taskDeleteBtn.classList.add('task-btn');
    taskDeleteBtn.classList.add('task-removed');
    taskDeleteBtn.innerHTML = '<i class="fa-solid fa-skull"></i>';
    taskDiv.appendChild(taskDeleteBtn);

    
    //adding task to local storage
    saveToLocalStorage(newTask.value);
    newTask.value = '';

    taskList.appendChild(taskDiv);
}

// adding tasks to local storage

function saveToLocalStorage(newTask){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));


}

// getting tasks from local storage

function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task){
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task-item');

        //creating li

        const taskLi = document.createElement('li');
        taskLi.classList.add('task-description');
        taskLi.innerText = task;
        taskDiv.appendChild(taskLi);

        //creating button
        const taskFinishedBtn = document.createElement('button');
        taskFinishedBtn.classList.add('task-btn');
        taskFinishedBtn.classList.add('task-done');
        taskFinishedBtn.innerHTML = '<i class="fas fa-check"></i>';
        taskDiv.appendChild(taskFinishedBtn);

        //creating button
        const taskDeleteBtn = document.createElement('button');
        taskDeleteBtn.classList.add('task-btn');
        taskDeleteBtn.classList.add('task-removed');
        taskDeleteBtn.innerHTML = '<i class="fa-solid fa-skull"></i>';
        taskDiv.appendChild(taskDeleteBtn);

        taskList.appendChild(taskDiv);
    })
}

// removing tasks from local storage

function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    const taskIndex = taskItem.children[0].innerText;
    tasks.splice(tasks.indexOf(taskIndex), 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


// removing all tasks
const removeAllTasksBtn = document.querySelector('.btn-remove-all-tasks');
removeAllTasksBtn.addEventListener('click', confirmRemoveAllTasks);

function confirmRemoveAllTasks() {

    const confirmation = confirm("Are you sure you want to remove all tasks?");
    if (confirmation) {
        removeTasks();
    }
}

function removeTasks() {
    taskList.classList.add('fade-out'); 
    setTimeout(function() {
        taskList.innerHTML = ''; 
        localStorage.clear();
    }, 500); 

taskList.addEventListener('transitionend', function(event) {
    if (event.propertyName === 'opacity') {
        taskList.classList.remove('fade-out'); 
    }
});
}