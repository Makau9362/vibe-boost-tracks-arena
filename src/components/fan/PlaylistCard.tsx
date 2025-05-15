
import { Playlist, Track } from "@/types";

interface PlaylistCardProps {
  playlist: Playlist;
  tracks: Track[];
}

export function PlaylistCard({ playlist, tracks }: PlaylistCardProps) {
  return (
    <div className="music-card group transition-all duration-200 cursor-pointer">
      <div className="relative mb-3 aspect-square bg-music-hover rounded overflow-hidden">
        {tracks.length > 0 ? (
          <div className="grid grid-cols-2 h-full w-full">
            {tracks.slice(0, 4).map((track, index) => (
              <div key={track.id} className="overflow-hidden">
                <img 
                  src={track.coverImage} 
                  alt={track.title}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
            {Array.from({ length: Math.max(0, 4 - tracks.length) }).map((_, index) => (
              <div key={`empty-${index}`} className="bg-music-dark/60"></div>
            ))}
          </div>
        ) : (
          <div className="w-full h-full bg-music-dark flex items-center justify-center">
            <p className="text-gray-400 text-sm">Empty Playlist</p>
          </div>
        )}
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
      <h3 className="font-medium text-sm truncate">{playlist.name}</h3>
      <p className="text-xs text-gray-400 mt-1">
        {tracks.length} {tracks.length === 1 ? 'track' : 'tracks'}
      </p>
    </div>
  );
}

export default PlaylistCard;
