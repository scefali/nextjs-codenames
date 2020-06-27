import * as seedrandom from "seedrandom";
import memoize from "memoizee";
import allWords from "../data/data.json";

const NUM_BAD_WORDS = 6;


export const getWord = (seed, num, isNsfw) => {
  return getAllWords(seed, isNsfw)[num];
};

export const getColor = (seed, num) => {
  return getAllColors(seed)[num];
};

export const getScore = (seed, revealed) => {
  const score = { red: 0, blue: 0 };

  const colors = getAllColors(seed);
  colors.forEach((color, num) => {
    if (["red", "blue"].includes(color) && !revealed.has(num)) {
      score[color] += 1;
    }
  });
  return score;
};

const randomizeList = (list, seed, length = 25, rng=null) => {
  rng = rng || seedrandom(seed);
  const getRandomInt = (max) => Math.floor(rng() * Math.floor(max));
  let listCopy = [...list];
  return Array(length)
    .fill()
    .map(() => {
      const index = getRandomInt(listCopy.length);
      return listCopy.splice(index, 1)[0];
    });
};

const getAllWords = memoize((seed, isNsfw = false) => {
  const rng = seedrandom(seed);
  if (isNsfw) {
    const goodWords = randomizeList(
      allWords["standard"],
      seed,
      25 - NUM_BAD_WORDS
    );
    const badWords = randomizeList(allWords["nsfw"], newSeed, NUM_BAD_WORDS, rng);
    const words = goodWords.concat(badWords);
    const newSeed = rng() * 1000000000000;
    return randomizeList(words, newSeed, 25, rng);
  }
  return randomizeList(allWords["standard"], seed);
}, { length: 2 });

const getAllColors = memoize((seed) => {
  let colors = ["gray"];
  colors = colors.concat(Array(7).fill("beige"));
  colors = colors.concat(Array(8).fill("red"));
  colors = colors.concat(Array(9).fill("blue"));
  return randomizeList(colors, seed);
});
