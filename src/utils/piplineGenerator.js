import { LoremIpsum } from "lorem-ipsum";

const lorem = new LoremIpsum();
const symbols = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "a", "b", "c", "d", "e", "f"];
const statuses = ["success", "in-progress", "fail"];
const getRandomHash = () => {
  let str = "";

  while (str.length < 7) {
    str += symbols[Math.floor(Math.random() * symbols.length)];
  }

  return str;
};

export const generatePipeline = (initValues) => ({
  id: initValues.id,
  title: initValues.title || lorem.generateWords(5),
  branch:
    initValues.branch || Math.random() > 0.8
      ? "master"
      : lorem.generateWords(1),
  hash: initValues.hash || getRandomHash(),
  author: initValues.author || lorem.generateWords(2),
  date:
    initValues.date ||
    new Date(
      2021,
      Math.floor(Math.random() * 12),
      Math.floor(Math.random() * 28),
      Math.floor(Math.random() * 24),
      Math.floor(Math.random() * 60)
    ),
  period: initValues.period || Math.floor(Math.random() * 60 * 60 * 1000 * 3),
  status:
    initValues.status || statuses[Math.floor(Math.random() * statuses.length)],
});

export const generatePipelines = (num, initId = 3906) => {
  const result = [];

  for (let i = 0; i < num; i++) {
    result.push(generatePipeline({ id: initId - i }));
  }

  return result;
};
