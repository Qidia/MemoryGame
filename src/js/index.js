import { generateGame } from './game.js';
import { handleClick } from './eventHandlers.js';
import { imageInParts } from './canvas.js';

document.addEventListener('DOMContentLoaded', () => {
  imageInParts();
  generateGame(); // Генерация поля игры
  document.addEventListener('click', handleClick); // Прикрепление обработчиков событий
});
