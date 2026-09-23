# IPIP-NEO-120 Free Personality Test (Scientific Production-Ready App)

An open-source, scientifically validated web application for assessing the Five-Factor Model (Big Five) personality traits and 30 facets based on the official 120-item public domain inventory by Dr. John A. Johnson (2014).

![IPIP-NEO-120 Preview](https://ipip.ori.org/30FacetNEO-PI-RItems.htm)

---

## 🚀 Key Features

1. **120 Official IPIP Items**: 100% exact text from Dr. John A. Johnson's official 2014 pool, with automatic reverse keying (`+` / `-`).
2. **Mobile-First Experience**: 1 item per screen view on mobile devices with touch gesture friendliness, progress bar, auto-save state, and item overview drawer map.
3. **Pure TypeScript Scoring Engine**: Zero-dependency, pure function calculating 5 domain scores (range 24–120) and 30 facet sub-scores (range 4–20).
4. **Interactive Psychometric Report**:
   - Recharts Radar Chart for Big Five domains.
   - Grouped horizontal bar charts for all 30 facets with low/average/high norm classifications.
   - Downloadable PDF report and raw JSON data export.
   - Shareable result links via UUID.
5. **Cloudflare Workers & D1 Integration**:
   - Serverless API endpoints (`POST /api/submit`, `GET /api/result/:id`, `POST /api/retest`).
   - Anonymous research responses stored in SQLite Cloudflare D1.
6. **Test-Retest Reliability Protocol**: Participants can link a previous assessment UUID to track temporal stability over time.
7. **Bilingual Support**: Instant toggle between English and Indonesian (Bahasa Indonesia).

---

## 🛠 Tech Stack

- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS v4
- **Routing**: React Router v6
- **State Management**: Zustand (with localStorage persistence)
- **Visualizations**: Recharts, Lucide Icons, Canvas Confetti
- **Exporting**: jsPDF, html2canvas
- **Backend / Database**: Cloudflare Workers, Cloudflare D1 (SQLite)
- **Deployment**: Cloudflare Pages / Wrangler CLI

---

## 📊 Database Schema (Cloudflare D1)

```sql
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
```

---

## 💻 Local Development Setup

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/your-username/ipip-neo-120-personality-test.git
cd ipip-neo-120-personality-test
pnpm install
# or npm install / yarn
```

### 2. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ☁️ Cloudflare Pages & D1 Deployment Instructions

### Step 1: Create Cloudflare D1 Database
```bash
npx wrangler d1 create psikotest-db
```
*Take note of the generated `database_id`.*

### Step 2: Configure `wrangler.toml`
Update `wrangler.toml` with your D1 database ID:
```toml
name = "ipip-neo-120-test"
compatibility_date = "2024-09-23"

pages_build_output_dir = "./dist"

[[d1_databases]]
binding = "DB"
database_name = "psikotest-db"
database_id = "80fc899c-d6c6-47e8-8be9-0db0ee513671"
```

### Step 3: Execute Database Schema Migration
Run the SQL schema script against your local or remote Cloudflare D1 database:
```bash
# Execute remotely on Cloudflare D1
npx wrangler d1 execute psikotest-db --file=./schema.sql

# Execute locally for test
npx wrangler d1 execute psikotest-db --local --file=./schema.sql
```

### Step 4: Build & Deploy to Cloudflare Pages
```bash
npm run build
npx wrangler pages deploy ./dist --project-name=ipip-neo-120-test
```

---

## 📚 Scientific References & Citations

Please cite the following papers when referencing or utilizing this assessment:

1. **Primary IPIP-NEO-120 Reference:**
   > Johnson, J. A. (2014). Measuring thirty facets of the Five Factor Model with a 120-item public domain inventory: Development of the IPIP-NEO-120. *Journal of Research in Personality*, 51, 78–89. https://doi.org/10.1016/j.jrp.2014.05.003

2. **International Personality Item Pool (IPIP) Reference:**
   > Goldberg, L. R., Johnson, J. A., Eber, H. W., Hogan, R., Ashton, M. C., Cloninger, C. R., & Gough, H. G. (2006). The international personality item pool and the future of public-domain personality measures. *Journal of Research in Personality*, 40(1), 84–96. https://doi.org/10.1016/j.jrp.2005.08.007

3. **Official IPIP Web Repository:**
   > IPIP Website: [https://ipip.ori.org/](https://ipip.ori.org/)

---

## ⚖️ Clinical Disclaimer

This software is provided for educational, personal self-exploration, and academic psychometric research purposes only. It is **NOT** a clinical diagnostic tool or psychological health evaluation instrument.
