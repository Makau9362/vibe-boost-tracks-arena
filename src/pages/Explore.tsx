
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/layout/Navigation";
import MusicGrid from "@/components/fan/MusicGrid";
import MusicPlayer from "@/components/layout/MusicPlayer";
import SupportModal from "@/components/fan/SupportModal";
import { MOCK_GENRES } from "@/lib/constants";
import { Track } from "@/types";
import { mockGetCurrentUser } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Explore = () => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const user = mockGetCurrentUser();
    
    if (!user) {
      navigate("/");
      return;
    }
    
    setCurrentUser(user);
    setIsLoading(false);
  }, [navigate]);

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

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 container mx-auto px-4 py-6 pb-36">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-1 text-gradient-purple">Explore</h1>
          <p className="text-gray-400">Discover amazing music and support your favorite artists</p>
        </div>
        
        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="bg-music-card mb-6">
            <TabsTrigger value="all">All Genres</TabsTrigger>
            {MOCK_GENRES.slice(0, 5).map((genre) => (
              <TabsTrigger key={genre} value={genre} className="hidden md:flex">
                {genre}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value="all" className="animate-fade-in">
            <MusicGrid onTrackSelect={handleTrackSelect} />
          </TabsContent>
          
          {MOCK_GENRES.slice(0, 5).map((genre) => (
            <TabsContent key={genre} value={genre} className="animate-fade-in">
              <MusicGrid onTrackSelect={handleTrackSelect} />
            </TabsContent>
          ))}
        </Tabs>
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

export default Explore;
