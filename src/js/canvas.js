import { STATE } from './state';

const image = document.getElementById('image');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d'); /* Возвращаем объект, который предоставляет API для рисования на холсте. */

export const imageInParts = () => {
  const imgWidth = image.width; //определяем ширину изображения
  const imgHeight = image.height; //определяем высоту изображения
  const parts = 4; // количество частей по горизонтали и вертикали (ПОМЕНЯТЬ)

  // Настраиваем размер холста под изображение
  canvas.width = imgWidth;
  canvas.height = imgHeight;

  // Рисуем изображение на холсте
  ctx.drawImage(image, 0, 0, imgWidth, imgHeight);

  // разбиваем на части
  const partWidth = imgWidth / parts;
  const partHeight = imgHeight / parts;

  let imageParts = [];

  for (let row = 0; row < parts; row++) {
    for (let col = 0; col < parts; col++) {
      //Расчёт координат каждой части
      const x = col * partWidth; //позиция по горизонтали, вычисляемая как текущий столбец (col) умноженный на ширину одной части (partWidth).
      const y = row * partHeight; //позиция по вертикали, вычисляемая как текущая строка (row) умноженная на высоту одной части (partHeight).

      // Получаем данные части изображения (извлекает данные пикселей части изображения)
      const imageData = ctx.getImageData(x, y, partWidth, partHeight);

      // Создаем новый canvas для каждой части
      const partCanvas = document.createElement('canvas');
      const partCtx = partCanvas.getContext('2d');
      partCanvas.width = partWidth;
      partCanvas.height = partHeight;

      // Копируем данные части на новый canvas (копирует пиксели, которые были извлечены с помощью getImageData, на новый холст.)
      partCtx.putImageData(imageData, 0, 0);

      // Добавляем получившуюся часть в массив (в виде data URL)
      imageParts.push(partCanvas.toDataURL());
    }
  }

  STATE.imageParts = [...imageParts];
  //console.log(STATE.imageParts); // Массив с частями изображения
};
