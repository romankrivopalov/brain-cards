export const shuffleArray = arr => {
  const newArr = [...arr];

  // тасование Фишера - Йетса
  for (let i = arr.length - 1; i > 0; i--) {
    const randomNumber = Math.floor(Math.random() * (i + 1));

    [newArr[i], newArr[randomNumber]] = [newArr[randomNumber], newArr[i]];
  }

  return newArr;
}
