import {addWord, getWords} from "../controllers/controller";

const routes = (app: any) => {
  app.route("/api/words")
    .get(getWords)
    .post(addWord);
};

export default routes;