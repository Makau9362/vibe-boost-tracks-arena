
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { MOCK_USERS, MOCK_TRACKS, MOCK_ARTIST_STATS } from "./constants";
import { Artist, Fan, Track, UserRole, Playlist } from "../types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export function formatCurrency(amount: number): string {
  return `${amount} KSh`;
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date);
}

// Mock auth functions (to be replaced with actual auth implementation)
export function mockLogin(email: string, password: string, role: UserRole): { user: Artist | Fan, success: boolean } {
  const user = MOCK_USERS.find(u => u.email === email && u.role === role);
  
  if (user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    return { user: user as Artist | Fan, success: true };
  }
  
  return { user: null as unknown as Artist | Fan, success: false };
}

export function mockLogout(): void {
  localStorage.removeItem('currentUser');
}

export function mockGetCurrentUser(): Artist | Fan | null {
  const userStr = localStorage.getItem('currentUser');
  if (!userStr) return null;
  
  return JSON.parse(userStr) as Artist | Fan;
}

export function mockGetTracks(): Track[] {
  return MOCK_TRACKS;
}

export function mockGetArtistStats(artistId: string) {
  if (artistId === 'artist1') {
    return MOCK_ARTIST_STATS;
  }
  return null;
}

export function mockPurchaseTrack(trackId: string, amount: number): { success: boolean } {
  const user = mockGetCurrentUser();
  if (!user || user.role !== 'fan') return { success: false };
  
  // In a real app, we'd make API call to handle payment and update database
  return { success: true };
}

export function mockUploadTrack(track: Partial<Track>): { success: boolean, trackId: string } {
  const user = mockGetCurrentUser();
  if (!user || user.role !== 'artist') return { success: false, trackId: '' };
  
  // In a real app, we'd make API call to upload track
  return { success: true, trackId: `track${MOCK_TRACKS.length + 1}` };
}

// New mock functions for additional features
export function mockGetUserLibrary(userId: string): { tracks: Track[], playlists: Playlist[] } {
  if (!userId) return { tracks: [], playlists: [] };
  
  // In a real app, we'd fetch from database
  const purchasedTracks = MOCK_TRACKS.slice(0, 3); // Mock first 3 tracks as purchased
  
  const playlists: Playlist[] = [
    {
      id: 'playlist1',
      userId: userId,
      name: 'My Favorites',
      trackIds: [MOCK_TRACKS[0].id, MOCK_TRACKS[2].id],
      createdAt: new Date('2023-01-15')
    }
  ];
  
  return { tracks: purchasedTracks, playlists };
}

export function mockGetArtistById(artistId: string): Artist | null {
  const artist = MOCK_USERS.find(u => u.id === artistId && u.role === 'artist');
  return artist as Artist || null;
}

export function mockGetArtistTracks(artistId: string): Track[] {
  return MOCK_TRACKS.filter(track => track.artistId === artistId);
}

export function mockDeleteTrack(trackId: string): { success: boolean } {
  const user = mockGetCurrentUser();
  if (!user || user.role !== 'artist') return { success: false };
  
  // In a real app, we'd make API call to delete track
  return { success: true };
}
