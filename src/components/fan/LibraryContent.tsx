
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MusicCard from "./MusicCard";
import PlaylistCard from "./PlaylistCard";
import CreatePlaylistModal from "./CreatePlaylistModal";
import { mockGetCurrentUser, mockGetUserLibrary } from "@/lib/utils";
import { Playlist, Track } from "@/types";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export function LibraryContent() {
  const [library, setLibrary] = useState<{tracks: Track[], playlists: Playlist[]}>({ tracks: [], playlists: [] });
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const currentUser = mockGetCurrentUser();
    if (!currentUser || currentUser.role !== "fan") return;
    
    const userLibrary = mockGetUserLibrary(currentUser.id);
    setLibrary(userLibrary);
    setIsLoading(false);
  }, []);

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
            <div className="bg-music-hover h-40 w-full rounded-lg mb-3"></div>
            <div className="bg-music-hover h-4 w-3/4 rounded mb-2"></div>
            <div className="bg-music-hover h-3 w-1/2 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <Tabs defaultValue="tracks" className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <TabsList className="bg-music-card">
            <TabsTrigger value="tracks">Downloaded Tracks</TabsTrigger>
            <TabsTrigger value="playlists">My Playlists</TabsTrigger>
          </TabsList>
          
          <Button 
            onClick={() => setIsCreateModalOpen(true)}
            variant="outline" 
            size="sm"
            className="bg-music-purple hover:bg-music-purple/90 text-white border-none"
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Create Playlist
          </Button>
        </div>
        
        <TabsContent value="tracks" className="animate-fade-in">
          {library.tracks.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
              {library.tracks.map((track) => (
                <MusicCard 
                  key={track.id} 
                  track={track} 
                />
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
