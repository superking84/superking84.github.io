import express, { Express, Request, Response } from "express";
import apiRouter from "./routes/index";
import { connectToDb } from "./db/connect";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: "./config.env" });

const app: Express = express();
const port = process.env.PORT;

app.use(express.static(path.join("client", "build")));

app.use("/api", apiRouter);

app.get("*", (req: Request, res: Response) => {
    res.sendFile(path.join("client", "build", "index.html"), { root: "." });
});

app.listen(port, () => {
    connectToDb(err => {
        if (err) {
            console.log(err);
        }
    });

    console.log(`[server]: Server is running at https://localhost:${port}`);
});