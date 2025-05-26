
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
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

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
      
      <main className="flex-1 container mx-auto px-2 sm:px-4 py-4 sm:py-6 pb-48">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-1 text-gradient-purple">Explore</h1>
          <p className="text-sm sm:text-base text-gray-400">Discover amazing music and support your favorite artists</p>
        </div>
        
        {/* Search Bar */}
        <div className="relative mb-6 sm:mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search for songs or artists..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-music-card border-gray-800 text-white placeholder:text-gray-400"
          />
        </div>
        
        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="bg-music-card mb-6 w-full overflow-x-auto">
            <TabsTrigger value="all" className="text-xs sm:text-sm">All Genres</TabsTrigger>
            {MOCK_GENRES.slice(0, 5).map((genre) => (
              <TabsTrigger 
                key={genre} 
                value={genre} 
                className="hidden sm:flex text-xs sm:text-sm whitespace-nowrap"
              >
                {genre}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value="all" className="animate-fade-in">
            <MusicGrid onTrackSelect={handleTrackSelect} searchQuery={searchQuery} />
          </TabsContent>
          
          {MOCK_GENRES.slice(0, 5).map((genre) => (
            <TabsContent key={genre} value={genre} className="animate-fade-in">
              <MusicGrid onTrackSelect={handleTrackSelect} searchQuery={searchQuery} />
            </TabsContent>
          ))}
        </Tabs>
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
