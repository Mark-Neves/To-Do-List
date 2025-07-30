const formTask = document.querySelector('.form-tasks');
const inputArea = document.querySelector('.input-area');
const taskList = document.querySelector('.task-list');
const filterTasks = document.getElementById('filter-tasks');
const switchTheme = document.getElementById('switch-theme');
const root = document.querySelector(':root');

//Массив задач
let arrayTasks = JSON.parse(localStorage.getItem('tasks')) || [];

//Класс задачи
class ObjTask {
  constructor(value) {
    this.id = Date.now();
    this.textTask = value;
    this.activeTask = true;
  }
};

//Сохранение в Local Storage
function saveLocalStorage(arr) {
  localStorage.setItem('tasks', JSON.stringify(arr));
};

//Рендер задач
function renderTask(arr){
  taskList.textContent = '';
  arr.forEach(task => createTasks(task))
}

//Отображение списка задач
function createTasks(el){
  const taskItem = document.createElement('li');
  taskItem.classList.add('task-item');
  taskItem.innerHTML = `
    <div class="task-container" data-id-task="${el.id}">
      <button class="button-task ${el.activeTask ? "task-activ" : "task-complited"}"  data-task-complited= "true" type="button" aria-label="Статус выполнения"></button>
      <p  class="${el.activeTask ? '' : 'text-task-complited'} text-task">${el.textTask}</p>
    </div>
    <button class="button-task task-delete" type="button" aria-label="Удалить задачу"></button>
    `
  taskList.append(taskItem)
}


//Обработка отправки пустой формы
function invalidForm() {
    inputArea.classList.add('error-validation');
    inputArea.value = '';
    inputArea.focus();
}


inputArea.addEventListener('input', function(event){
  if(event){
    inputArea.classList.remove('error-validation');
  }
})

// Удаление задачи
function deleteElement(event) {
  const idTask = event.target.previousElementSibling.dataset.idTask;
  arrayTasks = arrayTasks.filter(el => el.id != idTask);
  saveLocalStorage(arrayTasks);
  renderTask(arrayTasks);
}

// Статус выполненой задачи
function executionStatus(event){
  const idTask = event.target.parentNode.dataset.idTask;

  arrayTasks.forEach(el => {
    if(el.id == idTask) {
      if(el.activeTask) {
        el.activeTask = false;
        event.target.classList.replace('task-activ', 'task-complited');
        event.target.nextElementSibling.classList.toggle('text-task-complited');
      } else {
        el.activeTask = true;
        event.target.classList.replace('task-complited', 'task-activ');
        event.target.nextElementSibling.classList.toggle('text-task-complited');
      }
    }
  })
  saveLocalStorage(arrayTasks);
  renderTask(arrayTasks);
}


//Обработчик
formTask.addEventListener('submit', function(event){
  event.preventDefault();
  if(!inputArea.value.trim()){
    invalidForm()
    return           
  }

  const task = new ObjTask(inputArea.value);
  arrayTasks.push(task);
  saveLocalStorage(arrayTasks);
  renderTask(arrayTasks);
  inputArea.value = '';
})

//Делегирование событий кнопок внутри задачи
taskList.addEventListener('click', function(event) {
  if(event.target.classList.contains('task-delete')){
    deleteElement(event);
  }
  if(event.target.dataset.taskComplited){
    executionStatus(event);
  }
})

//Загрузка при первом запуске
document.addEventListener('DOMContentLoaded', () => {
  renderTask(arrayTasks.sort((a, b) => a.id - b.id));
})

//Кнопки фильтрации задач
filterTasks.addEventListener('click', (event) => {
  const id = event.target.getAttribute('id');
  if(id === 'filterAll'){
      renderTask(arrayTasks)
  };
   if(id === 'filterActiv'){
      renderTask(arrayTasks.filter(el => el.activeTask));
  };
  if(id === 'filterComplited'){
      renderTask(arrayTasks.filter(el => !el.activeTask));
  };
})


//Переключение темы интерфейса
switchTheme.addEventListener('click', function(event){
  const iconTheme = document.querySelector('#icon-theme')
  if(event.currentTarget.getAttribute('data-theme') == 'dark'){
    iconTheme.setAttribute('src', './img/theme-dark.svg');
    event.currentTarget.setAttribute('data-theme', 'ligth');
    root.style.setProperty('--color-gray7', '#333333');
    root.style.setProperty('--color-gray6', '#D9D9D9');
    root.style.setProperty('--color-gray5', '#F2F2F2');
    root.style.setProperty('--color-gray1', '#0D0D0D');
  } else {
    event.currentTarget.setAttribute('data-theme', 'dark');
    iconTheme.setAttribute('src', './img/theme-light.svg');
    document.documentElement.style = '';
  }
})