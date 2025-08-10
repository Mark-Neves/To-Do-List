import {
  invalidForm,
  renderTask,
  updateAndRenderTasks,
  filterObject
} from './script/ui.js';

import { 
  ObjTask,
  arrayTasks,
  deleteElement,
  executionStatus
} from './script/task.js';

import { theme } from './script/theme.js';

const formTask = document.querySelector('.form-tasks');
const inputArea = document.querySelector('.input-area');
const taskList = document.querySelector('.task-list');
const filterTasks = document.getElementById('filter-tasks');
const switchTheme = document.getElementById('switch-theme');

export {inputArea, taskList, switchTheme}


inputArea.addEventListener('input', function(event) {
  if (event) {
    inputArea.classList.remove('error-validation');
  }
});

taskList.addEventListener('click', function(event) {
  if (event.target.classList.contains('task-delete')) {
    deleteElement(event);
  }
  if (event.target.dataset.taskComplited) {
    executionStatus(event);
  }
});

filterTasks.addEventListener('click', (event) => {
  const id = event.target.getAttribute('id');

  if (Object.keys(filterObject).includes(id)) {
    renderTask(filterObject[id]());
  }
});

formTask.addEventListener('submit', function(event) {
  event.preventDefault();
  if (!inputArea.value.trim()) {
    invalidForm();
    return;
  }

  const task = new ObjTask(inputArea.value);
  arrayTasks.push(task);
  updateAndRenderTasks();
  inputArea.value = '';
});

document.addEventListener('DOMContentLoaded', () => {
  renderTask(arrayTasks.sort((a, b) => a.id - b.id));
  switchTheme.dataset.theme = localStorage.getItem('theme');
  if (switchTheme.dataset.theme !== 'dark') {
    theme()
  }
});

switchTheme.addEventListener('click', () => {
  if (switchTheme.dataset.theme === 'dark') {
    switchTheme.dataset.theme = 'light';
    theme();
  } else {
    switchTheme.dataset.theme = 'dark';
    theme();
  }
  localStorage.setItem('theme', switchTheme.dataset.theme)
});


