
import { useState, useEffect } from "react";
import MusicCard from "./MusicCard";
import { mockGetTracks } from "@/lib/utils";
import { Track } from "@/types";

interface MusicGridProps {
  onTrackSelect?: (track: Track) => void;
  searchQuery?: string;
}

export function MusicGrid({ onTrackSelect, searchQuery = "" }: MusicGridProps) {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [filteredTracks, setFilteredTracks] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Fetch tracks
    const fetchedTracks = mockGetTracks();
    setTracks(fetchedTracks);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredTracks(tracks);
    } else {
      const filtered = tracks.filter(track => 
        track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        track.artistName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        track.genre.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredTracks(filtered);
    }
  }, [tracks, searchQuery]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2 sm:gap-3">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-muted h-16 sm:h-20 w-full mb-2"></div>
            <div className="bg-muted h-2 w-3/4 mb-1"></div>
            <div className="bg-muted h-2 w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (filteredTracks.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">
          {searchQuery ? "No tracks found matching your search" : "No tracks available"}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2 sm:gap-3">
      {filteredTracks.map((track) => (
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
