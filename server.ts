import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: "./config.env" });

const app: Express = express();
const port = process.env.PORT;

app.use(express.static(path.join("client", "build")));

app.get("*", (req: Request, res: Response) => {
    res.sendFile(path.join("client", "build", "index.html"));
});

app.listen(port, () => {
    console.log(`[server]: Server is running at https://localhost:${port}`);
});