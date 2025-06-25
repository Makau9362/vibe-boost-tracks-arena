
import { Link } from "react-router-dom";
import { mockGetCurrentUser, mockLogout } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
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
    <header className="bg-background border-b border-border">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold text-foreground">
            FANBAZE
          </Link>
          <nav className="hidden md:flex ml-10 space-x-6">
            {currentUser?.role === "fan" && (
              <>
                <Link to="/explore" className="text-muted-foreground hover:text-foreground">Explore</Link>
                <Link to="/library" className="text-muted-foreground hover:text-foreground">Library</Link>
              </>
            )}
            {currentUser?.role === "artist" && (
              <>
                <Link to="/dashboard" className="text-muted-foreground hover:text-foreground">Dashboard</Link>
                <Link to="/upload" className="text-muted-foreground hover:text-foreground">Upload</Link>
                <Link to="/uploads" className="text-muted-foreground hover:text-foreground">My Uploads</Link>
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
};

export default Navigation;
