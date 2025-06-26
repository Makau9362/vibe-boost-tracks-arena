
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/layout/Navigation";
import MusicGrid from "@/components/fan/MusicGrid";
import MusicPlayer from "@/components/layout/MusicPlayer";
import SupportModal from "@/components/fan/SupportModal";
import { Track } from "@/types";
import { mockGetCurrentUser } from "@/lib/utils";

const Explore = () => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
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
    setIsModalOpen(true);
  };
  
  const handleSupportClick = () => {
    setIsModalOpen(true);
  };
  
  const handleSupportSuccess = () => {
    // In a real app, update user's purchased tracks list
    setIsModalOpen(false);
  };

  // Function to receive search query from Navigation
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation onSearchChange={handleSearchChange} />
      
      <main className="flex-1 container mx-auto px-2 sm:px-4 py-4 sm:py-6 pb-48">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold mb-1 text-foreground" style={{ fontFamily: 'Arial Black, Arial, sans-serif' }}>Explore</h1>
        </div>
        
        <MusicGrid onTrackSelect={handleTrackSelect} searchQuery={searchQuery} />
      </main>
      
      {selectedTrack && (
        <>
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
