
import { Link } from "react-router-dom";
import { mockGetCurrentUser, mockLogout } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Navigation = () => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = mockGetCurrentUser();
    setCurrentUser(user);
  }, []);

  const handleLogout = () => {
    mockLogout();
    navigate("/");
  };

  return (
    <header className="bg-black border-b border-gray-800">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold text-white">
            FANBAZE
          </Link>
          <nav className="hidden md:flex ml-10 space-x-6">
            {currentUser?.role === "fan" && (
              <>
                <Link to="/explore" className="text-gray-300 hover:text-white">Explore</Link>
                <Link to="/library" className="text-gray-300 hover:text-white">Library</Link>
              </>
            )}
            {currentUser?.role === "artist" && (
              <>
                <Link to="/dashboard" className="text-gray-300 hover:text-white">Dashboard</Link>
                <Link to="/upload" className="text-gray-300 hover:text-white">Upload</Link>
                <Link to="/uploads" className="text-gray-300 hover:text-white">My Uploads</Link>
              </>
            )}
          </nav>
        </div>
        
        <div className="flex items-center space-x-4">
          {currentUser ? (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-400">{currentUser.name}</span>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleLogout}
                className="text-white hover:bg-gray-800"
              >
                Logout
              </Button>
            </div>
          ) : (
            <Link to="/">
              <Button>Login</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navigation;
