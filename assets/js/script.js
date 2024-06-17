// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));
const taskTitleInputEl = $('#title');
const taskDescriptionInputEl = $('#description');
const taskDateInputEl = $('#date');
const saveBtn = $(`#saveBtn`);

// Todo: create a function to generate a unique task id
function generateTaskId() {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let id = '';
  if (window.crypto && window.crypto.getRandomValues) {
    let values = new Uint32Array(length);
    window.crypto.getRandomValues(values);
    
    for (let i = 0; i < length; i++) {
      id += charset[values[i] % charset.length];
    }
  }
  else {
    // Fallback to Math.random() if crypto API is not supported
    for (let i = 0; i < length; i++) {
      id += charset.charAt(Math.floor(Math.random() * charset.length));
    }
  }
  console.log(id);
  return id;
}

// Todo: create a function to create a task card
function createTaskCard(task) {

}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

}

// Todo: create a function to handle adding a new task
function handleAddTask(event){

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

});
