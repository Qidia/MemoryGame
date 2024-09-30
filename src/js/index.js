import { generateGame } from './game.js';
import { handleClick } from './eventHandlers.js';
import { imageInParts } from './canvas.js';

document.addEventListener('DOMContentLoaded', () => {
  imageInParts('/src/img/background_сard.jpg'); // Делим изображение на части
  generateGame(); // Генерация поля игры
  document.addEventListener('click', handleClick); // Прикрепление обработчиков событий
});
