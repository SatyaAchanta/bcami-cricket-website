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
    { label: "Community Teams", value: "8" },
    { label: "Annual Editions", value: "9th" },
    { label: "Community Matches", value: "20+" },
    { label: "Detroit Venues", value: "3" },
  ]
};

export const currentTournament = {
  title: "9th BD Community Cup 2026",
  shortTitle: "BD Community Cup 9",
  logo: "/logos/bd-community-cup-logo.jpeg",
  badge: "Labor Day Weekend Special",
  dates: "September 5 - 7, 2026",
  targetDate: "2026-09-05T09:00:00-04:00",
  primaryVenue: "Lasky Recreation Park, Detroit, MI",
  format: "T20 Group Stage + Knockouts",
  status: "UPCOMING",
  announcement: "The 9th BD Community Cup 2026 is officially here! 8 premier community teams battle across Lasky Park, Jayne Field, and Delia Park.",
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

export const fixtures = [
  {
    id: "m01",
    matchNo: "Match 1 (Opening Game)",
    stage: "Group A",
    team1: "Power Rangers",
    team2: "Sultan's of Sylhet",
    date: "Saturday, Sep 5, 2026",
    time: "9:00 AM EDT",
    venue: "Lasky Recreation Park",
    status: "UPCOMING",
    note: "Defending champions vs. 2-time titleholders opening clash."
  },
  {
    id: "m02",
    matchNo: "Match 2",
    stage: "Group B",
    team1: "Detroit Strikers",
    team2: "Michigan Eagles Team",
    date: "Saturday, Sep 5, 2026",
    time: "1:00 PM EDT",
    venue: "Jayne Field",
    status: "UPCOMING",
    note: "High-octane group stage match at Jayne Field."
  },
  {
    id: "m03",
    matchNo: "Match 3",
    stage: "Group A",
    team1: "Friends United Team",
    team2: "Sylhet Express MI",
    date: "Saturday, Sep 5, 2026",
    time: "4:30 PM EDT",
    venue: "Lasky Recreation Park",
    status: "UPCOMING",
    note: "Evening group stage match at Lasky Park."
  },
  {
    id: "m04",
    matchNo: "Match 4",
    stage: "Group B",
    team1: "Dream Touch",
    team2: "Simba's Riders Team",
    date: "Sunday, Sep 6, 2026",
    time: "9:30 AM EDT",
    venue: "Delia Park",
    status: "UPCOMING",
    note: "Morning weekend match at Delia Park."
  },
  {
    id: "m05",
    matchNo: "Semi Final 1",
    stage: "Knockout",
    team1: "Group A Winner",
    team2: "Group B Runner-Up",
    date: "Sunday, Sep 6, 2026",
    time: "3:00 PM EDT",
    venue: "Lasky Recreation Park",
    status: "UPCOMING",
    note: "Winner advances directly to the Grand Final."
  },
  {
    id: "m06",
    matchNo: "Grand Final & Ceremony",
    stage: "Championship",
    team1: "Finalist 1",
    team2: "Finalist 2",
    date: "Monday, Sep 7, 2026",
    time: "2:00 PM EDT",
    venue: "Lasky Recreation Park",
    status: "UPCOMING",
    note: "Championship final match, trophy presentation & prize distributions."
  }
];
