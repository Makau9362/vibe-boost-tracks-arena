
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/layout/Navigation";
import ArtistDashboard from "@/components/artist/ArtistDashboard";
import { getCurrentUser } from "@/lib/supabase";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await getCurrentUser();
        
        if (!currentUser) {
          navigate("/");
          return;
        }
        
        if (currentUser.role !== "artist") {
          navigate("/explore");
          return;
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error("Auth check failed:", error);
        navigate("/");
      }
    };

    checkAuth();
  }, [navigate]);

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
      <main className="flex-1 pb-24">
        <ArtistDashboard />
      </main>
    </div>
  );
};

export default Dashboard;
