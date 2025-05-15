
import { formatCurrency } from "@/lib/utils";
import { Track } from "@/types";

interface MusicCardProps {
  track: Track;
  onClick?: () => void;
}

export function MusicCard({ track, onClick }: MusicCardProps) {
  return (
    <div 
      className="music-card group transition-all duration-200 cursor-pointer"
      onClick={onClick}
    >
      <div className="relative mb-3 aspect-square bg-music-hover rounded overflow-hidden">
        <img 
          src={track.coverImage} 
          alt={track.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
          <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="text-black"
            >
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </div>
        </div>
      </div>
      <h3 className="font-medium text-sm truncate">{track.title}</h3>
      <p className="text-xs text-gray-400 mt-1">
        {track.artistName} · {formatCurrency(track.price)}
      </p>
    </div>
  );
}

export default MusicCard;
