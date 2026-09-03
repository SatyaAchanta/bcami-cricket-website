# Bangladesh Cricket Association of Michigan (BCAMI) Official Website & Umpire Portal

Official website for **BCAMIUSA** and the annual **BD Community Cup** in Detroit, Michigan. Features a modern sports UI, real-time tournament countdown, match schedule and points table, Detroit venues directory with Google Maps routing, organization governance, and an official **Clerk-Ready Umpire Fair Play Assessment Portal**.

---

## 🏏 Core Features

1. **Tournament Match Center (`#schedule`):**
   - Fixture schedule filtered by stage (Group A, Group B, Knockouts).
   - Results with Player of the Match awards and scorecard previews.
   - Points Table with Net Run Rate (NRR) and qualification standings.

2. **Detroit Grounds & Directions (`#grounds`):**
   - **Lasky Recreation Park** (Detroit, MI - Main Hub)
   - **Jayne Field** (Detroit, MI)
   - **Delia Park** (Sterling Heights, MI)
   - Pitch specifications, amenities, and direct Google Maps navigation.

3. **About BCAMI (`#about`):**
   - Mission, committee leadership, and tournament playing conditions.

4. **Umpire Fair Play Rating Portal (`#umpire-portal`):**
   - Protected by **Clerk Authentication** (`@clerk/clerk-react`).
   - 5-point assessment criteria (1 to 10 scale = 50 max points).
   - Disciplinary warning and penalty run tracker.
   - **Export to CSV** and **Copy for Sheets** to sync directly with Google Sheets.
   - Recorded assessments history and fair play percentages.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Clerk Authentication (Optional)
Create a `.env` file in the root directory:
```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
```
*(Note: If omitted, the website runs with the built-in offline umpire authentication toggle).*

### 3. Run Development Server
```bash
npm run dev
```

### 4. Build for Production
```bash
npm run build
```

---

## 📁 Project Structure

```
├── public/
│   └── cricket-ball.svg
├── src/
│   ├── components/
│   │   ├── AboutLeadership.jsx
│   │   ├── AuthModal.jsx
│   │   ├── ClerkAuthBridge.jsx
│   │   ├── ContactFooter.jsx
│   │   ├── Hero.jsx
│   │   ├── MatchCenter.jsx
│   │   ├── Navbar.jsx
│   │   ├── SponsorsWall.jsx
│   │   ├── TeamsSection.jsx
│   │   ├── UmpirePortal.jsx
│   │   └── VenuesGuide.jsx
│   ├── data/
│   │   └── cricketData.js       # Central data store (Teams, Fixtures, Venues)
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── package.json
├── vite.config.js
└── README.md
```
