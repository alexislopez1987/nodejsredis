import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import "express-async-errors";
import helmet from "helmet";
import responseTime from "response-time";

const app: Express = express();
const port = process.env.PORT ?? 8081;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(responseTime());

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript + redis Server");
});

app.all("*", async (req: Request, res: Response) => {
  res.send(`url no existe`).status(404);
});

app.listen(port, () => {
  console.log(`servidor nodejsredis corriendo en puerto ${port}`);
});
