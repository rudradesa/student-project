// habitDB.js
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

function initDB() {
  const dbPath = path.join(__dirname, "habits.db");
  const db = new sqlite3.Database(dbPath);

  db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS habits (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        completed INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
  });

  return db;
}

function addHabit(db, habit) {
  return new Promise((resolve, reject) => {
    db.run("INSERT INTO habits (name) VALUES (?)", [habit], function (err) {
      if (err) reject(err);
      else resolve({ id: this.lastID, name: habit });
    });
  });
}

function getHabits(db) {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM habits", [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

function markHabitComplete(db, id) {
  return new Promise((resolve, reject) => {
    db.run("UPDATE habits SET completed = 1 WHERE id = ?", [id], function (err) {
      if (err) reject(err);
      else resolve({ success: true });
    });
  });
}

module.exports = { initDB, addHabit, getHabits, markHabitComplete };
