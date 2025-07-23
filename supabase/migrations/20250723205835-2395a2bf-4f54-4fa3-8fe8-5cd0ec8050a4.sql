-- Create enum for user roles
CREATE TYPE public.user_role AS ENUM ('fan', 'artist');

-- Create profiles table for user information
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  role user_role NOT NULL DEFAULT 'fan',
  profile_image TEXT,
  bio TEXT,
  genres TEXT[],
  total_sales DECIMAL(10,2) DEFAULT 0,
  total_tracks INTEGER DEFAULT 0,
  total_fans INTEGER DEFAULT 0,
  favorite_artists TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create tracks table
CREATE TABLE public.tracks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  artist_id UUID REFERENCES public.profiles(user_id) ON DELETE CASCADE NOT NULL,
  artist_name TEXT NOT NULL,
  cover_image TEXT,
  audio_file TEXT,
  price DECIMAL(10,2) NOT NULL DEFAULT 0,
  duration INTEGER NOT NULL DEFAULT 0,
  genre TEXT,
  release_date TIMESTAMP WITH TIME ZONE DEFAULT now(),
  downloads INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create playlists table
CREATE TABLE public.playlists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  track_ids UUID[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create purchase transactions table
CREATE TABLE public.purchase_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  track_id UUID REFERENCES public.tracks(id) ON DELETE CASCADE NOT NULL,
  fan_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  artist_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tracks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.playlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.purchase_transactions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can create their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);

-- Create RLS policies for tracks
CREATE POLICY "Anyone can view tracks" ON public.tracks FOR SELECT USING (true);
CREATE POLICY "Artists can create tracks" ON public.tracks FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND role = 'artist')
);
CREATE POLICY "Artists can update their own tracks" ON public.tracks FOR UPDATE USING (artist_id = auth.uid());
CREATE POLICY "Artists can delete their own tracks" ON public.tracks FOR DELETE USING (artist_id = auth.uid());

-- Create RLS policies for playlists
CREATE POLICY "Users can view their own playlists" ON public.playlists FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own playlists" ON public.playlists FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own playlists" ON public.playlists FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own playlists" ON public.playlists FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for purchase transactions
CREATE POLICY "Users can view their own purchases" ON public.purchase_transactions FOR SELECT USING (auth.uid() = fan_id);
CREATE POLICY "Artists can view their sales" ON public.purchase_transactions FOR SELECT USING (auth.uid() = artist_id);
CREATE POLICY "Fans can create purchases" ON public.purchase_transactions FOR INSERT WITH CHECK (auth.uid() = fan_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_tracks_updated_at BEFORE UPDATE ON public.tracks FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_playlists_updated_at BEFORE UPDATE ON public.playlists FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert some sample data
INSERT INTO public.profiles (user_id, name, email, role, bio, genres, total_sales, total_tracks, total_fans) VALUES
  ('550e8400-e29b-41d4-a716-446655440000', 'Sauti Sol', 'sautisol@example.com', 'artist', 'Kenyan Afro-pop band bringing the soul of Africa to the world.', ARRAY['Afro-pop', 'R&B', 'World'], 125000.00, 15, 45000),
  ('550e8400-e29b-41d4-a716-446655440001', 'Nyashinski', 'nyashinski@example.com', 'artist', 'Kenyan rapper and songwriter known for conscious lyrics.', ARRAY['Hip-Hop', 'Rap'], 89000.00, 12, 32000),
  ('550e8400-e29b-41d4-a716-446655440002', 'Nadia Mukami', 'nadia@example.com', 'artist', 'Kenyan singer and songwriter making waves in the music industry.', ARRAY['Afro-pop', 'R&B'], 67000.00, 8, 28000);

INSERT INTO public.tracks (title, artist_id, artist_name, cover_image, price, duration, genre, downloads) VALUES
  ('Midnight Train', '550e8400-e29b-41d4-a716-446655440000', 'Sauti Sol', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop&crop=center', 250.00, 245, 'Afro-pop', 12000),
  ('Kuliko Jana', '550e8400-e29b-41d4-a716-446655440000', 'Sauti Sol', 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop&crop=center', 200.00, 198, 'Afro-pop', 15000),
  ('Now You Know', '550e8400-e29b-41d4-a716-446655440001', 'Nyashinski', 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=300&h=300&fit=crop&crop=center', 300.00, 267, 'Hip-Hop', 8500),
  ('Malaika', '550e8400-e29b-41d4-a716-446655440001', 'Nyashinski', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop&crop=center', 250.00, 234, 'Hip-Hop', 9200),
  ('Maombi', '550e8400-e29b-41d4-a716-446655440002', 'Nadia Mukami', 'https://images.unsplash.com/photo-1471478331149-c72f17e33c73?w=300&h=300&fit=crop&crop=center', 200.00, 189, 'Afro-pop', 6800),
  ('Radio Love', '550e8400-e29b-41d4-a716-446655440002', 'Nadia Mukami', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop&crop=center', 250.00, 201, 'R&B', 7500);