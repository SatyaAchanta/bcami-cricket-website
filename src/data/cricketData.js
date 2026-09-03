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
    { label: "League Matches", value: "10" },
    { label: "Playoff Matches", value: "3" },
    { label: "Detroit Grounds", value: "3" },
  ]
};

export const currentTournament = {
  title: "9th BD Community Cup 2026",
  shortTitle: "BD Community Cup 9",
  logo: "/logos/bd-community-cup-logo.jpeg",
  badge: "Labor Day Weekend Special",
  dates: "September 5 - 7, 2026",
  targetDate: "2026-09-05T10:00:00-04:00",
  primaryVenue: "Lasky Recreation Park, Detroit, MI",
  format: "10 League Matches + Semi Finals & Grand Final",
  status: "UPCOMING",
  announcement: "The 9th BD Community Cup 2026 is officially here! 10 League Matches on Sep 5–6 followed by Playoffs & Grand Final on Labor Day, Sep 7.",
};

export const teams = [
  { id: "power-rangers", name: "Power Rangers", short: "PWR", color: "from-emerald-600 to-teal-900", border: "border-emerald-500/40" },
  { id: "sultans-of-sylhet", name: "Sultan's of Sylhet", short: "SOS", color: "from-amber-600 to-amber-900", border: "border-amber-500/40" },
  { id: "detroit-strikers", name: "Detroit Strikers", short: "DSK", color: "from-blue-600 to-indigo-950", border: "border-blue-500/40" },
  { id: "friends-united", name: "Friends United Team", short: "FUT", color: "from-rose-600 to-red-950", border: "border-rose-500/40" },
  { id: "michigan-eagles", name: "Michigan Eagles Team", short: "MIE", color: "from-cyan-600 to-blue-900", border: "border-cyan-500/40" },
  { id: "sylhet-express", name: "Sylhet Express MI", short: "SXI", color: "from-purple-600 to-indigo-900", border: "border-purple-500/40" },
  { id: "dream-touch", name: "Dream Touch", short: "DTC", color: "from-pink-600 to-rose-900", border: "border-pink-500/40" },
  { id: "simbas-riders", name: "Simba's Riders Team", short: "SBR", color: "from-orange-600 to-red-900", border: "border-orange-500/40" },
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

// Full Official Schedule: 10 League Matches + Semi Finals & Final (Times: 10:00 AM & 2:30 PM)
export const fixtures = [
  // SATURDAY, SEPTEMBER 5, 2026 (Day 1 - 5 League Matches)
  {
    id: "m01",
    matchNo: "League Match 1",
    stage: "Group A",
    team1: "Power Rangers",
    team2: "Sultan's of Sylhet",
    date: "Saturday, Sep 5, 2026",
    time: "10:00 AM EDT",
    venue: "Lasky Recreation Park",
    status: "UPCOMING",
    note: "Opening curtain-raiser match at Lasky Park."
  },
  {
    id: "m02",
    matchNo: "League Match 2",
    stage: "Group B",
    team1: "Detroit Strikers",
    team2: "Michigan Eagles Team",
    date: "Saturday, Sep 5, 2026",
    time: "10:00 AM EDT",
    venue: "Jayne Field",
    status: "UPCOMING",
    note: "Morning group stage clash at Jayne Field."
  },
  {
    id: "m03",
    matchNo: "League Match 3",
    stage: "Group A",
    team1: "Friends United Team",
    team2: "Sylhet Express MI",
    date: "Saturday, Sep 5, 2026",
    time: "10:00 AM EDT",
    venue: "Delia Park",
    status: "UPCOMING",
    note: "Morning group match at Delia Park."
  },
  {
    id: "m04",
    matchNo: "League Match 4",
    stage: "Group B",
    team1: "Dream Touch",
    team2: "Simba's Riders Team",
    date: "Saturday, Sep 5, 2026",
    time: "2:30 PM EDT",
    venue: "Lasky Recreation Park",
    status: "UPCOMING",
    note: "Afternoon clash at Lasky Park."
  },
  {
    id: "m05",
    matchNo: "League Match 5",
    stage: "Group A",
    team1: "Power Rangers",
    team2: "Friends United Team",
    date: "Saturday, Sep 5, 2026",
    time: "2:30 PM EDT",
    venue: "Jayne Field",
    status: "UPCOMING",
    note: "Afternoon Group A fixture at Jayne Field."
  },

  // SUNDAY, SEPTEMBER 6, 2026 (Day 2 - 5 League Matches)
  {
    id: "m06",
    matchNo: "League Match 6",
    stage: "Group B",
    team1: "Detroit Strikers",
    team2: "Dream Touch",
    date: "Sunday, Sep 6, 2026",
    time: "10:00 AM EDT",
    venue: "Lasky Recreation Park",
    status: "UPCOMING",
    note: "Sunday morning opener at Lasky Park."
  },
  {
    id: "m07",
    matchNo: "League Match 7",
    stage: "Group A",
    team1: "Sultan's of Sylhet",
    team2: "Sylhet Express MI",
    date: "Sunday, Sep 6, 2026",
    time: "10:00 AM EDT",
    venue: "Jayne Field",
    status: "UPCOMING",
    note: "High-voltage Sunday morning derby at Jayne Field."
  },
  {
    id: "m08",
    matchNo: "League Match 8",
    stage: "Group B",
    team1: "Michigan Eagles Team",
    team2: "Simba's Riders Team",
    date: "Sunday, Sep 6, 2026",
    time: "10:00 AM EDT",
    venue: "Delia Park",
    status: "UPCOMING",
    note: "Key qualification clash at Delia Park."
  },
  {
    id: "m09",
    matchNo: "League Match 9",
    stage: "Group A",
    team1: "Power Rangers",
    team2: "Sylhet Express MI",
    date: "Sunday, Sep 6, 2026",
    time: "2:30 PM EDT",
    venue: "Lasky Recreation Park",
    status: "UPCOMING",
    note: "Decisive Group A round-robin finale."
  },
  {
    id: "m10",
    matchNo: "League Match 10",
    stage: "Group B",
    team1: "Detroit Strikers",
    team2: "Simba's Riders Team",
    date: "Sunday, Sep 6, 2026",
    time: "2:30 PM EDT",
    venue: "Jayne Field",
    status: "UPCOMING",
    note: "Final group stage match before playoffs."
  },

  // MONDAY, SEPTEMBER 7, 2026 (Day 3 - Playoffs & Finals)
  {
    id: "m11",
    matchNo: "Semi Final 1",
    stage: "Knockout",
    team1: "Group A Winner",
    team2: "Group B Runner-Up",
    date: "Monday, Sep 7, 2026",
    time: "10:00 AM EDT",
    venue: "Lasky Recreation Park",
    status: "UPCOMING",
    note: "First semifinal — winner advances directly to the Grand Final."
  },
  {
    id: "m12",
    matchNo: "Semi Final 2",
    stage: "Knockout",
    team1: "Group B Winner",
    team2: "Group A Runner-Up",
    date: "Monday, Sep 7, 2026",
    time: "10:00 AM EDT",
    venue: "Jayne Field",
    status: "UPCOMING",
    note: "Second semifinal battle for a finals ticket."
  },
  {
    id: "m13",
    matchNo: "Grand Final & Ceremony",
    stage: "Championship",
    team1: "Finalist 1",
    team2: "Finalist 2",
    date: "Monday, Sep 7, 2026",
    time: "2:30 PM EDT",
    venue: "Lasky Recreation Park",
    status: "UPCOMING",
    note: "Championship Grand Final, trophy presentation & Fair Play Award ceremony."
  }
];
