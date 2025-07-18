
import { Link } from "react-router-dom";
import { mockGetCurrentUser, mockLogout } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { MOCK_GENRES } from "@/lib/constants";

interface NavigationProps {
  onSearchChange?: (query: string) => void;
}

const Navigation = ({ onSearchChange }: NavigationProps) => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = mockGetCurrentUser();
    setCurrentUser(user);
  }, []);

  const handleLogout = () => {
    mockLogout();
    navigate("/");
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearchChange?.(query);
  };

  return (
    <header className="bg-background">
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
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center space-x-1 text-muted-foreground hover:text-foreground">
                    <span>Genres</span>
                    <ChevronDown className="h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-popover border border-border">
                    {MOCK_GENRES.map((genre) => (
                      <DropdownMenuItem key={genre} className="text-popover-foreground hover:bg-accent hover:text-accent-foreground">
                        {genre}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
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
          {/* Search Bar - only show on explore page for fans */}
          {currentUser?.role === "fan" && window.location.pathname === "/explore" && (
            <div className="relative w-64 md:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="pl-10 bg-background border-border text-foreground placeholder:text-muted-foreground text-sm"
              />
            </div>
          )}
          
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
