import { Request, Response } from "express";
import { getVocabWords } from "../services/wordService";
import { VocabWord } from "../types/VocabWord";

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
