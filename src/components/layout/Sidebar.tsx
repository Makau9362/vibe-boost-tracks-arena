
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { mockGetCurrentUser, mockLogout } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Home, Music, Library, Upload, ListMusic, LayoutDashboard } from "lucide-react";

export function Sidebar() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const user = mockGetCurrentUser();
    setCurrentUser(user);
  }, []);

  const handleLogout = () => {
    mockLogout();
    navigate("/");
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className={`h-screen bg-background border-r border-border transition-all ${isCollapsed ? 'w-20' : 'w-64'} fixed left-0 top-0 z-40`}>
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <Link to="/" className="text-2xl font-bold text-foreground">
                FANBAZE
              </Link>
            )}
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="text-foreground hover:bg-accent"
            >
              {isCollapsed ? '→' : '←'}
            </Button>
          </div>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4">
          {currentUser?.role === "fan" && (
            <div className="space-y-1 px-3">
              <Link 
                to="/explore" 
                className={`flex items-center space-x-3 px-3 py-2 rounded-md ${isActive('/explore') ? 'bg-accent text-foreground' : 'text-muted-foreground hover:bg-accent hover:text-foreground'}`}
              >
                <Home size={20} />
                {!isCollapsed && <span>Explore</span>}
              </Link>
              <Link 
                to="/library" 
                className={`flex items-center space-x-3 px-3 py-2 rounded-md ${isActive('/library') ? 'bg-accent text-foreground' : 'text-muted-foreground hover:bg-accent hover:text-foreground'}`}
              >
                <Library size={20} />
                {!isCollapsed && <span>Library</span>}
              </Link>
            </div>
          )}
          
          {currentUser?.role === "artist" && (
            <div className="space-y-1 px-3">
              <Link 
                to="/dashboard" 
                className={`flex items-center space-x-3 px-3 py-2 rounded-md ${isActive('/dashboard') ? 'bg-accent text-foreground' : 'text-muted-foreground hover:bg-accent hover:text-foreground'}`}
              >
                <LayoutDashboard size={20} />
                {!isCollapsed && <span>Dashboard</span>}
              </Link>
              <Link 
                to="/upload" 
                className={`flex items-center space-x-3 px-3 py-2 rounded-md ${isActive('/upload') ? 'bg-accent text-foreground' : 'text-muted-foreground hover:bg-accent hover:text-foreground'}`}
              >
                <Upload size={20} />
                {!isCollapsed && <span>Upload</span>}
              </Link>
              <Link 
                to="/uploads" 
                className={`flex items-center space-x-3 px-3 py-2 rounded-md ${isActive('/uploads') ? 'bg-accent text-foreground' : 'text-muted-foreground hover:bg-accent hover:text-foreground'}`}
              >
                <ListMusic size={20} />
                {!isCollapsed && <span>My Uploads</span>}
              </Link>
            </div>
          )}
        </nav>
        
        {currentUser && (
          <div className="p-4 border-t border-border">
            <div className="flex items-center justify-between">
              {!isCollapsed && (
                <span className="text-sm text-muted-foreground">{currentUser.name}</span>
              )}
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleLogout}
                className="text-foreground hover:bg-accent"
              >
                {isCollapsed ? 'Out' : 'Logout'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
