
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
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      
      <main className="flex-1 container mx-auto px-2 sm:px-4 py-4 sm:py-6 pb-48">
        <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold mb-1 text-foreground">Explore</h1>
            <p className="text-sm sm:text-base text-muted-foreground">Discover amazing music and support your favorite artists</p>
          </div>
          
          {/* Search Bar */}
          <div className="relative sm:w-64 md:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-background border-border text-foreground placeholder:text-muted-foreground text-sm rounded-none"
            />
          </div>
        </div>
        
        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="bg-foreground mb-6 w-full overflow-x-auto rounded-none">
            <TabsTrigger value="all" className="text-xs sm:text-sm text-background data-[state=active]:bg-background data-[state=active]:text-foreground">All Genres</TabsTrigger>
            {MOCK_GENRES.slice(0, 5).map((genre) => (
              <TabsTrigger 
                key={genre} 
                value={genre} 
                className="hidden sm:flex text-xs sm:text-sm whitespace-nowrap text-background data-[state=active]:bg-background data-[state=active]:text-foreground"
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
