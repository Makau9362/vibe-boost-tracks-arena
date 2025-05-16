
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "@/components/layout/Sidebar";
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse-light text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <div className="flex">
        <Sidebar />
        <main className="ml-64 flex-1 container mx-auto px-4 py-6 pb-36">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-1 text-white">My Library</h1>
            <p className="text-gray-400">Your downloaded music and playlists</p>
          </div>
          <LibraryContent />
        </main>
      </div>
    </div>
  );
};

export default Library;
