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
    { label: "Annual Editions", value: "9th" },
    { label: "Community Matches", value: "20+" },
    { label: "Detroit Venues", value: "3" },
    { label: "Cricket Community", value: "Michigan" },
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
  announcement: "The 9th BD Community Cup 2026 is officially here! September 5 - 7, 2026 across Detroit grounds.",
};

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
    team1: "Team A",
    team2: "Team B",
    date: "Saturday, Sep 5, 2026",
    time: "9:00 AM EDT",
    venue: "Lasky Recreation Park",
    status: "UPCOMING",
    note: "Official opening match of the 9th BD Community Cup."
  },
  {
    id: "m02",
    matchNo: "Match 2",
    stage: "Group B",
    team1: "Team C",
    team2: "Team D",
    date: "Saturday, Sep 5, 2026",
    time: "1:00 PM EDT",
    venue: "Jayne Field",
    status: "UPCOMING",
    note: "Group stage match at Jayne Field."
  },
  {
    id: "m03",
    matchNo: "Match 3",
    stage: "Group A",
    team1: "Team E",
    team2: "Team F",
    date: "Saturday, Sep 5, 2026",
    time: "4:30 PM EDT",
    venue: "Lasky Recreation Park",
    status: "UPCOMING",
    note: "Evening group stage match."
  },
  {
    id: "m04",
    matchNo: "Match 4",
    stage: "Group B",
    team1: "Team G",
    team2: "Team H",
    date: "Sunday, Sep 6, 2026",
    time: "9:30 AM EDT",
    venue: "Delia Park",
    status: "UPCOMING",
    note: "Morning weekend group match."
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
