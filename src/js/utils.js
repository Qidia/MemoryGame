import { STATE } from './state.js';
import { SELECTORS } from './selectors.js';

/**
 *
 * @param {strings[]} items - Абстрактные данные для перемешивания и сортировки
 * @returns {strings[]} - Перемешанный массив с данными
 */
export const shuffleAndPickRandom = (items) => {
  if (!items || !Array.isArray(items)) throw new Error('Передайте значения в виде массива!');

  // сортировка исходного массива в случайном порядке
  const sortedArr = items.sort(() => Math.random(items) - 0.5);
  // достаем из 10 элементов первые 8
  const dublicateArr = [...sortedArr].slice(0, 8);
  // из массива в 8 элементов, делаем 16
  const doubleArr = [...dublicateArr, ...dublicateArr];
  // сортировка массива из 16 элементов в случайном порядке
  const sortedDoubleArr = doubleArr.sort(() => Math.random(doubleArr) - 0.5);

  return sortedDoubleArr;
};

/**
 * Увеличивает счетчик перевернутых карт и общий счетчик ходов
 */
export const increaseFlipCount = () => {
  STATE.flippedCards++;
  STATE.totalFlips++;
};

/**
 * Сбрасывает счетчик перевернутых карт
 */
const resetFlipCount = () => (STATE.flippedCards = 0);

/**
 * Проверяет, можно перевернуть карту или нет
 * @returns {boolean} - Да/нет
 */
export const canFlip = () => STATE.flippedCards < 2;

/**
 * Проверяет, перевернута вторая карта или нет
 * @returns {boolean} - Да/нет
 */
export const isSecondCardFlipped = () => STATE.flippedCards === 2;

/**
 * Переворачивает карту
 * @param {HTMLElement} card - Карта для переворачивания
 */
export const flip = (card) => card.classList.add('flipped');

/**
 * Проверяет совпадение перевернутых карт
 */
export const checkMatch = () => {
  const flippedCards = document.querySelectorAll('.flipped:not(.matched)');

  if (flippedCards[0].innerText === flippedCards[1].innerText) {
    markMatched(flippedCards);
  } else {
    setTimeout(() => {
      flipBack(); // Переворачиваем обратно все карты, которые не совпали
    }, 1000);
  }
};

/**
 * Отмечает перевернутые карты как совпавшие
 * @param {NodeList} cards - Перевернутые карты, которые совпали
 */
export const markMatched = (cards) => {
  cards.forEach((card) => card.classList.add('matched'));
  isSecondCardFlipped() && resetFlipCount(); // Если карточки совпали, обнуляем счетчик
  outputPartImage(cards);
};

/**
 * Переворачивает обратно все карты, которые не совпали, обнуляет счетчик
 */
export const flipBack = () => {
  const unmatchedCards = document.querySelectorAll('.card:not(.matched)');
  unmatchedCards.forEach((card) => card.classList.remove('flipped'));
  resetFlipCount();
};

/**
 * Проверяет, выиграл игрок или нет
 * @returns {boolean} - Да/нет
 */
export const isGameWon = () => !document.querySelectorAll('.card:not(.flipped)').length;

/**
 * Отображает сообщение о выигрыше
 */
const displayWinMessage = () => {
  SELECTORS.boardContainer.classList.add('flipped');
  SELECTORS.win.innerHTML = `
      <span class="win-text">
        Игра успешно пройдена!<br />
        количество шагов: <span class="highlight">${STATE.totalFlips}</span><br />
      </span>
    `;

  clearInterval(STATE.loop);
};

/**
 * Открываем часть картинки на совпавших картах
 * @param {NodeList} cards - Перевернутые карты, которые совпали
 */
const outputPartImage = (cards) => {
  cards.forEach((card) => {
    let id = card.getAttribute('id');
    setTimeout(() => {
      const imgHTML = `
      <img src = ${STATE.imageParts[id]} class='partImage'></img>`;

      card.insertAdjacentHTML('beforeend', imgHTML);
    }, 1000);
  });
};

/**
 * Сближаем части изображения до составления полного изображения
 */
export const connectingCards = () => {
  const computedStyles = getComputedStyle(SELECTORS.board);
  const partImages = document.querySelectorAll('.partImage');
  let gap = parseFloat(computedStyles.gridGap); // Извлекаем значение grid-gap из css

  const interval = setInterval(() => {
    gap -= 0.5;
    if (gap <= 0) {
      gap = 0;
      clearInterval(interval); // Останавливаем анимацию, когда gap достигнет 0
    }
    SELECTORS.board.style.gridGap = `${gap}px`;

    partImages.forEach((partImage) => (partImage.style.borderRadius = '0px'));
  }, 50);

  setTimeout(() => displayWinMessage(), 4000);
};
