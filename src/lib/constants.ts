
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
