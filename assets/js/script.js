// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));
const taskTitleInputEl = $('#title');
const taskDescriptionInputEl = $('#description');
const taskDateInputEl = $('#date');
const saveBtn = $(`#saveBtn`);
let tasks = [];

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
};

// Todo: create a function to create a task card
function createTaskCard(task) {
  const taskCard = $('<div>')
  .addClass('card task-card draggable my-3')
  .attr('data-task-id', task.id);
const cardHeader = $('<div>').addClass('card-header h4').text(task.name);
const cardBody = $('<div>').addClass('card-body');
const cardDescription = $('<p>').addClass('card-text').text(task.type);
const cardDueDate = $('<p>').addClass('card-text').text(task.dueDate);
const cardDeleteBtn = $('<button>')
  .addClass('btn btn-danger delete')
  .text('Delete')
  .attr('data-task-id', task.id);
  cardDeleteBtn.on('click', handleDeleteTask);
  if (task.dueDate && task.status !== 'done') {
    const now = dayjs();
    const taskDueDate = dayjs(task.dueDate, 'DD/MM/YYYY');
    if (now.isSame(taskDueDate, 'day')) {
      taskCard.addClass('bg-warning text-white');
  } else if (now.isAfter(taskDueDate)) {
      taskCard.addClass('bg-danger text-white');
      cardDeleteBtn.addClass('border-light');
  }
  }
  cardBody.append(cardDescription, cardDueDate, cardDeleteBtn);
  taskCard.append(cardHeader, cardBody);
  return taskCard;

};

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
  const tasks = readTasksFromStorage();


  const todoList = $('#todo-cards');
  todoList.empty();

  const inProgressList = $('#in-progress-cards');
  inProgressList.empty();

  const doneList = $('#done-cards');
  doneList.empty();

  for (let task of tasks) {
    if (task.status === 'to-do') {
        todoList.append(createTaskCard(task));
    } else if (task.status === 'in-progress') {
        inProgressList.append(createTaskCard(task));
    } else if (task.status === 'done') {
        doneList.append(createTaskCard(task));
    }
}
$('.draggable').draggable({
  opacity: 0.7,
  zIndex: 100,
  // ? This is the function that creates the clone of the card that is dragged. This is purely visual and does not affect the data.
  helper: function (e) {
      // ? Check if the target of the drag event is the card itself or a child element. If it is the card itself, clone it, otherwise find the parent card  that is draggable and clone that.
      const original = $(e.target).hasClass('ui-draggable')
          ? $(e.target)
          : $(e.target).closest('.ui-draggable');
      // ? Return the clone with the width set to the width of the original card. This is so the clone does not take up the entire width of the lane. This is to also fix a visual bug where the card shrinks as it's dragged to the right.
      return original.clone().css({
          width: original.outerWidth(),
      });
  },
})
}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
  event.preventDefault();

  const taskName = taskTitleInputEl.val().trim();
  const taskType = taskDescriptionInputEl.val();
  const taskDate = taskDateInputEl.val();

  const newTask = {
    // ? Here we use a Web API called `crypto` to generate a random id for our project. This is a unique identifier that we can use to find the project in the array. `crypto` is a built-in module that we can use in the browser and Nodejs.    id: crypto.randomUUID(),
    name: taskName,
    type: taskType,
    dueDate: taskDate,
    status: 'to-do',
  };
  const tasks = readTasksFromStorage();
  tasks.push(newTask);
  saveTasksToStorage(tasks);
  renderTaskList();
  taskTitleInputEl.val('');
  taskDescriptionInputEl.val('');
  taskDateInputEl.val('');
  $('#exampleModal').modal('hide');
  console.log(`Btn pusshed`);

}

$('#saveBtn').on('click', handleAddTask);


function handleDeleteTask(event){
  event.preventDefault();
  const taskId = $(this).attr('data-task-id');
  const tasks = readTasksFromStorage();

  tasks.forEach((task) => {
    if (task.id === taskId) {
      tasks.splice(tasks.indexOf(task), 1);
    }
  });

  saveTasksToStorage(tasks);

  renderTaskList();
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
  const tasks = taskList;
  const taskId = ui.draggable[0].dataset.taskId;
  const newStatus = event.target.id;
  for (let task of tasks) {
    if (task.id === taskId) {
      task.status = newStatus;
    }
  }
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTaskList();
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  renderTaskList();
  $('#date').datepicker({
      changeMonth: true,
      changeYear: true,
    });
    $('.lane').droppable({
      accept: '.draggable',
      drop: handleDrop,
    });
});
