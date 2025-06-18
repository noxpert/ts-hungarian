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
  test.each([
    [TEST_DICTIONARY.slice(1), 2],
    [TEST_DICTIONARY.slice(2), 1],
    [TEST_DICTIONARY, 3]
  ])('test GET that returns all available words', async (
    availableWords: VocabWord[], expectedWords: Number
  ) => {
    dataAccess.getVocabWordsFromDataStore.mockImplementation(() => { return availableWords; });
    const response = await request(app).get(`/api/words`);
    expect(response.status).toBe(200);
    expect(response.body.type).toEqual("application/json");
    expect(response.body.words.length).toEqual(expectedWords);
  });
  test.each([
    [3, TEST_DICTIONARY.slice(1), 2],
    [4, TEST_DICTIONARY, 3],
    [10, TEST_DICTIONARY, 3]
  ])('test GET that asks for more words than available', async (
    cnt: number, availableWords: VocabWord[], expectedWords: Number
  ) => {
    dataAccess.getVocabWordsFromDataStore.mockImplementation(() => { return availableWords; });
    const response = await request(app).get(`/api/words?count=${cnt}`);
    expect(response.status).toBe(200);
    expect(response.body.type).toEqual("application/json");
    expect(response.body.words.length).toEqual(expectedWords);
  });
});

describe("GET /api/words get some words", () => {
  test.each([
    [1],
    [2],
    [3]
  ])('test GET of specific number of words for count=%cnt', async (cnt) => {
    dataAccess.getVocabWordsFromDataStore.mockImplementation(() => { return TEST_DICTIONARY; });
    const response = await request(app).get(`/api/words?count=${cnt}`);
    expect(response.status).toBe(200);
    expect(response.body.type).toEqual("application/json");
    expect(response.body.words.length).toEqual(cnt);
  });
});

describe("GET /api/words error handling", () => {
  test.each([
    ['invalid', "Invalid count provided, non numeric: invalid"],
    [2.35, "Invalid count provided, non integer: 2.35"],
    [0, "Invalid count provided, must be positive: 0"],
    [-1, "Invalid count provided, must be positive: -1"],
    [35, "Invalid count provided, must not be more than 25 but was: 35"]
  ])('test error handling and message for count=%cnt', async (cnt: string|number, expectedErrorMessage: string) => {
    const response = await request(app).get(`/api/words?count=${cnt}`);
    expect(response.status).toBe(400);
    expect(response.body.message).toEqual(expectedErrorMessage);
  });
});
