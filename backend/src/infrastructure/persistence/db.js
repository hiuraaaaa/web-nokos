const Database = require('better-sqlite3');
const path = require('path');
const env = require('../../config/env');

const dbPath = path.resolve(env.dbPath || './data/nokos.db');

// Pastikan folder data ada
const fs = require('fs');
const dir = path.dirname(dbPath);
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const db = new Database(dbPath);

// Aktifkan WAL mode biar concurrent read/write lebih cepat
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

// ── USERS ─────────────────────────────────────────────────────────────────────
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id          TEXT PRIMARY KEY,
    username    TEXT UNIQUE NOT NULL,
    email       TEXT UNIQUE NOT NULL,
    password    TEXT NOT NULL,
    balance     INTEGER NOT NULL DEFAULT 0,
    role        TEXT NOT NULL DEFAULT 'user',
    created_at  TEXT NOT NULL DEFAULT (datetime('now'))
  );
`);

// ── TOPUP TRANSACTIONS ────────────────────────────────────────────────────────
db.exec(`
  CREATE TABLE IF NOT EXISTS topups (
    id              TEXT PRIMARY KEY,
    user_id         TEXT NOT NULL,
    amount          INTEGER NOT NULL,
    fee             INTEGER NOT NULL DEFAULT 0,
    status          TEXT NOT NULL DEFAULT 'pending',
    payment_method  TEXT,
    tripay_ref      TEXT UNIQUE,
    tripay_channel  TEXT,
    pay_url         TEXT,
    paid_at         TEXT,
    created_at      TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (user_id) REFERENCES users(id)
  );
`);

// ── ORDERS ────────────────────────────────────────────────────────────────────
db.exec(`
  CREATE TABLE IF NOT EXISTS orders (
    order_id        TEXT PRIMARY KEY,
    user_id         TEXT NOT NULL,
    phone_number    TEXT,
    service         TEXT,
    country         TEXT,
    operator        TEXT,
    price           INTEGER,
    price_formatted TEXT,
    otp             TEXT,
    status          TEXT NOT NULL DEFAULT 'pending',
    created_at      TEXT,
    expired_at      TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );
`);

module.exports = db;
