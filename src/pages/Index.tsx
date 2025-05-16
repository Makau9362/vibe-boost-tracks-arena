
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
    <div className="min-h-screen bg-black">
      <div className="absolute inset-0 z-0 overflow-hidden bg-black">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black to-black z-20"></div>
        <img 
          src="https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
          alt="Music production studio" 
          className="w-full h-full object-cover opacity-40"
        />
      </div>
      
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="text-center lg:text-left text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              <span className="text-white">FANBAZE</span>
            </h1>
            <p className="mt-4 text-xl text-gray-300">
              Connect directly with your favorite artists. 
              <span className="block mt-2">
                Support creativity. Download music.
              </span>
            </p>
            
            <div className="mt-8 grid grid-cols-2 gap-4 max-w-md mx-auto lg:mx-0">
              <div className="bg-gray-900 bg-opacity-60 border border-gray-800 rounded-lg p-4 text-center">
                <h3 className="font-medium text-white">For Artists</h3>
                <p className="mt-2 text-sm text-gray-400">Share your music and get direct support from fans</p>
              </div>
              <div className="bg-gray-900 bg-opacity-60 border border-gray-800 rounded-lg p-4 text-center">
                <h3 className="font-medium text-white">For Fans</h3>
                <p className="mt-2 text-sm text-gray-400">Support artists you love and download their music</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-900 bg-opacity-60 border border-gray-800 rounded-lg py-8 px-6 lg:p-10">
            <AuthForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
