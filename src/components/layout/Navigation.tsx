
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Search, Menu, Music, User } from "lucide-react";
import { mockGetCurrentUser, mockLogout } from "@/lib/utils";
import { Artist, Fan } from "@/types";
import { toast } from "sonner";

export function Navigation() {
  const [user, setUser] = useState<Artist | Fan | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = mockGetCurrentUser();
    setUser(currentUser);
  }, [location.pathname]);

  const handleLogout = () => {
    mockLogout();
    setUser(null);
    toast.success("Logged out successfully");
    navigate("/");
  };

  const userInitial = user?.name?.charAt(0) || "U";
  
  const isLandingPage = location.pathname === "/";
  const isLoggedIn = Boolean(user);
  const isArtist = user?.role === "artist";

  return (
    <nav className="bg-music-dark/90 backdrop-blur-md sticky top-0 z-50 border-b border-gray-800">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <Link to="/" className="flex items-center space-x-2">
            <Music className="h-8 w-8 text-music-purple" />
            <span className="text-xl font-bold text-gradient-purple">MelodySphere</span>
          </Link>
          
          {isLoggedIn && !isLandingPage && (
            <div className="hidden md:flex items-center space-x-6">
              {isArtist ? (
                <>
                  <Link to="/dashboard" className={`text-sm hover:text-white transition-colors ${location.pathname === '/dashboard' ? 'text-white' : 'text-gray-400'}`}>
                    Dashboard
                  </Link>
                  <Link to="/uploads" className={`text-sm hover:text-white transition-colors ${location.pathname === '/uploads' ? 'text-white' : 'text-gray-400'}`}>
                    My Uploads
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/explore" className={`text-sm hover:text-white transition-colors ${location.pathname === '/explore' ? 'text-white' : 'text-gray-400'}`}>
                    Explore
                  </Link>
                  <Link to="/library" className={`text-sm hover:text-white transition-colors ${location.pathname === '/library' ? 'text-white' : 'text-gray-400'}`}>
                    My Library
                  </Link>
                </>
              )}
            </div>
          )}
        </div>

        {isLoggedIn && !isLandingPage && (
          <div className="hidden md:flex flex-1 max-w-md mx-6">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search for artists or tracks..." 
                className="w-full pl-10 h-9 rounded-full bg-music-card border border-gray-700 focus:outline-none focus:border-music-purple text-sm"
              />
            </div>
          </div>
        )}

        <div className="flex items-center space-x-4">
          {!isLoggedIn ? (
            <Button 
              variant="outline"
              size="sm"
              className="bg-music-purple border-none hover:bg-music-purple/90 text-white"
              onClick={() => navigate('/')}
            >
              Sign In
            </Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.profileImage} alt={user.name} />
                    <AvatarFallback className="bg-music-purple text-white">
                      {userInitial}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-music-card border-gray-700">
                <div className="flex items-center justify-start p-2">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-gray-400">{user.role === 'artist' ? 'Artist' : 'Fan'}</p>
                  </div>
                </div>
                <DropdownMenuSeparator className="bg-gray-700" />
                <DropdownMenuItem 
                  className="cursor-pointer hover:bg-music-hover"
                  onClick={() => {
                    if (isArtist) {
                      navigate('/dashboard');
                    } else {
                      navigate('/explore');
                    }
                  }}
                >
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="cursor-pointer hover:bg-music-hover"
                  onClick={() => {
                    if (isArtist) {
                      navigate('/uploads');
                    } else {
                      navigate('/library');
                    }
                  }}
                >
                  {isArtist ? 'My Uploads' : 'My Library'}
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="cursor-pointer hover:bg-music-hover"
                  onClick={() => navigate('/settings')}
                >
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-gray-700" />
                <DropdownMenuItem 
                  className="cursor-pointer text-red-500 hover:bg-music-hover hover:text-red-500"
                  onClick={handleLogout}
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          
          <Button 
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-music-card border-t border-gray-800 py-2">
          <div className="flex flex-col space-y-2 px-4">
            {isLoggedIn ? (
              isArtist ? (
                <>
                  <Link 
                    to="/dashboard" 
                    className="py-2 text-sm hover:text-white"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link 
                    to="/uploads" 
                    className="py-2 text-sm hover:text-white"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    My Uploads
                  </Link>
                </>
              ) : (
                <>
                  <Link 
                    to="/explore" 
                    className="py-2 text-sm hover:text-white"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Explore
                  </Link>
                  <Link 
                    to="/library" 
                    className="py-2 text-sm hover:text-white"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    My Library
                  </Link>
                </>
              )
            ) : (
              <Link 
                to="/" 
                className="py-2 text-sm hover:text-white"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign In
              </Link>
            )}
            <div className="relative w-full py-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-full pl-10 h-9 rounded-full bg-music-hover border border-gray-700 focus:outline-none focus:border-music-purple text-sm"
              />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navigation;
