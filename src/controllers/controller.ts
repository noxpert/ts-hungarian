import { Request, Response } from "express";
import { getVocabWords } from "../services/wordService";
import { VocabWord } from "../types/VocabWord";

const MAX_COUNT = 25;

export const getWords = (getRequest: Request, getResponse: Response) => {
  if (getRequest.query.count) {
    return getSomeWords(getRequest, getResponse);
  } else {
    return getAllWords(getRequest, getResponse);
  }
}

export const getAllWords = (getRequest: Request, getResponse: Response) => {
  let words: VocabWord[] = getVocabWords();
  if (words.length === 0) {
    // No words found
    getResponse.send(
      JSON.stringify({
        success: false,
        status: 404,
        type: "application/text",
        error: "Failed to find any words."
      })
    );
  } else {
    getResponse.send(
      JSON.stringify(
        {
          success: true,
          status: 200,
          type: "application/json",
          message: words,
        }
      )
    );
  }
}

export const getSomeWords = (getRequest: Request, getResponse: Response) => {
  // let words: VocabWord[] = getVocabWords();
  const count = Number(getRequest.query.count);

  function errorResponse(status: number, message: string) {
    getResponse.send(
      JSON.stringify(
        {
          success: false,
          status: status,
          type: "application/json",
          message: message
        }
      )
    );
  }

  if (isNaN(count)) {
    console.log(`GET with non-numeric count: ${count}`);
    errorResponse(400, `Invalid count: ${count}`);
  } else if (typeof getRequest.query.count === 'string' && getRequest.query.count.includes(".")) {
    console.log(`GET with non integer count: ${count}`);
    errorResponse(400, `Invalid count: ${count}`);
  } else if (count <= 0) {
    console.log(`GET count must be greater than zero, received: ${count}`);
    errorResponse(400, `Invalid count: ${count}`);
  } else if (count > MAX_COUNT) {
    console.log(`GET count must be less than ${MAX_COUNT}, received: ${count}`);
    errorResponse(400, `Invalid count: ${count}`);
  } else {
    console.log(`GET with count of: ${getRequest.query.count}`);
    getResponse.send(
      JSON.stringify(
        {
          success: true,
          status: 200,
          type: "application/json",
          message: "GET some words",
        }
      )
    );
  }
}

export const addWord = (getRequest: Request, postResponse: Response) => {
  postResponse.send(
    JSON.stringify(
      {
        success: false,
        status: 404,
        type: "application/json",
        message: "The POST to add words is not yet implemented"
      }
    )
  );
}
