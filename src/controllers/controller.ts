import { ServerResponse, IncomingMessage } from "http";
import { getVocabWords } from "../services/wordService";
import { VocabWord } from "../types/VocabWord";

export function getWords(req: IncomingMessage, res: ServerResponse) {
  let words: VocabWord[] = getVocabWords();
  if (words.length === 0) {
    // No words found
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        success: false,
        status: 404,
        error: "Failed to find any words."
      })
    );
  } else {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        success: true,
        message: words,
      })
    );
  }
}
