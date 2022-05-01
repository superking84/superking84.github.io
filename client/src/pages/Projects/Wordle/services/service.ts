import axios from "axios";

export async function getWordList() {
    const res = await axios
        .get("/api/wordle/words");
    return res.data;
}