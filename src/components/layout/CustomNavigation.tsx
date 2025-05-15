
import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { mockGetCurrentUser, mockLogout } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

// This is just a demonstration component showing how Navigation could be implemented
// with the ThemeToggle. The actual integration would happen in the Navigation.tsx file.
export function CustomNavigation() {
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
    <header className="bg-music-card border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold text-gradient-purple">
            MelodySphere
          </Link>
          <nav className="hidden md:flex ml-10 space-x-6">
            {currentUser?.role === "fan" && (
              <>
                <Link to="/explore" className="text-foreground hover:text-music-purple">Explore</Link>
                <Link to="/library" className="text-foreground hover:text-music-purple">Library</Link>
              </>
            )}
            {currentUser?.role === "artist" && (
              <>
                <Link to="/dashboard" className="text-foreground hover:text-music-purple">Dashboard</Link>
                <Link to="/upload" className="text-foreground hover:text-music-purple">Upload</Link>
                <Link to="/uploads" className="text-foreground hover:text-music-purple">My Uploads</Link>
              </>
            )}
          </nav>
        </div>
        
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          
          {currentUser ? (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">{currentUser.name}</span>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleLogout}
                className="text-foreground hover:bg-accent"
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
}

export default CustomNavigation;
