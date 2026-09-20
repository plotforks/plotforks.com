-- One row per (UTC day, event key). k = type|journey|a|b|source. Nothing else is stored: no IP, no user agent, no cookie.
CREATE TABLE IF NOT EXISTS counts (
  day TEXT NOT NULL,
  k   TEXT NOT NULL,
  n   INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (day, k)
);

-- Public donations ledger, entered by hand from the private /admin page. Amounts in cents (EUR).
-- 'in' = a donation received, 'out' = money spent (domain, fees). A note is kept only for 'out' rows and is shown publicly.
-- No donor names, emails or any payer detail are ever stored.
CREATE TABLE IF NOT EXISTS ledger (
  id    INTEGER PRIMARY KEY AUTOINCREMENT,
  day   TEXT NOT NULL,
  kind  TEXT NOT NULL CHECK (kind IN ('in','out')),
  cents INTEGER NOT NULL CHECK (cents > 0),
  note  TEXT NOT NULL DEFAULT ''
);
