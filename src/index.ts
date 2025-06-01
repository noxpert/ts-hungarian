import http from "http";

// import controller functions
import { getVocabWords} from "./controller";

const myServer = http.createServer((req, res) => {
  // GET words
  if (req.method == "GET" && req.url == "/api/words") {
     return getVocabWords(req, res);
  }
  res.end();
});

myServer.listen(9000, () => {
   console.log('Server is running on port 9000. Go to http://localhost:9000/');
});

// myServer.close()

