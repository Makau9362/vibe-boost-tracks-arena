
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PlaylistCard from "./PlaylistCard";
import CreatePlaylistModal from "./CreatePlaylistModal";
import { mockGetCurrentUser, mockGetUserLibrary, formatTime } from "@/lib/utils";
import { Playlist, Track } from "@/types";
import { Button } from "@/components/ui/button";
import { PlusCircle, Play, Pause } from "lucide-react";

export function LibraryContent() {
  const [library, setLibrary] = useState<{tracks: Track[], playlists: Playlist[]}>({ tracks: [], playlists: [] });
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  useEffect(() => {
    const currentUser = mockGetCurrentUser();
    if (!currentUser || currentUser.role !== "fan") return;
    
    const userLibrary = mockGetUserLibrary(currentUser.id);
    setLibrary(userLibrary);
    setIsLoading(false);
  }, []);

  const handlePlayTrack = (track: Track) => {
    if (currentTrack?.id === track.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentTrack(track);
      setIsPlaying(true);
    }
  };

  const handleCreatePlaylist = (name: string, trackIds: string[]) => {
    // In a real app, we would call an API to create a playlist
    const currentUser = mockGetCurrentUser();
    if (!currentUser) return;
    
    const newPlaylist: Playlist = {
      id: `playlist-${Date.now()}`,
      userId: currentUser.id,
      name,
      trackIds,
      createdAt: new Date()
    };
    
    setLibrary(prev => ({
      ...prev,
      playlists: [...prev.playlists, newPlaylist]
    }));
    
    setIsCreateModalOpen(false);
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-5">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-800 h-32 sm:h-40 w-full rounded-lg mb-3"></div>
            <div className="bg-gray-800 h-3 sm:h-4 w-3/4 rounded mb-2"></div>
            <div className="bg-gray-800 h-2 sm:h-3 w-1/2 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <Tabs defaultValue="tracks" className="mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <TabsList className="bg-gray-900 w-full sm:w-auto">
            <TabsTrigger value="tracks" className="text-xs sm:text-sm">Downloaded Tracks</TabsTrigger>
            <TabsTrigger value="playlists" className="text-xs sm:text-sm">My Playlists</TabsTrigger>
          </TabsList>
          
          <Button 
            onClick={() => setIsCreateModalOpen(true)}
            variant="outline" 
            size="sm"
            className="bg-white hover:bg-gray-300 text-black border-none w-full sm:w-auto"
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Create Playlist
          </Button>
        </div>
        
        <TabsContent value="tracks" className="animate-fade-in">
          {library.tracks.length > 0 ? (
            <div className="space-y-2 sm:space-y-3">
              {library.tracks.map((track, index) => (
                <div 
                  key={track.id} 
                  className="flex items-center p-3 sm:p-4 bg-music-card rounded-lg hover:bg-gray-900 cursor-pointer transition-colors"
                  onClick={() => handlePlayTrack(track)}
                >
                  <div className="flex items-center mr-3 sm:mr-4 w-6 sm:w-8">
                    {currentTrack?.id === track.id ? (
                      <div className="h-6 w-6 sm:h-8 sm:w-8 flex items-center justify-center text-white">
                        {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                      </div>
                    ) : (
                      <div className="text-gray-400 text-sm">{index + 1}</div>
                    )}
                  </div>
                  
                  <div className="flex items-center flex-1 min-w-0">
                    <div className="h-10 w-10 sm:h-12 sm:w-12 rounded overflow-hidden mr-3 flex-shrink-0">
                      <img 
                        src={track.coverImage} 
                        alt={track.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="text-white font-medium text-sm sm:text-base truncate">{track.title}</div>
                      <div className="text-gray-400 text-xs sm:text-sm truncate">
                        <Link to={`/artist/${track.artistId}`} className="hover:underline" onClick={(e) => e.stopPropagation()}>
                          {track.artistName}
                        </Link>
                        <span className="hidden sm:inline"> • {track.genre}</span>
                      </div>
                    </div>
                    
                    <div className="text-gray-400 text-xs sm:text-sm ml-2 flex-shrink-0">
                      {formatTime(track.duration)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-400">You haven't downloaded any tracks yet.</p>
              <Button 
                onClick={() => window.location.href = "/explore"}
                variant="outline"
                className="mt-4 border-gray-700 hover:bg-gray-800"
              >
                Explore Music
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="playlists" className="animate-fade-in">
          {library.playlists.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-5">
              {library.playlists.map((playlist) => (
                <PlaylistCard 
                  key={playlist.id} 
                  playlist={playlist}
                  tracks={library.tracks.filter(track => playlist.trackIds.includes(track.id))}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-400">You haven't created any playlists yet.</p>
              <Button 
                onClick={() => setIsCreateModalOpen(true)}
                variant="outline"
                className="mt-4 border-gray-700 hover:bg-gray-800"
              >
                Create Playlist
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
      
      <CreatePlaylistModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreatePlaylist={handleCreatePlaylist}
        availableTracks={library.tracks}
      />
    </div>
  );
}

export default LibraryContent;
