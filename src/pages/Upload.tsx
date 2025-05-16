
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "@/components/layout/Sidebar";
import UploadForm from "@/components/artist/UploadForm";
import { mockGetCurrentUser } from "@/lib/utils";

const Upload = () => {
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
        <div className="animate-pulse-light text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <div className="flex">
        <Sidebar />
        <main className="ml-64 flex-1">
          <UploadForm />
        </main>
      </div>
    </div>
  );
};

export default Upload;
