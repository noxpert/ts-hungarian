import app from "../index";
import request from "supertest";
import {VocabWord} from "../types/VocabWord";

const TEST_DICTIONARY: VocabWord[] = [
  {
    "english": "government",
    "hungarian": "kormány"
  },
  {
    "english": "faucet",
    "hungarian": "csap"
  },
  {
    "english": "muscle",
    "hungarian": "izom"
  }
];

// Mock to replace full dictionary with a test dictionary
jest.mock("../data/dataAccess");
const dataAccess = require("../data/dataAccess");

describe("GET /api/words get all words", () => {
  it("test GET that returns all available words", async () => {
    dataAccess.getVocabWordsFromDataStore.mockImplementation(() => {
      return TEST_DICTIONARY;
    });
    const response = await request(app).get(`/api/words`);
    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toEqual("application/json; charset=utf-8");
    expect(response.body.words.length).toEqual(3);
  });
});

describe("GET /api/words get some words", () => {
  it("test GET of specific number of words", async () => {
    dataAccess.getVocabWordsFromDataStore.mockImplementation(() => {
      return TEST_DICTIONARY;
    });
    const response = await request(app).get(`/api/words?count=${2}`);
    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toEqual("application/json; charset=utf-8");
    expect(response.body.words.length).toEqual(2);
  });
});
