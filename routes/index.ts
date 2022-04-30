import express from "express";
import wordleRouter from "./wordle/wordle";

const router = express.Router();

router.use("/wordle", wordleRouter);

router.get("/test", (req, res) => {
    res.send("hello");
});

export default router;