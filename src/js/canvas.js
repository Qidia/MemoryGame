import { STATE } from './state';
import { SELECTORS } from './selectors';

/**
 * Делим изображение на части и записываем в массив
 */
export const imageInParts = (imageSrc) => {
  const canvas = SELECTORS.canvas;
  const parts = SELECTORS.dimensions; // Количество частей по горизонтали и вертикали

  const ctx = canvas.getContext('2d');
  const image = new Image(); // Создаём объект изображения
  image.crossOrigin = 'anonymous'; // Для кросс-доменных изображений, если требуется
  image.src = imageSrc; // Задаём источник изображения

  // Ждем пока изображение загрузится
  image.onload = () => {
    const imgWidth = image.width; //Определяем ширину изображения
    const imgHeight = image.height; //Определяем высоту изображения

    // Настраиваем размер холста под изображение
    canvas.width = imgWidth;
    canvas.height = imgHeight;

    // Рисуем изображение на холсте
    ctx.drawImage(image, 0, 0, imgWidth, imgHeight);

    // разбиваем на части
    const partWidth = imgWidth / parts;
    const partHeight = imgHeight / parts;

    let imageParts = [];

    // Цикл для создания частей изображения
    for (let row = 0; row < parts; row++) {
      for (let col = 0; col < parts; col++) {
        //Расчёт координат каждой части
        const x = col * partWidth; //Текущий столбец на ширину одной части
        const y = row * partHeight; //Текущая строка на высоту одной части

        // Получаем данные пикселей части изображения
        const imageData = ctx.getImageData(x, y, partWidth, partHeight);

        // Создаем новый canvas для каждой части
        const partCanvas = document.createElement('canvas');
        const partCtx = partCanvas.getContext('2d');
        partCanvas.width = partWidth;
        partCanvas.height = partHeight;

        partCtx.putImageData(imageData, 0, 0); // Копируем пиксели, на новый canvas
        imageParts.push(partCanvas.toDataURL()); // Добавляем получившуюся часть в массив (в виде data URL)
      }
    }

    STATE.imageParts = [...imageParts];
  };
};
