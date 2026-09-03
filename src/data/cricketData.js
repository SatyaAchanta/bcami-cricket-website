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
    youtube: "https://youtube.com",
  },
  stats: [
    { label: "Community Franchises", value: "8+" },
    { label: "BD Community Cup Editions", value: "9th" },
    { label: "Active Players", value: "150+" },
    { label: "Matches Played Each Season", value: "20+" },
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
  liveStreamUrl: "https://www.youtube.com",
  cricClubsUrl: "https://cricclubs.com",
  status: "UPCOMING",
  announcement: "The 9th BD Community Cup 2026 is officially here! 8 premier franchises battle for Michigan cricket supremacy across Lasky Park, Jayne Field, and Delia Park.",
};

export const teams = [
  {
    id: "sultans-of-sylhet",
    name: "Sultan's of Sylhet",
    short: "SOS",
    color: "from-amber-600 to-amber-900",
    badgeColor: "bg-amber-600",
    textColor: "text-amber-400",
    jersey: "Amber Gold & Black",
    captain: "Mahfuz Rahman",
    owner: "Sylhet Heritage Group",
    titles: "2x Champions (2022, 2024)",
    bio: "Known for their explosive top-order batting and passionate fanbase, the Sultans are perennial contenders in the BD Community Cup.",
    squad: [
      { name: "Mahfuz Rahman", role: "Captain / All-rounder" },
      { name: "Tanvir Ahmed", role: "Opening Batter" },
      { name: "Shakil Hossain", role: "Wicketkeeper Batter" },
      { name: "Rifat Chowdhury", role: "Fast Bowler" },
      { name: "Zubair Al-Mamun", role: "Leg Spinner" },
      { name: "Faisal Kabir", role: "Middle-order Batter" },
      { name: "Kamran Khan", role: "Pace Bowler" },
      { name: "Nayeem Uddin", role: "All-rounder" }
    ]
  },
  {
    id: "power-rangers",
    name: "Power Rangers",
    short: "PWR",
    color: "from-emerald-600 to-teal-900",
    badgeColor: "bg-emerald-600",
    textColor: "text-emerald-400",
    jersey: "Neon Emerald & Navy",
    captain: "Saif Islam",
    owner: "Detroit Metro Sports Club",
    titles: "Defending Champions (2025)",
    bio: "Reigning champions boasting lethal death-bowling and athletic fielding across all three Michigan venues.",
    squad: [
      { name: "Saif Islam", role: "Captain / Fast Bowler" },
      { name: "Imran Qureshi", role: "Top Order Batter" },
      { name: "Nazmul Hassan", role: "All-rounder" },
      { name: "Arifur Rahman", role: "Off-spinner" },
      { name: "Shahriar Noman", role: "Wicketkeeper" },
      { name: "Tariqul Islam", role: "Finisher / Batter" },
      { name: "Habib Ullah", role: "Left-arm Seamer" },
      { name: "Sabbir Ahmed", role: "Batting All-rounder" }
    ]
  },
  {
    id: "detroit-strikers",
    name: "Detroit Strikers",
    short: "DSK",
    color: "from-blue-600 to-indigo-950",
    badgeColor: "bg-blue-600",
    textColor: "text-blue-400",
    jersey: "Royal Blue & Silver",
    captain: "Farhan Chowdhury",
    owner: "Motor City Cricket Syndicate",
    titles: "1x Champion (2023)",
    bio: "A disciplined powerhouse with a tactical focus on spin choking in the middle overs and aggressive opening partnerships.",
    squad: [
      { name: "Farhan Chowdhury", role: "Captain / Batter" },
      { name: "Mehedi Hasan", role: "All-rounder" },
      { name: "Rashedul Karim", role: "Fast Bowler" },
      { name: "Anisur Rahman", role: "Wicketkeeper" },
      { name: "Rakib Al Hasan", role: "Mystery Spinner" },
      { name: "Towhidul Alam", role: "Pinch Hitter" },
      { name: "Junaid Siddiqui", role: "Medium Pacer" },
      { name: "Mushfiqur Rahim (Jr.)", role: "Middle Order" }
    ]
  },
  {
    id: "friends-united",
    name: "Friends United Team",
    short: "FUT",
    color: "from-rose-600 to-red-950",
    badgeColor: "bg-rose-600",
    textColor: "text-rose-400",
    jersey: "Crimson Red & Charcoal",
    captain: "Ashraful Haque",
    owner: "Michigan Community Alliance",
    titles: "Runners-up (2024)",
    bio: "Built on great camaraderie and veteran leadership, Friends United is known for thrilling last-over finishes.",
    squad: [
      { name: "Ashraful Haque", role: "Captain / All-rounder" },
      { name: "Ziaur Rahman", role: "Opening Batter" },
      { name: "Golam Sarwar", role: "Medium Fast" },
      { name: "Moshiur Rahman", role: "Spin Bowler" },
      { name: "Kazi Nabil", role: "Wicketkeeper Batter" },
      { name: "Sayeed Anwar", role: "Batter" },
      { name: "Rubel Ahmed", role: "Death Bowler" },
      { name: "Fahim Shahriar", role: "All-rounder" }
    ]
  },
  {
    id: "michigan-eagles",
    name: "Michigan Eagles Team",
    short: "MIE",
    color: "from-cyan-600 to-blue-900",
    badgeColor: "bg-cyan-600",
    textColor: "text-cyan-400",
    jersey: "Sky Blue & White",
    captain: "Nasir Uddin",
    owner: "Great Lakes Cricket Group",
    titles: "Semi-Finalists (2025)",
    bio: "High-flying youngsters with raw pace and electric boundary-riding speed that keep opponents on the backfoot.",
    squad: [
      { name: "Nasir Uddin", role: "Captain / Batter" },
      { name: "Mustafizur Roni", role: "Express Fast Bowler" },
      { name: "Sohail Rana", role: "All-rounder" },
      { name: "Emon Mahmud", role: "Wicketkeeper" },
      { name: "Al Amin", role: "Off Spinner" },
      { name: "Shohel Arman", role: "Top Order Batter" },
      { name: "Joynal Abedin", role: "Pace Bowler" },
      { name: "Biplob Hossain", role: "Batter" }
    ]
  },
  {
    id: "sylhet-express",
    name: "Sylhet Express MI",
    short: "SXI",
    color: "from-purple-600 to-indigo-900",
    badgeColor: "bg-purple-600",
    textColor: "text-purple-400",
    jersey: "Deep Purple & Gold",
    captain: "Khaled Mahmud",
    owner: "Hamtramck Express Community",
    titles: "1x Champions (2021)",
    bio: "The fastest paced attack in Michigan cricket, combining veteran tactical depth with young swing bowling talents.",
    squad: [
      { name: "Khaled Mahmud", role: "Captain / Fast Bowler" },
      { name: "Shahadat Hossain", role: "Top Order Batter" },
      { name: "Afzalur Rahman", role: "Wicketkeeper" },
      { name: "Tamim Iqbal (MI)", role: "Aggressive Opener" },
      { name: "Hasan Ali", role: "All-rounder" },
      { name: "Mizanur Rahman", role: "Leg Spinner" },
      { name: "Shakhawat Hossain", role: "Middle Order" },
      { name: "Jasim Uddin", role: "Medium Pacer" }
    ]
  },
  {
    id: "dream-touch",
    name: "Dream Touch",
    short: "DTC",
    color: "from-pink-600 to-rose-900",
    badgeColor: "bg-pink-600",
    textColor: "text-pink-400",
    jersey: "Magenta & Obsidian",
    captain: "Riad Hasan",
    owner: "Dream Touch Enterprises",
    titles: "Semi-Finalists (2024)",
    bio: "Fearless batting unit capable of chasing massive totals under pressure on any pitch surface.",
    squad: [
      { name: "Riad Hasan", role: "Captain / Batter" },
      { name: "Shofiul Islam", role: "Pace Bowler" },
      { name: "Anowar Hossain", role: "All-rounder" },
      { name: "Babul Mia", role: "Wicketkeeper" },
      { name: "Nurul Huda", role: "Left Arm Spinner" },
      { name: "Tofazzal Hossain", role: "Middle Order" },
      { name: "Liton Das (MI)", role: "Opener" },
      { name: "Shahriar Kabir", role: "Bowler" }
    ]
  },
  {
    id: "simbas-riders",
    name: "Simba's Riders Team",
    short: "SBR",
    color: "from-orange-600 to-red-900",
    badgeColor: "bg-orange-600",
    textColor: "text-orange-400",
    jersey: "Tiger Orange & Charcoal",
    captain: "Tareq Aziz",
    owner: "Simba Automotive & Sports",
    titles: "Plate Winners (2025)",
    bio: "Fierce fighting spirit and relentless enthusiasm, playing with relentless energy till the final ball.",
    squad: [
      { name: "Tareq Aziz", role: "Captain / All-rounder" },
      { name: "Shafiqul Islam", role: "Opening Batter" },
      { name: "Masud Rana", role: "Fast Bowler" },
      { name: "Monirul Islam", role: "Off Spinner" },
      { name: "Kabir Hossain", role: "Wicketkeeper Batter" },
      { name: "Asaduzzaman", role: "Finisher" },
      { name: "Zahid Hasan", role: "Medium Fast" },
      { name: "Miraz Ahmed", role: "All-rounder" }
    ]
  }
];

export const venues = [
  {
    id: "lasky-park",
    name: "Lasky Recreation Park",
    badge: "Primary Tournament Hub",
    city: "Detroit, MI",
    address: "13200 Fenelon St, Detroit, MI 48212",
    description: "The historic headquarters of BCAMI and the main stage for BD Community Cup Finals and draft ceremonies.",
    pitchType: "Artificial Turf / Matting Mat on Compact Base",
    features: ["Spectator Bleachers", "Practice Nets", "Scoreboard Tower", "Free Parking"],
    googleMapsUrl: "https://maps.google.com/?q=Lasky+Recreation+Park+Detroit+MI",
    embedMapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2946.518635815152!2d-83.04781492348539!3d42.40871217118837!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8824d26210f92ffb%3A0x8849b207a216db8a!2sLasky%20Recreation%20Center!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
  },
  {
    id: "jayne-field",
    name: "Jayne Field (Playground)",
    badge: "Group Stage Arena",
    city: "Detroit, MI",
    address: "Conant St & Charles St, Detroit, MI 48212",
    description: "Expansive green park hosted multiple group stage thrillers with large boundary dimensions.",
    pitchType: "Compact Turf Strip",
    features: ["Open Field Seating", "Multiple Pitch Layouts", "Adjacent Parking"],
    googleMapsUrl: "https://maps.google.com/?q=Jayne+Field+Detroit+MI"
  },
  {
    id: "delia-park",
    name: "Delia Park",
    badge: "High-Octane Turf",
    city: "Sterling Heights, MI",
    address: "3001 18 Mile Rd, Sterling Heights, MI 48314",
    description: "Premium suburban facility utilized for high-scoring crossover matches and weekend double-headers.",
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
    note: "Defending champions take on 2-time titleholders in blockbuster curtain raiser."
  },
  {
    id: "m02",
    matchNo: "Match 2",
    stage: "Group B",
    team1: "Detroit Strikers",
    team2: "Michigan Eagles",
    date: "Saturday, Sep 5, 2026",
    time: "1:00 PM EDT",
    venue: "Jayne Field",
    status: "UPCOMING",
    note: "Speed vs. tactical spin masterclass."
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
    note: "High-intensity rivalry match under the evening floodlights."
  },
  {
    id: "m04",
    matchNo: "Match 4",
    stage: "Group B",
    team1: "Dream Touch",
    team2: "Simba's Riders",
    date: "Sunday, Sep 6, 2026",
    time: "9:30 AM EDT",
    venue: "Delia Park",
    status: "UPCOMING",
    note: "Crucial group qualification clash."
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
    note: "Championship trophy presentation, prize distributions & cultural banquet."
  }
];

export const recentResults = [
  {
    id: "res-01",
    tournament: "8th BD Community Cup Final",
    date: "Labor Day 2025",
    winner: "Power Rangers",
    loser: "Sultan's of Sylhet",
    summary: "Power Rangers won by 18 runs",
    score1: "Power Rangers: 174/6 (20.0 ov)",
    score2: "Sultans of Sylhet: 156/9 (20.0 ov)",
    playerOfMatch: "Saif Islam (4/22 & 28*)",
    venue: "Lasky Recreation Park"
  },
  {
    id: "res-02",
    tournament: "8th BD Community Cup Semi-Final",
    date: "Sep 2025",
    winner: "Sultan's of Sylhet",
    loser: "Detroit Strikers",
    summary: "Sultan's won by 5 wickets with 3 balls to spare",
    score1: "Detroit Strikers: 162/8 (20.0 ov)",
    score2: "Sultan's of Sylhet: 165/5 (19.3 ov)",
    playerOfMatch: "Tanvir Ahmed (68 off 42)",
    venue: "Jayne Field"
  },
  {
    id: "res-03",
    tournament: "Community Super-Cup 2025",
    date: "July 2025",
    winner: "Friends United Team",
    loser: "Michigan Eagles",
    summary: "Friends United won by 4 wickets",
    score1: "Michigan Eagles: 145/10 (18.4 ov)",
    score2: "Friends United: 149/6 (18.2 ov)",
    playerOfMatch: "Ashraful Haque (52 & 2 wkts)",
    venue: "Delia Park"
  }
];

export const pointsTableGroupA = [
  { team: "Power Rangers", played: 3, won: 3, lost: 0, nrr: "+1.420", points: 6 },
  { team: "Sultan's of Sylhet", played: 3, won: 2, lost: 1, nrr: "+0.850", points: 4 },
  { team: "Friends United Team", played: 3, won: 1, lost: 2, nrr: "-0.320", points: 2 },
  { team: "Sylhet Express MI", played: 3, won: 0, lost: 3, nrr: "-1.950", points: 0 }
];

export const pointsTableGroupB = [
  { team: "Detroit Strikers", played: 3, won: 2, lost: 1, nrr: "+1.120", points: 4 },
  { team: "Michigan Eagles", played: 3, won: 2, lost: 1, nrr: "+0.450", points: 4 },
  { team: "Dream Touch", played: 3, won: 1, lost: 2, nrr: "-0.150", points: 2 },
  { team: "Simba's Riders", played: 3, won: 1, lost: 2, nrr: "-1.420", points: 2 }
];

export const galleryItems = [
  {
    id: 1,
    title: "Championship Trophy Lift",
    category: "Trophies",
    caption: "Power Rangers celebrating the 8th BD Community Cup championship victory at Lasky Park.",
    image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    title: "Thunderous Boundary Drive",
    category: "Matchday Action",
    caption: "Cover drive for four during a crucial playoff match at Lasky Recreation Park.",
    image: "https://images.unsplash.com/photo-1531415074868-036b1c5c53ec?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    title: "Player Draft Night Gala",
    category: "Draft & Events",
    caption: "Franchise owners and captains selecting their marquee squads during the live draft night.",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    title: "Express Pace Delivery",
    category: "Matchday Action",
    caption: "Fast bowling masterclass swinging the red ball in the opening powerplay.",
    image: "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 5,
    title: "Passionate Community Fans",
    category: "Community",
    caption: "Hundreds of community supporters cheering under the summer sun in Detroit.",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 6,
    title: "Man of the Match Accolades",
    category: "Awards",
    caption: "Distributing the coveted MVP awards and cash prizes post-match.",
    image: "https://images.unsplash.com/photo-1569517282132-25d22f4573e6?auto=format&fit=crop&w=800&q=80"
  }
];

export const sponsors = [
  {
    tier: "Title Sponsor",
    tierColor: "border-amber-500 bg-amber-500/10 text-amber-300",
    list: [
      { name: "Detroit Metro Bengali Association", subtitle: "Official Community & Cultural Partner", logoText: "DMBA" }
    ]
  },
  {
    tier: "Platinum Partners",
    tierColor: "border-cyan-500 bg-cyan-500/10 text-cyan-300",
    list: [
      { name: "Motor City Auto Center", subtitle: "Automotive Sales & Repair Detroit", logoText: "MC AUTO" },
      { name: "Sylhet Heritage Foods", subtitle: "Authentic Catering & Grocery", logoText: "SH FOODS" }
    ]
  },
  {
    tier: "Gold & Kit Sponsors",
    tierColor: "border-emerald-500 bg-emerald-500/10 text-emerald-300",
    list: [
      { name: "Great Lakes Realty Group", subtitle: "Michigan Real Estate Services", logoText: "GL REALTY" },
      { name: "Bengal Pharmacy Hamtramck", subtitle: "Community Health Partner", logoText: "BENGAL RX" },
      { name: "Dream Touch IT & Media", subtitle: "Broadcast & Tech Sponsor", logoText: "DREAM TOUCH" }
    ]
  }
];

export const executiveCommittee = [
  {
    name: "Mohammad K. Islam",
    role: "President, BCAMI",
    bio: "Pioneering the growth of Bangladeshi cricket in Michigan for over a decade.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80"
  },
  {
    name: "Mahbubur Rahman",
    role: "General Secretary",
    bio: "Overseeing league operations, park logistics, and community outreach.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80"
  },
  {
    name: "Tariqul Anam",
    role: "Tournament Director",
    bio: "Head of BD Community Cup tournament scheduling, umpiring, and CricClubs scoring.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80"
  },
  {
    name: "Kamrul Hassan",
    role: "Head of Communications & Media",
    bio: "Managing live streaming broadcasts, photography, and social channels (@bcamiusa).",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80"
  }
];
