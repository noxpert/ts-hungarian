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
  },
  {
    "english": "muscle",
    "hungarian": "izom"
  },
  {
    "english": "narrow",
    "hungarian": "keskeny"
  },
  {
    "english": "shallow",
    "hungarian": "sekély"
  },
  {
    "english": "constantly",
    "hungarian": "állandóan"
  },
  {
    "english": "dense",
    "hungarian": "sűrű"
  }
];

export function getVocabWordsFromDataStore(): VocabWord[] {
  return DICTIONARY;
}
