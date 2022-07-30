import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import "express-async-errors";
import helmet from "helmet";
import responseTime from "response-time";
import { subscriber } from "./redis/sub";
import { publisher } from "./redis/pub";

const app: Express = express();
const port = process.env.PORT ?? 8090;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(responseTime());

app.get("/", (req: Request, res: Response) => {
  res.json({ msg: "nodejs + redis 🙂" });
});

app.all("*", async (req: Request, res: Response) => {
  res.send({ error: `url no existe 🤕` }).status(404);
});

subscriber();
publisher();

app.listen(port, () => {
  console.log(`servidor nodejs redis 👂 en puerto ${port}`);
});
