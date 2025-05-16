
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
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-800 h-40 w-full rounded-lg mb-3"></div>
            <div className="bg-gray-800 h-4 w-3/4 rounded mb-2"></div>
            <div className="bg-gray-800 h-3 w-1/2 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <Tabs defaultValue="tracks" className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <TabsList className="bg-gray-900">
            <TabsTrigger value="tracks">Downloaded Tracks</TabsTrigger>
            <TabsTrigger value="playlists">My Playlists</TabsTrigger>
          </TabsList>
          
          <Button 
            onClick={() => setIsCreateModalOpen(true)}
            variant="outline" 
            size="sm"
            className="bg-white hover:bg-gray-300 text-black border-none"
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Create Playlist
          </Button>
        </div>
        
        <TabsContent value="tracks" className="animate-fade-in">
          {library.tracks.length > 0 ? (
            <div className="bg-black rounded-md border border-gray-800">
              <div className="grid grid-cols-12 p-3 border-b border-gray-800 font-semibold text-gray-400 text-sm">
                <div className="col-span-1">#</div>
                <div className="col-span-5">Title</div>
                <div className="col-span-3">Artist</div>
                <div className="col-span-2">Genre</div>
                <div className="col-span-1 text-right">Duration</div>
              </div>
              
              {library.tracks.map((track, index) => (
                <div 
                  key={track.id} 
                  className="grid grid-cols-12 p-3 border-b border-gray-800 hover:bg-gray-900 cursor-pointer items-center"
                  onClick={() => handlePlayTrack(track)}
                >
                  <div className="col-span-1 flex items-center">
                    {currentTrack?.id === track.id ? (
                      <div className="h-8 w-8 flex items-center justify-center text-white">
                        {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                      </div>
                    ) : (
                      <div className="text-gray-400">{index + 1}</div>
                    )}
                  </div>
                  <div className="col-span-5 flex items-center space-x-3">
                    <div className="h-10 w-10 rounded overflow-hidden">
                      <img 
                        src={track.coverImage} 
                        alt={track.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="text-white font-medium">{track.title}</div>
                  </div>
                  <div className="col-span-3 text-gray-300">
                    <Link to={`/artist/${track.artistId}`} className="hover:underline" onClick={(e) => e.stopPropagation()}>
                      {track.artistName}
                    </Link>
                  </div>
                  <div className="col-span-2 text-gray-400">{track.genre}</div>
                  <div className="col-span-1 text-right text-gray-400">{formatTime(track.duration)}</div>
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
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
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
