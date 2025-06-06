import { getAllWords } from "../controllers/controller";
import { Request, Response } from "express";

const routes = (app: any) => {
    app.route('/api/words')
      .get(getAllWords)
      .post((postRequest: Request, postResponse: Response): Response =>
        postResponse.send('POST request route'));
};

export default routes;