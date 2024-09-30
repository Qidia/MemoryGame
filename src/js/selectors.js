/**
 * Объект, содержащий селекторы для элементов интерфейса
 * @property {HTMLElement} board - Игровое поле
 * @property {HTMLElement} boardContainer - Контейнер для игрового поля
 * @property {HTMLElement} win - Элемент для отображения сообщения о победе
 * @property {HTMLElement} card - Элемент для отображения карточки
 * @property {HTMLElement} canvas - Элемент canvas (для разбиения изображения на части)
 * @property {number} dimensions - Количество ячеек в игровом поле (получаемое из атрибута data-dimension элемента board)
 */
export const SELECTORS = {
  board: document.querySelector('.board'),
  boardContainer: document.querySelector('.board-container'),
  win: document.querySelector('.win'),
  card: document.querySelector('.card'),
  canvas: document.getElementById('canvas'),
  dimensions: document.querySelector('.board').dataset.dimension,
};
