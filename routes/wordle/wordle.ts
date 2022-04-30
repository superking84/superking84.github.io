import express from "express";

const router = express.Router();

router.get("/secret-word", (req, res) => {
    res.json({ success: "yep" });
});

export default router;