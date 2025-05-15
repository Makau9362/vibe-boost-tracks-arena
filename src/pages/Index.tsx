
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "@/components/auth/AuthForm";
import { mockGetCurrentUser } from "@/lib/utils";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = mockGetCurrentUser();
    
    if (currentUser) {
      setIsLoggedIn(true);
      
      // Redirect based on user role
      if (currentUser.role === "artist") {
        navigate("/dashboard");
      } else {
        navigate("/explore");
      }
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-music-dark to-black px-4">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        <div className="text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            <span className="text-gradient-purple">MelodySphere</span>
          </h1>
          <p className="mt-4 text-xl text-gray-300">
            Connect directly with your favorite artists. 
            <span className="block mt-2">
              Support creativity. Download music.
            </span>
          </p>
          
          <div className="mt-8 grid grid-cols-2 gap-4 max-w-md mx-auto lg:mx-0">
            <div className="glass p-4 text-center">
              <h3 className="font-medium text-music-purple">For Artists</h3>
              <p className="mt-2 text-sm text-gray-400">Share your music and get direct support from fans</p>
            </div>
            <div className="glass p-4 text-center">
              <h3 className="font-medium text-music-purple">For Fans</h3>
              <p className="mt-2 text-sm text-gray-400">Support artists you love and download their music</p>
            </div>
          </div>
          
          <div className="mt-6 text-sm text-gray-500">
            <p>Ready to get started? Sign in to continue.</p>
          </div>
        </div>
        
        <div className="glass py-8 px-6 lg:p-10 flex items-center justify-center">
          <AuthForm />
        </div>
      </div>
    </div>
  );
};

export default Index;
