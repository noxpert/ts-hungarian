import express = require("express");
import bodyParser = require("body-parser");
import routes from "./routes/routes";

const app: express.Application = express();
const port: number = 9000;

// Enable CORS for all requests
let cors: any;
cors = require("cors");
app.use(cors());

// Add routes
routes(app);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})
