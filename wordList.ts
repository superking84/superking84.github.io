import { getDb } from "./db/connect";

let _words: string[] | null = null;

export async function getWordList(): Promise<string[]> {
    if (_words === null) {
        const db = getDb();

        const docs = await db
            .collection("wordle.words")
            .find({ word: { $exists: true } })
            .toArray();
            
        _words = docs.map<string>(_ => _.word);
    }

    return _words as string[];
}