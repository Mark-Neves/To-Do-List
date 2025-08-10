//Сохранение в Local Storage
export function saveLocalStorage(arr) {
  localStorage.setItem('tasks', JSON.stringify(arr));
};