const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('data/soupData.db');

db.serialize(() => {
    const userTableSql = `
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            send_time TEXT NOT NULL DEFAULT "08:00:00",
            emails_enabled INTEGER NOT NULL DEFAULT 1
        )`;
    db.run(userTableSql);

    const userSubredditsTableSql = `
        CREATE TABLE IF NOT EXISTS user_subreddits (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            subreddit TEXT NOT NULL
        )`;
    db.run(userSubredditsTableSql);
});

db.close();
