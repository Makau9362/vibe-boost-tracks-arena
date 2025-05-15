
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { mockGetCurrentUser, mockGetArtistTracks, mockDeleteTrack } from "@/lib/utils";
import { TrashIcon } from "lucide-react";
import { formatDate, formatTime } from "@/lib/utils";
import { Track } from "@/types";
import { toast } from "sonner";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function UploadsManager() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [trackToDelete, setTrackToDelete] = useState<Track | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  
  useEffect(() => {
    const currentUser = mockGetCurrentUser();
    if (!currentUser || currentUser.role !== "artist") return;
    
    const artistTracks = mockGetArtistTracks(currentUser.id);
    setTracks(artistTracks);
    setIsLoading(false);
  }, []);
  
  const handleDeleteTrack = async () => {
    if (!trackToDelete) return;
    
    setIsDeleting(true);
    
    try {
      const result = mockDeleteTrack(trackToDelete.id);
      
      if (result.success) {
        setTracks(prev => prev.filter(track => track.id !== trackToDelete.id));
        toast.success(`"${trackToDelete.title}" has been deleted`);
      } else {
        toast.error("Failed to delete track. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred during deletion");
      console.error(error);
    } finally {
      setIsDeleting(false);
      setTrackToDelete(null);
    }
  };

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="bg-music-hover h-16 rounded-lg"></div>
        ))}
      </div>
    );
  }

  if (tracks.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-400 mb-4">You haven't uploaded any tracks yet.</p>
        <Button 
          onClick={() => window.location.href = "/upload"}
          className="bg-music-purple hover:bg-music-purple/90"
        >
          Upload Your First Track
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="overflow-hidden rounded-lg border border-gray-700 bg-music-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="py-3 px-4 text-left">Track</th>
              <th className="py-3 px-4 text-left hidden md:table-cell">Genre</th>
              <th className="py-3 px-4 text-left hidden sm:table-cell">Release Date</th>
              <th className="py-3 px-4 text-left hidden lg:table-cell">Duration</th>
              <th className="py-3 px-4 text-left hidden sm:table-cell">Downloads</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tracks.map((track) => (
              <tr 
                key={track.id} 
                className="border-b border-gray-700 last:border-0 hover:bg-music-hover"
              >
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 flex-shrink-0 rounded overflow-hidden">
                      <img 
                        src={track.coverImage} 
                        alt={track.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{track.title}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4 hidden md:table-cell">{track.genre}</td>
                <td className="py-3 px-4 hidden sm:table-cell">{formatDate(track.releaseDate)}</td>
                <td className="py-3 px-4 hidden lg:table-cell">{formatTime(track.duration)}</td>
                <td className="py-3 px-4 hidden sm:table-cell">{track.downloads}</td>
                <td className="py-3 px-4 text-right">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-red-500 hover:text-red-400 hover:bg-red-500/10"
                    onClick={() => setTrackToDelete(track)}
                  >
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <Dialog open={!!trackToDelete} onOpenChange={() => setTrackToDelete(null)}>
        <DialogContent className="bg-music-card border-gray-700 sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Track</DialogTitle>
            <DialogDescription className="text-gray-400">
              Are you sure you want to delete "{trackToDelete?.title}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant="ghost" 
              onClick={() => setTrackToDelete(null)}
              className="border-gray-700 hover:bg-gray-800"
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleDeleteTrack}
              variant="destructive"
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default UploadsManager;
