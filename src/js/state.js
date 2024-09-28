/**
 * Объект состояния игры
 * @property {number} flippedCards - Количество перевернутых карт в текущем ходе
 * @property {number} totalFlips - Общее количество ходов
 * @property {number} loop - Идентификатор интервала для отслеживания времени
 */
export const STATE = {
  flippedCards: 0,
  totalFlips: 0,
  loop: null,
};
