import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Profile = Database['public']['Tables']['profiles']['Row'];
type Track = Database['public']['Tables']['tracks']['Row'];
type Playlist = Database['public']['Tables']['playlists']['Row'];
type PurchaseTransaction = Database['public']['Tables']['purchase_transactions']['Row'];

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: 'fan' | 'artist';
  profileImage?: string;
  bio?: string;
  genres?: string[];
  totalSales?: number;
  totalTracks?: number;
  totalFans?: number;
  favoriteArtists?: string[];
}

// Auth functions
export async function signUp(email: string, password: string, userData: { name: string; role: 'fan' | 'artist' }) {
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name: userData.name,
        role: userData.role,
      }
    }
  });

  if (authError) throw authError;

  if (authData.user) {
    // Create profile
    const { error: profileError } = await supabase
      .from('profiles')
      .insert({
        user_id: authData.user.id,
        name: userData.name,
        email: email,
        role: userData.role,
      });

    if (profileError) throw profileError;
  }

  return authData;
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return null;

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', user.id)
    .single();

  if (!profile) return null;

  return {
    id: user.id,
    name: profile.name,
    email: profile.email,
    role: profile.role as 'fan' | 'artist',
    profileImage: profile.profile_image || undefined,
    bio: profile.bio || undefined,
    genres: profile.genres || undefined,
    totalSales: profile.total_sales || 0,
    totalTracks: profile.total_tracks || 0,
    totalFans: profile.total_fans || 0,
    favoriteArtists: profile.favorite_artists || undefined,
  };
}

// Track functions
export async function getTracks() {
  const { data, error } = await supabase
    .from('tracks')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function getArtistTracks(artistId: string) {
  const { data, error } = await supabase
    .from('tracks')
    .select('*')
    .eq('artist_id', artistId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function uploadTrack(trackData: {
  title: string;
  coverImage?: string;
  audioFile?: string;
  price: number;
  duration: number;
  genre?: string;
}) {
  const user = await getCurrentUser();
  if (!user || user.role !== 'artist') {
    throw new Error('Only artists can upload tracks');
  }

  const { data, error } = await supabase
    .from('tracks')
    .insert({
      title: trackData.title,
      artist_id: user.id,
      artist_name: user.name,
      cover_image: trackData.coverImage,
      audio_file: trackData.audioFile,
      price: trackData.price,
      duration: trackData.duration,
      genre: trackData.genre,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteTrack(trackId: string) {
  const { error } = await supabase
    .from('tracks')
    .delete()
    .eq('id', trackId);

  if (error) throw error;
}

// Purchase functions
export async function purchaseTrack(trackId: string, amount: number, artistId: string) {
  const user = await getCurrentUser();
  if (!user || user.role !== 'fan') {
    throw new Error('Only fans can purchase tracks');
  }

  const { data, error } = await supabase
    .from('purchase_transactions')
    .insert({
      track_id: trackId,
      fan_id: user.id,
      artist_id: artistId,
      amount: amount,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getUserPurchases(userId: string) {
  const { data, error } = await supabase
    .from('purchase_transactions')
    .select(`
      *,
      tracks:track_id (*)
    `)
    .eq('fan_id', userId);

  if (error) throw error;
  return data || [];
}

// Playlist functions
export async function getUserPlaylists(userId: string) {
  const { data, error } = await supabase
    .from('playlists')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function createPlaylist(name: string, trackIds: string[] = []) {
  const user = await getCurrentUser();
  if (!user) throw new Error('User must be authenticated');

  const { data, error } = await supabase
    .from('playlists')
    .insert({
      user_id: user.id,
      name,
      track_ids: trackIds,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Artist stats functions
export async function getArtistStats(artistId: string) {
  // Get total sales and downloads
  const { data: salesData } = await supabase
    .from('purchase_transactions')
    .select('amount')
    .eq('artist_id', artistId);

  const totalSales = salesData?.reduce((sum, sale) => sum + Number(sale.amount), 0) || 0;

  // Get tracks and downloads
  const { data: tracks } = await supabase
    .from('tracks')
    .select('*')
    .eq('artist_id', artistId);

  const totalDownloads = tracks?.reduce((sum, track) => sum + (track.downloads || 0), 0) || 0;

  // Get recent transactions
  const { data: recentTransactions } = await supabase
    .from('purchase_transactions')
    .select('*')
    .eq('artist_id', artistId)
    .order('created_at', { ascending: false })
    .limit(10);

  return {
    totalSales,
    totalDownloads,
    topTracks: tracks?.map(track => ({
      trackId: track.id,
      title: track.title,
      downloads: track.downloads || 0,
      revenue: 0, // Would need to calculate from purchases
    })) || [],
    recentTransactions: recentTransactions || [],
    monthlyRevenue: [], // Would need to implement monthly aggregation
  };
}

export async function getArtistById(artistId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', artistId)
    .eq('role', 'artist')
    .single();

  if (error) throw error;
  return data;
}