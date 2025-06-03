// access the data store (data/vocab.json)
import fs from "fs";
import path from "path";

// handle requests and reponses
import { ServerResponse, IncomingMessage } from "http";

const getVocabWords = (req: IncomingMessage, res: ServerResponse) => {
   return fs.readFile(
     path.join(__dirname + "/data", "vocab.json"),
     "utf8",
     (err, data) => {
       // Read the vocab.json file
       // Check for any errors
       if (err) {
         // error, return an error message
         res.writeHead(500, { "Content-Type": "application/json" });
         res.end(
           JSON.stringify({
             success: false,
             error: err,
           })
         );
       } else {
         // no error, send the data
         res.writeHead(200, { "Content-Type": "application/json" });
         res.end(
           JSON.stringify({
             success: true,
             message: JSON.parse(data),
           })
         );
       }
     }
   );
};

export { getVocabWords };