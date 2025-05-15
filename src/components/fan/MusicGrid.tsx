
import { useState, useEffect } from "react";
import MusicCard from "./MusicCard";
import { mockGetTracks } from "@/lib/utils";
import { Track } from "@/types";

interface MusicGridProps {
  onTrackSelect?: (track: Track) => void;
}

export function MusicGrid({ onTrackSelect }: MusicGridProps) {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Fetch tracks
    const fetchedTracks = mockGetTracks();
    setTracks(fetchedTracks);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-music-hover h-40 w-full rounded-lg mb-3"></div>
            <div className="bg-music-hover h-4 w-3/4 rounded mb-2"></div>
            <div className="bg-music-hover h-3 w-1/2 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (tracks.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-400">No tracks available</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
      {tracks.map((track) => (
        <MusicCard 
          key={track.id} 
          track={track} 
          onClick={() => onTrackSelect?.(track)} 
        />
      ))}
    </div>
  );
}

export default MusicGrid;
