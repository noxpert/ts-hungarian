import {VocabWord} from "../types/VocabWord";

// Use this until the data is stored in a database.
const DICTIONARY: VocabWord[] = [
  {
    "english": "mud",
    "hungarian": "sár"
  },
  {
    "english": "government",
    "hungarian": "kormány"
  },
  {
    "english": "vaccine",
    "hungarian": "védőoltás"
  },
  {
    "english": "visa",
    "hungarian": "vízum"
  },
  {
    "english": "accommodation",
    "hungarian": "szállás"
  },
  {
    "english": "faucet",
    "hungarian": "csap"
  }
];

function getRandomVocabWord(): VocabWord {
  return DICTIONARY[Math.floor(Math.random() * DICTIONARY.length)]
}

export function getAllVocabWords(): VocabWord[] {
  return DICTIONARY;
}

export function getVocabWords(wordCount: number): VocabWord[] {
  let wordsToReturn: VocabWord[] = [];
  if (wordCount >= DICTIONARY.length) {
    wordsToReturn = DICTIONARY;
  } else {
    while (wordsToReturn.length < wordCount) {
      let randomWord: VocabWord = getRandomVocabWord();
      if (!wordsToReturn.includes(randomWord)) {
        wordsToReturn.push(randomWord);
      }
    }
  }
  return wordsToReturn;
}
