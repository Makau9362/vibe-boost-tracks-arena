
import { useState } from "react";
import { Link } from "react-router-dom";
import { formatCurrency } from "@/lib/utils";
import { Play, Pause, Lock } from "lucide-react";
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
      className="music-card group transition-all duration-200 cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="relative mb-3 aspect-square bg-gray-900 rounded overflow-hidden">
        <img 
          src={track.coverImage} 
          alt={track.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
          <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <Lock className="text-black" size={20} />
          </div>
        </div>
      </div>
      <h3 className="font-medium text-sm truncate text-white">{track.title}</h3>
      <p className="text-xs text-gray-400 mt-1">
        <Link 
          to={`/artist/${track.artistId}`} 
          className="hover:text-white hover:underline"
          onClick={(e) => e.stopPropagation()}
        >
          {track.artistName}
        </Link>
        {showPrice && (
          <span> · {formatCurrency(track.price)}</span>
        )}
      </p>
    </div>
  );
}

export default MusicCard;
