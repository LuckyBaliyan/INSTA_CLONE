const mongo = require("mongoose");

async function connectToDb() {
    await mongo.connect(process.env.MONGO_URI);

    console.log("Connected to Insta_db");
}

module.exports = connectToDb;