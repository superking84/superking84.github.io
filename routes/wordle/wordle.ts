import express from "express";
import { getWordList } from "../../wordList";

const router = express.Router();

router.get("/secret-word", (req, res) => {
    res.json({ success: "yep" });
});

router.get("/words", async (_, res) => {
    res.send(await getWordList());
});

export default router;