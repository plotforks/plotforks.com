-- One row per (UTC day, event key). k = type|journey|a|b|source. Nothing else is stored: no IP, no user agent, no cookie.
CREATE TABLE IF NOT EXISTS counts (
  day TEXT NOT NULL,
  k   TEXT NOT NULL,
  n   INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (day, k)
);
