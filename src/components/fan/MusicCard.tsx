
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
      className="music-card group transition-all duration-200 cursor-pointer p-2 sm:p-4 hover:border-purple-500/40"
      onClick={handleCardClick}
    >
      <div className="relative mb-2 sm:mb-3 aspect-square bg-purple-950/20 border border-purple-500/20 rounded overflow-hidden">
        <img 
          src={track.coverImage} 
          alt={track.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
          <div className="h-8 w-8 sm:h-12 sm:w-12 rounded-full bg-purple-500 flex items-center justify-center transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <Lock className="text-black" size={16} />
          </div>
        </div>
      </div>
      <h3 className="font-medium text-xs sm:text-sm truncate text-purple-100">{track.title}</h3>
      <p className="text-xs text-purple-400 mt-1">
        <Link 
          to={`/artist/${track.artistId}`} 
          className="hover:text-purple-300 hover:underline"
          onClick={(e) => e.stopPropagation()}
        >
          {track.artistName}
        </Link>
        {showPrice && (
          <span className="text-purple-500"> · {formatCurrency(track.price)}</span>
        )}
      </p>
    </div>
  );
}

export default MusicCard;
