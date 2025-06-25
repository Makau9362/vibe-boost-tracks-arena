
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "@/components/layout/Sidebar";
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
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <div className="flex">
        <Sidebar />
        <main className="ml-64 flex-1 container mx-auto px-4 py-6 pb-36">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-1 text-foreground">My Uploads</h1>
            <p className="text-muted-foreground">Manage your uploaded tracks</p>
          </div>
          <UploadsManager />
        </main>
      </div>
    </div>
  );
};

export default Uploads;
