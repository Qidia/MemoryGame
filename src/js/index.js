import { generateGame } from './game.js';
import { handleClick } from './eventHandlers.js';
import { imageInParts } from './canvas.js';
import backgroundCard from './src/img/background_card.jpg';

document.addEventListener('DOMContentLoaded', () => {
  imageInParts(backgroundCard); // Делим изображение на части
  generateGame(); // Генерация поля игры
  document.addEventListener('click', handleClick); // Прикрепление обработчиков событий
});
