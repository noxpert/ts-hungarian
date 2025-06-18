import {VocabWord} from "../types/VocabWord";
import {getVocabWordsFromDataStore} from "../data/dataAccess";

function getRandomVocabWord(): VocabWord {
  const allVocabWords: VocabWord[] = getAllVocabWords();
  return allVocabWords[Math.floor(Math.random() * allVocabWords.length)]
}

export function getAllVocabWords(): VocabWord[] {
  return getVocabWordsFromDataStore();
}

export function getVocabWords(wordCount: number): VocabWord[] {
  const allVocabWords: VocabWord[] = getAllVocabWords();
  let wordsToReturn: VocabWord[] = [];
  if (wordCount >= allVocabWords.length) {
    wordsToReturn = allVocabWords;
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
