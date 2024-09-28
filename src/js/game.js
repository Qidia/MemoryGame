import { SELECTORS } from './selectors.js';
import { shuffleAndPickRandom } from './utils.js';
/**
 * Генерирует игровое поле
 */
export const generateGame = () => {
  const dimensions = SELECTORS.board.dataset.dimension;

  if (dimensions % 2 !== 0) throw new Error('Размер игрового поля должен быть четным!');

  const EMOJIS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

  // Вызываем функцию перемешивания и получения случайной карточки для эмодзи
  const shuffleAndPickEmoji = shuffleAndPickRandom(EMOJIS);

  // Итерация по карточкам
  const cardsHTML = shuffleAndPickEmoji
    .map((emoji) => {
      return `
        <div class='card'>
            <div class='card-back'></div>
            <div class='card-front'>${emoji}</div>
        </div>`;
    })
    .join('');

  // Вставка карточек в игровое поле
  SELECTORS.board.insertAdjacentHTML('beforeend', cardsHTML);
};
