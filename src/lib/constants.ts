
import { SupportTier } from "../types";

export const SUPPORT_TIERS: SupportTier[] = [
  { value: 30, label: "30 KSh" },
  { value: 50, label: "50 KSh" },
  { value: 100, label: "100 KSh" },
  { value: 150, label: "150 KSh" },
  { value: 200, label: "200 KSh" },
  { value: 400, label: "400 KSh" },
];

export const MOCK_GENRES = [
  "Hip Hop",
  "R&B",
  "Afrobeat",
  "Gospel",
  "Benga",
  "Gengetone",
  "Reggae",
  "Pop",
  "Rock",
  "Jazz",
  "Electronic",
  "Classical",
];

// Mock data for initial UI
export const MOCK_TRACKS = [
  {
    id: "track1",
    title: "African Spirit",
    artistId: "artist1",
    artistName: "Wanjiru Beats",
    coverImage: "/placeholder.svg",
    audioFile: "",
    price: 50,
    duration: 3 * 60 + 45, // 3:45
    genre: "Afrobeat",
    releaseDate: new Date(),
    downloads: 1240,
  },
  {
    id: "track2",
    title: "Nairobi Nights",
    artistId: "artist2",
    artistName: "DJ Simba",
    coverImage: "/placeholder.svg",
    audioFile: "",
    price: 30,
    duration: 4 * 60 + 20, // 4:20
    genre: "Gengetone",
    releaseDate: new Date(),
    downloads: 890,
  },
  {
    id: "track3",
    title: "Mountain High",
    artistId: "artist3",
    artistName: "Grace Harmony",
    coverImage: "/placeholder.svg",
    audioFile: "",
    price: 100,
    duration: 3 * 60 + 15, // 3:15
    genre: "Gospel",
    releaseDate: new Date(),
    downloads: 450,
  },
  {
    id: "track4",
    title: "City Vibrations",
    artistId: "artist1",
    artistName: "Wanjiru Beats",
    coverImage: "/placeholder.svg",
    audioFile: "",
    price: 150,
    duration: 2 * 60 + 55, // 2:55
    genre: "Electronic",
    releaseDate: new Date(),
    downloads: 720,
  },
  {
    id: "track5",
    title: "Savanna Dreams",
    artistId: "artist4",
    artistName: "Kibaki Flow",
    coverImage: "/placeholder.svg",
    audioFile: "",
    price: 200,
    duration: 3 * 60 + 30, // 3:30
    genre: "Hip Hop",
    releaseDate: new Date(), 
    downloads: 1050,
  },
  {
    id: "track6",
    title: "Coastal Breeze",
    artistId: "artist5",
    artistName: "Ocean Waves",
    coverImage: "/placeholder.svg",
    audioFile: "",
    price: 50,
    duration: 4 * 60 + 10, // 4:10
    genre: "Reggae",
    releaseDate: new Date(),
    downloads: 680,
  },
  {
    id: "track7",
    title: "Urban Pulse",
    artistId: "artist6",
    artistName: "Street Vibes",
    coverImage: "/placeholder.svg",
    audioFile: "",
    price: 75,
    duration: 3 * 60 + 25, // 3:25
    genre: "Hip Hop",
    releaseDate: new Date(),
    downloads: 920,
  },
  {
    id: "track8",
    title: "Sunset Melody",
    artistId: "artist7",
    artistName: "Acoustic Soul",
    coverImage: "/placeholder.svg",
    audioFile: "",
    price: 120,
    duration: 4 * 60 + 5, // 4:05
    genre: "R&B",
    releaseDate: new Date(),
    downloads: 580,
  },
  {
    id: "track9",
    title: "Digital Dreams",
    artistId: "artist8",
    artistName: "Techno Master",
    coverImage: "/placeholder.svg",
    audioFile: "",
    price: 180,
    duration: 5 * 60 + 15, // 5:15
    genre: "Electronic",
    releaseDate: new Date(),
    downloads: 340,
  },
  {
    id: "track10",
    title: "Traditional Echoes",
    artistId: "artist9",
    artistName: "Heritage Sounds",
    coverImage: "/placeholder.svg",
    audioFile: "",
    price: 90,
    duration: 3 * 60 + 50, // 3:50
    genre: "Benga",
    releaseDate: new Date(),
    downloads: 670,
  },
  {
    id: "track11",
    title: "Jazz Fusion",
    artistId: "artist10",
    artistName: "Smooth Operator",
    coverImage: "/placeholder.svg",
    audioFile: "",
    price: 140,
    duration: 4 * 60 + 30, // 4:30
    genre: "Jazz",
    releaseDate: new Date(),
    downloads: 420,
  },
  {
    id: "track12",
    title: "Pop Anthem",
    artistId: "artist11",
    artistName: "Chart Topper",
    coverImage: "/placeholder.svg",
    audioFile: "",
    price: 60,
    duration: 3 * 60 + 12, // 3:12
    genre: "Pop",
    releaseDate: new Date(),
    downloads: 1450,
  },
  {
    id: "track13",
    title: "Rock Revolution",
    artistId: "artist12",
    artistName: "Power Chord",
    coverImage: "/placeholder.svg",
    audioFile: "",
    price: 110,
    duration: 4 * 60 + 45, // 4:45
    genre: "Rock",
    releaseDate: new Date(),
    downloads: 780,
  },
  {
    id: "track14",
    title: "Classical Harmony",
    artistId: "artist13",
    artistName: "Symphony Orchestra",
    coverImage: "/placeholder.svg",
    audioFile: "",
    price: 250,
    duration: 6 * 60 + 20, // 6:20
    genre: "Classical",
    releaseDate: new Date(),
    downloads: 290,
  },
  {
    id: "track15",
    title: "Gospel Glory",
    artistId: "artist14",
    artistName: "Divine Voices",
    coverImage: "/placeholder.svg",
    audioFile: "",
    price: 85,
    duration: 4 * 60 + 15, // 4:15
    genre: "Gospel",
    releaseDate: new Date(),
    downloads: 650,
  },
  {
    id: "track16",
    title: "Afro Fusion",
    artistId: "artist15",
    artistName: "Continental Mix",
    coverImage: "/placeholder.svg",
    audioFile: "",
    price: 130,
    duration: 3 * 60 + 35, // 3:35
    genre: "Afrobeat",
    releaseDate: new Date(),
    downloads: 850,
  },
  {
    id: "track17",
    title: "Street Chronicles",
    artistId: "artist16",
    artistName: "Urban Legend",
    coverImage: "/placeholder.svg",
    audioFile: "",
    price: 95,
    duration: 3 * 60 + 58, // 3:58
    genre: "Gengetone",
    releaseDate: new Date(),
    downloads: 1120,
  },
  {
    id: "track18",
    title: "Island Vibes",
    artistId: "artist17",
    artistName: "Tropical Sound",
    coverImage: "/placeholder.svg",
    audioFile: "",
    price: 70,
    duration: 4 * 60 + 8, // 4:08
    genre: "Reggae",
    releaseDate: new Date(),
    downloads: 730,
  },
  {
    id: "track19",
    title: "Smooth Operator",
    artistId: "artist18",
    artistName: "Velvet Voice",
    coverImage: "/placeholder.svg",
    audioFile: "",
    price: 160,
    duration: 3 * 60 + 42, // 3:42
    genre: "R&B",
    releaseDate: new Date(),
    downloads: 540,
  },
  {
    id: "track20",
    title: "Bass Drop",
    artistId: "artist19",
    artistName: "Electronic Pulse",
    coverImage: "/placeholder.svg",
    audioFile: "",
    price: 170,
    duration: 4 * 60 + 55, // 4:55
    genre: "Electronic",
    releaseDate: new Date(),
    downloads: 380,
  },
];

export const MOCK_ARTIST_STATS = {
  totalSales: 24500,
  totalDownloads: 3150,
  topTracks: [
    {
      trackId: "track1",
      title: "African Spirit",
      downloads: 1240,
      revenue: 62000,
    },
    {
      trackId: "track4",
      title: "City Vibrations",
      downloads: 720,
      revenue: 108000,
    }
  ],
  recentTransactions: [
    {
      id: "tx1",
      trackId: "track1",
      fanId: "fan1",
      artistId: "artist1",
      amount: 50,
      date: new Date(Date.now() - 86400000), // yesterday
    },
    {
      id: "tx2",
      trackId: "track4",
      fanId: "fan2",
      artistId: "artist1",
      amount: 150,
      date: new Date(Date.now() - 172800000), // 2 days ago
    },
    {
      id: "tx3",
      trackId: "track1",
      fanId: "fan3",
      artistId: "artist1",
      amount: 50,
      date: new Date(Date.now() - 259200000), // 3 days ago
    },
  ],
  monthlyRevenue: [
    { month: "Jan", amount: 2400 },
    { month: "Feb", amount: 3600 },
    { month: "Mar", amount: 5200 },
    { month: "Apr", amount: 4800 },
    { month: "May", amount: 7500 },
    { month: "Jun", amount: 10000 },
  ],
};

export const MOCK_USERS = [
  {
    id: "artist1",
    name: "Wanjiru Beats",
    email: "artist@example.com",
    role: "artist" as const,
    profileImage: "/placeholder.svg",
    createdAt: new Date(),
    bio: "Creating soulful Afrobeat since 2018",
    genres: ["Afrobeat", "Electronic"],
    totalSales: 24500,
    totalTracks: 8,
    totalFans: 560,
  },
  {
    id: "fan1",
    name: "Music Lover",
    email: "fan@example.com",
    role: "fan" as const,
    profileImage: "/placeholder.svg",
    createdAt: new Date(),
    purchasedTracks: [],
    favoriteArtists: ["artist1", "artist3"],
  }
];
