import {updateAndRenderTasks,} from './ui.js';

//Класс задачи
export class ObjTask {
  constructor(value) {
    this.id = Date.now();
    this.textTask = value;
    this.activeTask = true;
  }
};

//Массив задач
export let arrayTasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Удаление задачи
export function deleteElement(event) {
  const idTask = event.target.previousElementSibling.dataset.idTask;
  arrayTasks = arrayTasks.filter(el => el.id != idTask);
  updateAndRenderTasks()
}

// Статус выполненой задачи
export function visualChanges(event) {
  event.target.classList.toggle('task-activ');
  event.target.classList.toggle('task-complited');
  event.target.nextElementSibling.classList.toggle('text-task-complited');
}

export function executionStatus(event){
  const idTask = event.target.parentNode.dataset.idTask;

  arrayTasks.forEach(el => {
    if(el.id == idTask) {
      if(el.activeTask) {
        el.activeTask = false;
        visualChanges(event);
      } else {
        el.activeTask = true;
        visualChanges(event);
      }
    }
  })
  updateAndRenderTasks()
}