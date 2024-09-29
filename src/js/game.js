import { SELECTORS } from './selectors.js';
import { STATE } from './state.js';
import { shuffleAndPickRandom } from './utils.js';
import {
  canFlip,
  flip,
  increaseFlipCount,
  isSecondCardFlipped,
  checkMatch,
  isGameWon,
  displayWinMessage,
} from './utils.js';

/**
 * Генерирует игровое поле
 */
export const generateGame = () => {
  // Получение data атрибута
  const dimensions = SELECTORS.board.dataset.dimension;

  if (dimensions % 2 !== 0) throw new Error('Размер игрового поля должен быть четным!');

  const SYMBOLS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

  // Вызываем функцию перемешивания и получения случайной карточки для эмодзи
  const shuffleAndPickEmoji = shuffleAndPickRandom(SYMBOLS);

  // Итерация по карточкам
  const cardsHTML = shuffleAndPickEmoji
    .map((emoji) => {
      return `
        <div class='card' id=${STATE.id++}>
            <div class='card-back'></div>
            <div class='card-front'>${emoji}</div>
        </div>`;
    })
    .join('');

  // Вставка карточек в игровое поле
  SELECTORS.board.insertAdjacentHTML('beforeend', cardsHTML);
};

/**
 * Основыне действия по переворачиванию карточки и обновления стейта
 * @param {HTMLElement} card - Карта для переворачивания
 */
export const handleCardActions = (card) => {
  canFlip() && flip(card); // Переворачиваем карту, если возможно
  increaseFlipCount(); // Увеличиваем счетчик ходов
  isSecondCardFlipped() && checkMatch(); // Проверяем совпадение перевернутых карт (возвращаем в исходную позицию).

  isGameWon() && displayWinMessage(); // Если игрок выиграл, отображаем сообщение о прохождении игры.
};
