
import { useState } from "react";
import { Link } from "react-router-dom";
import { formatCurrency } from "@/lib/utils";
import { Lock } from "lucide-react";
import { Track } from "@/types";

interface MusicCardProps {
  track: Track;
  onClick?: () => void;
}

export function MusicCard({ track, onClick }: MusicCardProps) {
  const [showPrice, setShowPrice] = useState(false);
  
  const handleCardClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowPrice(true);
    
    if (onClick) {
      onClick();
    }
  };
  
  return (
    <div 
      className="group transition-all duration-200 cursor-pointer p-1 sm:p-2 hover:opacity-80"
      onClick={handleCardClick}
    >
      <div className="relative mb-1 sm:mb-2 aspect-square bg-muted overflow-hidden">
        <img 
          src={track.coverImage} 
          alt={track.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
          <div className="h-6 w-6 sm:h-8 sm:w-8 bg-foreground flex items-center justify-center transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <Lock className="text-background" size={12} />
          </div>
        </div>
      </div>
      <h3 className="font-medium text-xs truncate text-foreground">{track.title}</h3>
      <p className="text-xs text-muted-foreground mt-1">
        <Link 
          to={`/artist/${track.artistId}`} 
          className="hover:text-foreground hover:underline"
          onClick={(e) => e.stopPropagation()}
        >
          {track.artistName}
        </Link>
        {showPrice && (
          <span className="text-foreground"> · {formatCurrency(track.price)}</span>
        )}
      </p>
    </div>
  );
}

export default MusicCard;
