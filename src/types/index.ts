
export type UserRole = 'fan' | 'artist';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  profileImage?: string;
  createdAt: Date;
}

export interface Artist extends User {
  role: 'artist';
  bio?: string;
  genres?: string[];
  totalSales: number;
  totalTracks: number;
  totalFans: number;
}

export interface Fan extends User {
  role: 'fan';
  purchasedTracks: Track[];
  favoriteArtists: string[];
}

export interface Track {
  id: string;
  title: string;
  artistId: string;
  artistName: string;
  coverImage: string;
  audioFile: string;
  price: number;
  duration: number;
  genre: string;
  releaseDate: Date;
  downloads: number;
}

export interface Playlist {
  id: string;
  userId: string;
  name: string;
  trackIds: string[];
  createdAt: Date;
}

export interface SupportTier {
  value: number;
  label: string;
}

export interface PurchaseTransaction {
  id: string;
  trackId: string;
  fanId: string;
  artistId: string;
  amount: number;
  date: Date;
}

export interface ArtistStats {
  totalSales: number;
  totalDownloads: number;
  topTracks: {
    trackId: string;
    title: string;
    downloads: number;
    revenue: number;
  }[];
  recentTransactions: PurchaseTransaction[];
  monthlyRevenue: {
    month: string;
    amount: number;
  }[];
}
