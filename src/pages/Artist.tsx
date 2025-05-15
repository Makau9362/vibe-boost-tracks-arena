
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navigation from "@/components/layout/Navigation";
import MusicCard from "@/components/fan/MusicCard";
import MusicPlayer from "@/components/layout/MusicPlayer";
import SupportModal from "@/components/fan/SupportModal";
import { mockGetArtistById, mockGetArtistTracks } from "@/lib/utils";
import { Artist as ArtistType, Track } from "@/types";

const Artist = () => {
  const { artistId } = useParams<{ artistId: string }>();
  const [artist, setArtist] = useState<ArtistType | null>(null);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!artistId) return;
    
    const fetchedArtist = mockGetArtistById(artistId);
    if (fetchedArtist) {
      setArtist(fetchedArtist);
      
      const artistTracks = mockGetArtistTracks(artistId);
      setTracks(artistTracks);
    }
    
    setIsLoading(false);
  }, [artistId]);

  const handleTrackSelect = (track: Track) => {
    setSelectedTrack(track);
  };
  
  const handleSupportClick = () => {
    setIsModalOpen(true);
  };
  
  const handleSupportSuccess = () => {
    // In a real app, update user's purchased tracks list
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse-light text-music-purple">Loading...</div>
      </div>
    );
  }

  if (!artist) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Artist Not Found</h1>
            <p className="text-gray-400">The artist you're looking for doesn't exist.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 container mx-auto px-4 py-6 pb-36">
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start mb-12">
          <div className="w-40 h-40 rounded-full overflow-hidden bg-music-hover">
            {artist.profileImage ? (
              <img 
                src={artist.profileImage} 
                alt={artist.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center bg-music-hover">
                <span className="text-4xl font-bold text-gray-500">
                  {artist.name.charAt(0)}
                </span>
              </div>
            )}
          </div>
          
          <div className="text-center md:text-left">
            <div className="mb-4">
              <h4 className="text-sm text-gray-400 mb-1">Artist</h4>
              <h1 className="text-4xl font-bold text-gradient-purple">{artist.name}</h1>
            </div>
            
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <div>
                <h4 className="text-xs text-gray-400">Tracks</h4>
                <p className="text-xl font-semibold">{artist.totalTracks}</p>
              </div>
              <div>
                <h4 className="text-xs text-gray-400">Supporters</h4>
                <p className="text-xl font-semibold">{artist.totalFans}</p>
              </div>
              <div>
                <h4 className="text-xs text-gray-400">Joined</h4>
                <p className="text-xl font-semibold">
                  {new Date(artist.createdAt).toLocaleDateString(undefined, {
                    year: "numeric", 
                    month: "short"
                  })}
                </p>
              </div>
            </div>
            
            {artist.bio && (
              <p className="mt-4 text-gray-300 max-w-xl">{artist.bio}</p>
            )}
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-bold mb-6">Tracks by {artist.name}</h2>
          
          {tracks.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
              {tracks.map((track) => (
                <MusicCard 
                  key={track.id} 
                  track={track} 
                  onClick={() => handleTrackSelect(track)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-400">No tracks available</p>
            </div>
          )}
        </div>
      </main>
      
      {selectedTrack && (
        <>
          <div className="fixed bottom-24 right-6 z-40">
            <button
              onClick={handleSupportClick}
              className="bg-music-purple hover:bg-music-purple/90 text-white rounded-full px-4 py-2 shadow-lg flex items-center space-x-2"
            >
              <span>Support Artist</span>
            </button>
          </div>
          
          <MusicPlayer
            track={selectedTrack}
            onNext={() => {}}
            onPrevious={() => {}}
          />
          
          <SupportModal
            track={selectedTrack}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSuccess={handleSupportSuccess}
          />
        </>
      )}
    </div>
  );
};

export default Artist;
