import {IncomingMessage, ServerResponse} from "http";

// import controller functions
import { getWords } from "./controllers/controller";

// add correct types
const express: any = require("express");
const bodyParser: any = require("body-parser");
const cors: any = require("cors");

const app: any = express();
const port: number = 9000;

// Enable CORS for all requests
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// GET all words
app.get("/api/words", (req: IncomingMessage, res: ServerResponse) => {
  console.log("Received GET /api/words");
  return getWords(req, res);
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})
