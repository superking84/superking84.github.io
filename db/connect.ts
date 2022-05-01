import { AnyError, Db, MongoClient } from "mongodb";

let _db: Db;
export function connectToDb(callback: (error: AnyError | undefined) => void) {
    const dbUri = process.env.ATLAS_URI;

    const client = new MongoClient(dbUri as string);

    client.connect(function (err, db) {
        if (db) {
            _db = db.db("portfolio");
            console.log("Successfully connected to MongoDB.");
        }

        return callback(err);
    });
}
export function getDb() {
    return _db;
}