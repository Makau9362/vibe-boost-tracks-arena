
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/layout/Navigation";
import UploadsManager from "@/components/artist/UploadsManager";
import { mockGetCurrentUser } from "@/lib/utils";

const Uploads = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = mockGetCurrentUser();
    
    if (!currentUser) {
      navigate("/");
      return;
    }
    
    if (currentUser.role !== "artist") {
      navigate("/explore");
      return;
    }
    
    setIsLoading(false);
  }, [navigate]);

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
          <h1 className="text-3xl font-bold mb-1 text-gradient-purple">My Uploads</h1>
          <p className="text-gray-400">Manage your uploaded tracks</p>
        </div>
        <UploadsManager />
      </main>
    </div>
  );
};

export default Uploads;
