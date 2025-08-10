import {saveLocalStorage} from './storage.js';
import {inputArea, taskList} from '../main.js';
import {arrayTasks} from './task.js';


//Обработка отправки пустой формы
export function invalidForm() {
    inputArea.classList.add('error-validation');
    inputArea.value = '';
    inputArea.focus();
}

//Отображение списка задач
export function createTasks(el){
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

//Рендер задач
export function renderTask(arr){
  taskList.textContent = '';
  arr.forEach(task => createTasks(task))
};

export function updateAndRenderTasks() {
  saveLocalStorage(arrayTasks);
  renderTask(arrayTasks);
}

//Кнопки фильтрации задач
export const filterObject = {
  filterAll: () => arrayTasks,
  filterActiv: () => arrayTasks.filter(el => el.activeTask),
  filterComplited: () => arrayTasks.filter(el => !el.activeTask)
};

