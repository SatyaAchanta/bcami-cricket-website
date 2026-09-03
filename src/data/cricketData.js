export const orgInfo = {
  name: "Bangladesh Cricket Association of Michigan",
  shortName: "BCAMI",
  logo: "/logos/bcami-association.jpeg",
  tagline: "Empowering Cricket & Connecting the Community Across Michigan",
  est: "2016",
  email: "bcamiusa@gmail.com",
  location: "Detroit, Michigan, USA",
  socials: {
    facebook: "https://www.facebook.com/bcamiusa",
    instagram: "https://instagram.com/BCAMIUSA",
  },
  stats: [
    { label: "Participating Teams", value: "8" },
    { label: "Official Umpires", value: "7" },
    { label: "Tournament Matches", value: "12+" },
    { label: "Detroit Grounds", value: "3" },
  ]
};

export const currentTournament = {
  title: "2026 BD Community Cup",
  shortTitle: "2026 BDCC",
  logo: "/logos/bd-community-cup-logo.jpeg",
  badge: "Official Tournament",
  dates: "September 5 - 7, 2026",
  targetDate: "2026-09-05T10:00:00-04:00",
  primaryVenue: "Lasky Recreation Park, Detroit, MI",
  format: "12 League Matches + Playoffs",
  status: "UPCOMING",
  announcement: "Official Umpire Fair Play Evaluation Portal for the 2026 BD Community Cup (BDCC).",
};

export const umpires = [
  "TAMIM ONI",
  "VIJAY KHAMMAM",
  "MOHAMMED ZAMAN",
  "ANDY KOILPILLAI",
  "SUSHEEL BHAT",
  "VINEEL DUSSA",
  "ABU JAYED RAHI"
];

export const teams = [
  { id: "simbas-riders", name: "Simba's Riders", short: "SBR", color: "from-orange-600 to-red-900" },
  { id: "sultans-of-sylhet", name: "Sultans of Sylhet", short: "SOS", color: "from-amber-600 to-amber-900" },
  { id: "detroit-strikers", name: "Detroit Strikers", short: "DSK", color: "from-blue-600 to-indigo-950" },
  { id: "sylhet-express", name: "Sylhet Express MI", short: "SXI", color: "from-purple-600 to-indigo-900" },
  { id: "dream-touch", name: "Dream Touch", short: "DTC", color: "from-pink-600 to-rose-900" },
  { id: "friends-united", name: "Friends United", short: "FUT", color: "from-rose-600 to-red-950" },
  { id: "power-rangers", name: "Power Rangers", short: "PWR", color: "from-emerald-600 to-teal-900" },
  { id: "michigan-eagles", name: "Michigan Eagles", short: "MIE", color: "from-cyan-600 to-blue-900" },
];

export const venues = [
  {
    id: "lasky-park",
    name: "Lasky Recreation Park",
    badge: "Primary Tournament Hub",
    city: "Detroit, MI",
    address: "13200 Fenelon St, Detroit, MI 48212",
    description: "The primary headquarters and main stage for BD Community Cup matches, finals, and trophy presentations.",
    pitchType: "Artificial Turf / Matting Mat on Compact Base",
    features: ["Spectator Bleachers", "Practice Nets", "Scoreboard Tower", "Free Parking"],
    googleMapsUrl: "https://maps.google.com/?q=Lasky+Recreation+Park+Detroit+MI"
  },
  {
    id: "jayne-field",
    name: "Jayne Field (Playground)",
    badge: "Group Stage Arena",
    city: "Detroit, MI",
    address: "Conant St & Charles St, Detroit, MI 48212",
    description: "Expansive green park hosting group stage fixtures with large boundary dimensions.",
    pitchType: "Compact Turf Strip",
    features: ["Open Field Seating", "Multiple Pitch Layouts", "Adjacent Parking"],
    googleMapsUrl: "https://maps.google.com/?q=Jayne+Field+Detroit+MI"
  },
  {
    id: "delia-park",
    name: "Delia Park",
    badge: "Tournament Turf",
    city: "Sterling Heights, MI",
    address: "3001 18 Mile Rd, Sterling Heights, MI 48314",
    description: "Suburban facility utilized for weekend double-headers and playoff fixtures.",
    pitchType: "Quality Turf Strip",
    features: ["Pavilion & Restrooms", "Picnic Shelters", "Family Seating Area"],
    googleMapsUrl: "https://maps.google.com/?q=Delia+Park+Sterling+Heights+MI"
  }
];

// Exact 12 Official Matches from the Form (plus Playoffs)
export const fixtures = [
  {
    id: "m01",
    matchNo: "Match 1",
    stage: "League Match",
    team1: "Simba's Riders",
    team2: "Sultans of Sylhet",
    date: "Saturday, Sep 5, 2026",
    time: "10:00 AM EDT",
    venue: "Lasky Recreation Park",
    status: "UPCOMING",
    note: "Official opening league match."
  },
  {
    id: "m02",
    matchNo: "Match 2",
    stage: "League Match",
    team1: "Detroit Strikers",
    team2: "Sylhet Express MI",
    date: "Saturday, Sep 5, 2026",
    time: "10:00 AM EDT",
    venue: "Jayne Field",
    status: "UPCOMING",
    note: "Morning league clash."
  },
  {
    id: "m03",
    matchNo: "Match 3",
    stage: "League Match",
    team1: "Dream Touch",
    team2: "Friends United",
    date: "Saturday, Sep 5, 2026",
    time: "10:00 AM EDT",
    venue: "Delia Park",
    status: "UPCOMING",
    note: "Morning league clash at Delia Park."
  },
  {
    id: "m04",
    matchNo: "Match 4",
    stage: "League Match",
    team1: "Simba's Riders",
    team2: "Detroit Strikers",
    date: "Saturday, Sep 5, 2026",
    time: "2:30 PM EDT",
    venue: "Lasky Recreation Park",
    status: "UPCOMING",
    note: "Afternoon league match."
  },
  {
    id: "m05",
    matchNo: "Match 5",
    stage: "League Match",
    team1: "Sultans of Sylhet",
    team2: "Sylhet Express MI",
    date: "Saturday, Sep 5, 2026",
    time: "2:30 PM EDT",
    venue: "Jayne Field",
    status: "UPCOMING",
    note: "Afternoon rivalry match."
  },
  {
    id: "m06",
    matchNo: "Match 6",
    stage: "League Match",
    team1: "Power Rangers",
    team2: "Michigan Eagles",
    date: "Saturday, Sep 5, 2026",
    time: "2:30 PM EDT",
    venue: "Delia Park",
    status: "UPCOMING",
    note: "Saturday evening clash."
  },
  {
    id: "m07",
    matchNo: "Match 7",
    stage: "League Match",
    team1: "Dream Touch",
    team2: "Power Rangers",
    date: "Sunday, Sep 6, 2026",
    time: "10:00 AM EDT",
    venue: "Lasky Recreation Park",
    status: "UPCOMING",
    note: "Sunday morning opener."
  },
  {
    id: "m08",
    matchNo: "Match 8",
    stage: "League Match",
    team1: "Friends United",
    team2: "Michigan Eagles",
    date: "Sunday, Sep 6, 2026",
    time: "10:00 AM EDT",
    venue: "Jayne Field",
    status: "UPCOMING",
    note: "Sunday morning clash."
  },
  {
    id: "m09",
    matchNo: "Match 9",
    stage: "League Match",
    team1: "Detroit Strikers",
    team2: "Sultans of Sylhet",
    date: "Sunday, Sep 6, 2026",
    time: "10:00 AM EDT",
    venue: "Delia Park",
    status: "UPCOMING",
    note: "Crucial qualification clash."
  },
  {
    id: "m10",
    matchNo: "Match 10",
    stage: "League Match",
    team1: "Power Rangers",
    team2: "Friends United",
    date: "Sunday, Sep 6, 2026",
    time: "2:30 PM EDT",
    venue: "Lasky Recreation Park",
    status: "UPCOMING",
    note: "Round-robin showdown."
  },
  {
    id: "m11",
    matchNo: "Match 11",
    stage: "League Match",
    team1: "Michigan Eagles",
    team2: "Dream Touch",
    date: "Sunday, Sep 6, 2026",
    time: "2:30 PM EDT",
    venue: "Jayne Field",
    status: "UPCOMING",
    note: "Sunday afternoon fixture."
  },
  {
    id: "m12",
    matchNo: "Match 12",
    stage: "League Match",
    team1: "Sylhet Express MI",
    team2: "Simba's Riders",
    date: "Sunday, Sep 6, 2026",
    time: "2:30 PM EDT",
    venue: "Delia Park",
    status: "UPCOMING",
    note: "Final round-robin match before playoffs."
  },
  {
    id: "m13",
    matchNo: "Semi Final 1",
    stage: "Knockout",
    team1: "Top Seed 1",
    team2: "Top Seed 4",
    date: "Monday, Sep 7, 2026",
    time: "10:00 AM EDT",
    venue: "Lasky Recreation Park",
    status: "UPCOMING",
    note: "Winner advances directly to Grand Final."
  },
  {
    id: "m14",
    matchNo: "Semi Final 2",
    stage: "Knockout",
    team1: "Top Seed 2",
    team2: "Top Seed 3",
    date: "Monday, Sep 7, 2026",
    time: "10:00 AM EDT",
    venue: "Jayne Field",
    status: "UPCOMING",
    note: "Second semifinal match."
  },
  {
    id: "m15",
    matchNo: "Grand Final & Ceremony",
    stage: "Championship",
    team1: "Finalist 1",
    team2: "Finalist 2",
    date: "Monday, Sep 7, 2026",
    time: "2:30 PM EDT",
    venue: "Lasky Recreation Park",
    status: "UPCOMING",
    note: "Grand championship final and award presentations."
  }
];

// Exact question definitions from Google Form
export const SPIRIT_QUESTIONS = [
  {
    id: "respectUmpires",
    label: "Respect Toward Umpires",
    desc: "Accepting decisions, interaction with match officials (1 = Low, 5 = High)"
  },
  {
    id: "respectOpposition",
    label: "Respect Toward opposition",
    desc: "Behavior, conduct, and courtesy towards opponents (1 = Low, 5 = High)"
  },
  {
    id: "respectOwnTeam",
    label: "Respect Toward own team",
    desc: "Internal team conduct, captaincy, and player interactions (1 = Low, 5 = High)"
  },
  {
    id: "properAttire",
    label: "Proper Team Attire",
    desc: "All players, including 12th man, must be properly dressed in team uniform. The 12th man must wear the designated vest while on the ground. (1 = Low, 5 = High)"
  }
];

export const UNFAIR_PLAY_QUESTIONS = [
  {
    id: "disputeDecision",
    label: "To dispute an umpire's decision by word, action or gesture",
    desc: "0 = No violation, -1 to -5 = Severity of dissent"
  },
  {
    id: "abusiveLanguage",
    label: "To direct abusive language towards an opponent or umpire",
    desc: "0 = No violation, -1 to -5 = Severity of abusive language/sledging"
  },
  {
    id: "aggressiveAppeal",
    label: "To advance towards an umpire in an aggressive manner when appealing",
    desc: "0 = No violation, -1 to -5 = Severity of intimidating appeals"
  },
  {
    id: "distractOpponent",
    label: "To seek to distract an opponent either verbally or by harassment with persistent clapping or unnecessary noise",
    desc: "Under the guise of enthusiasm and motivation of one's own side (0 = No violation, -1 to -5)"
  },
  {
    id: "cheatingSharpPractice",
    label: "To indulge in cheating or any sharp practice",
    desc: "For instance: To appeal knowing that the batter is not out (0 = No violation, -1 to -5)"
  },
  {
    id: "timeWasting",
    label: "Time wasting, team and player involved deliberately wasting time",
    desc: "0 = No violation, -1 to -5 = Severity of deliberate delays"
  },
  {
    id: "damagingEquipment",
    label: "Damaging the pitch, bat, wickets, ball or any cricket/ground equipment due to frustration",
    desc: "0 = No violation, -1 to -5 = Equipment/pitch abuse"
  },
  {
    id: "dangerousBowling",
    label: "Dangerous or unfair bowling",
    desc: "0 = No violation, -1 to -5 = Dangerous bowling actions or beamers"
  },
  {
    id: "tamperingBall",
    label: "Tampering with the ball",
    desc: "0 = No violation, -1 to -5 = Illegal alteration of ball condition"
  },
  {
    id: "otherUnfairAction",
    label: "Any other action that considers to be unfair",
    desc: "0 = No violation, -1 to -5 = Any other unlisted unfair conduct"
  }
];
