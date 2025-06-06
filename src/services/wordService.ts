import fs from "fs";
import path from "path";
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

export function getVocabWords(): VocabWord[] {
  return DICTIONARY;
}
