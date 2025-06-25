
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/layout/Navigation";
import { mockGetCurrentUser } from "@/lib/utils";
import LibraryContent from "@/components/fan/LibraryContent";

const Library = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = mockGetCurrentUser();
    
    if (!currentUser) {
      navigate("/");
      return;
    }
    
    if (currentUser.role !== "fan") {
      navigate("/explore");
      return;
    }
    
    setIsLoading(false);
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-6 pb-36">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-1 text-foreground">My Library</h1>
          <p className="text-muted-foreground">Your downloaded music and playlists</p>
        </div>
        <LibraryContent />
      </main>
    </div>
  );
};

export default Library;
