
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Track } from "@/types";

interface CreatePlaylistModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreatePlaylist: (name: string, trackIds: string[]) => void;
  availableTracks: Track[];
}

export function CreatePlaylistModal({
  isOpen,
  onClose,
  onCreatePlaylist,
  availableTracks
}: CreatePlaylistModalProps) {
  const [name, setName] = useState("");
  const [selectedTrackIds, setSelectedTrackIds] = useState<string[]>([]);
  
  const handleCreatePlaylist = () => {
    if (!name.trim()) return;
    
    onCreatePlaylist(name.trim(), selectedTrackIds);
    setName("");
    setSelectedTrackIds([]);
  };
  
  const toggleTrackSelection = (trackId: string) => {
    setSelectedTrackIds(prev => 
      prev.includes(trackId)
        ? prev.filter(id => id !== trackId)
        : [...prev, trackId]
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-music-card border-gray-700 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">Create New Playlist</DialogTitle>
          <DialogDescription className="text-gray-400">
            Create a playlist from your downloaded tracks
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="playlist-name">Playlist Name</Label>
            <Input
              id="playlist-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="My Awesome Playlist"
              className="bg-music-hover border-gray-700"
            />
          </div>
          
          <div className="space-y-2">
            <Label>Select Tracks</Label>
            {availableTracks.length > 0 ? (
              <ScrollArea className="h-60">
                <div className="space-y-2">
                  {availableTracks.map((track) => (
                    <div key={track.id} className="flex items-center space-x-3 p-2 rounded hover:bg-music-hover">
                      <Checkbox
                        id={`track-${track.id}`}
                        checked={selectedTrackIds.includes(track.id)}
                        onCheckedChange={() => toggleTrackSelection(track.id)}
                      />
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 overflow-hidden rounded">
                          <img 
                            src={track.coverImage} 
                            alt={track.title} 
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <Label 
                            htmlFor={`track-${track.id}`}
                            className="text-sm font-medium cursor-pointer"
                          >
                            {track.title}
                          </Label>
                          <p className="text-xs text-gray-400">{track.artistName}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            ) : (
              <div className="text-center p-4 border border-dashed border-gray-700 rounded-md">
                <p className="text-gray-400">No tracks available</p>
              </div>
            )}
          </div>
        </div>
        
        <DialogFooter>
          <Button 
            variant="ghost" 
            onClick={onClose}
            className="border-gray-700 hover:bg-gray-800"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleCreatePlaylist}
            disabled={!name.trim() || selectedTrackIds.length === 0}
            className="bg-music-purple hover:bg-music-purple/90"
          >
            Create Playlist
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CreatePlaylistModal;
