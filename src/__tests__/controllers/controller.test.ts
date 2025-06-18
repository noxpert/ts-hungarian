import {Request, Response} from "express";
import {getWords} from "../../controllers/controller";
import {VocabWord} from "../../types/VocabWord";
import {MockResponse} from "node-mocks-http";
// import request from "supertest";

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
jest.mock("../../data/dataAccess");
const dataAccess = require("../../data/dataAccess");

// Mock request to allow testing controller method
const httpMocks = require("node-mocks-http");
const mockRequest: Request = httpMocks.createRequest();
const mockResponse: MockResponse<Response> =  httpMocks.createResponse();

describe("test getting all words", () => {
  test.each([
    [TEST_DICTIONARY.slice(1), 2],
    [TEST_DICTIONARY.slice(2), 1],
    [TEST_DICTIONARY, 3]
  ])("test GET that returns all available words", async (
    availableWords: VocabWord[], expectedWords: Number
  ) => {
    dataAccess.getVocabWordsFromDataStore.mockImplementation(() => {
      return availableWords;
    });
    getWords(mockRequest, mockResponse);
    expect(mockResponse.statusCode).toBe(200);
    expect(mockResponse._getData().words.length).toBe(expectedWords);
  });
  test.each([
    [3, TEST_DICTIONARY.slice(1), 2],
    [4, TEST_DICTIONARY, 3],
    [10, TEST_DICTIONARY, 3]
  ])("test GET that asks for more words than available", async (
    cnt: number, availableWords: VocabWord[], expectedWords: Number
  ) => {
    dataAccess.getVocabWordsFromDataStore.mockImplementation(() => {
      return availableWords;
    });
    getWords(mockRequest, mockResponse);
    expect(mockResponse.statusCode).toBe(200);
    expect(mockResponse._getData().words.length).toBe(expectedWords);
  });
});

describe("GET /api/words get some words", () => {
  test.each([
    [1],
    [2],
    [3]
  ])("test GET of specific number of words for count=%i", async (cnt) => {
    dataAccess.getVocabWordsFromDataStore.mockImplementation(() => {
      return TEST_DICTIONARY;
    });
    const mockRequestWithCount: Request = httpMocks.createRequest(
      {
        "method": "GET",
        "url": `/api/words?count=${cnt}`,
      }
    );
    getWords(mockRequestWithCount, mockResponse);
    expect(mockResponse.statusCode).toBe(200);
    expect(mockResponse._getData().words.length).toBe(cnt);
  });
});

describe("GET /api/words error handling", () => {
  test.each([
    ["invalid", "Invalid count provided, non numeric: invalid"],
    [2.35, "Invalid count provided, non integer: 2.35"],
    [0, "Invalid count provided, must be positive: 0"],
    [-1, "Invalid count provided, must be positive: -1"],
    [35, "Invalid count provided, must not be more than 25 but was: 35"]
  ])("test error handling and message for count=%s", async (cnt: string|number, expectedErrorMessage: string) => {
    const mockRequestWithCount: Request = httpMocks.createRequest(
      {
        "method": "GET",
        "url": `/api/words?count=${cnt}`,
      }
    );
    getWords(mockRequestWithCount, mockResponse);
    expect(mockResponse.statusCode).toBe(400);
    expect(mockResponse._getData().message).toEqual(expectedErrorMessage);
  });
});
