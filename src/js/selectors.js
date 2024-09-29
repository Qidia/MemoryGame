/**
 * Объект, содержащий селекторы для элементов интерфейса
 * @property {HTMLElement} board - Игровое поле
 * @property {HTMLElement} boardContainer - Контейнер для игрового поля.
 * @property {HTMLElement} win - Элемент для отображения сообщения о победе
 */
export const SELECTORS = {
  board: document.querySelector('.board'),
  boardContainer: document.querySelector('.board-container'),
  win: document.querySelector('.win'),
  card: document.querySelector('.card'),
};
