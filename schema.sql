-- Cloudflare D1 Database Schema for IPIP-NEO-120 Personality Test
-- Database: psikotest-db (ID: 80fc899c-d6c6-47e8-8be9-0db0ee513671)

CREATE TABLE IF NOT EXISTS responses (
  id TEXT PRIMARY KEY,                -- v4 UUID
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  age INTEGER,
  gender TEXT,
  consent INTEGER DEFAULT 0,
  answers TEXT NOT NULL,              -- JSON array of 120 integers (1-5)
  scores TEXT,                        -- JSON object containing domain + facet scores
  user_agent TEXT,
  country TEXT,
  is_retest INTEGER DEFAULT 0,
  retest_of TEXT                      -- Original UUID if test-retest session
);

-- Index for test-retest lookup
CREATE INDEX IF NOT EXISTS idx_responses_retest ON responses(retest_of);
