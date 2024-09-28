export const shuffleAndPickRandom = (items) => {
  if (!items || !Array.isArray(items)) throw new Error('Передайте эмодзи в виде массива!');

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
