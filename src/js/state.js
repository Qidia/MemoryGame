/**
 * Объект состояния игры
 * @property {number} flippedCards - Количество перевернутых карт в текущем ходе
 * @property {number} totalFlips - Общее количество ходов
 * @property {number} loop - Идентификатор интервала для отслеживания времени
 * @property {Array} imageParts - массив с частями изображения
 * @property {number} id - id карточки
 */
export const STATE = {
  flippedCards: 0,
  totalFlips: 0,
  loop: null,
  imageParts: [],
  id: 0,
};
