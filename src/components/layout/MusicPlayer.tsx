
import { useState, useEffect, useRef } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Heart,
} from "lucide-react";
import { formatTime, mockGetUserLibrary, mockGetCurrentUser } from "@/lib/utils";
import { Track } from "@/types";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface MusicPlayerProps {
  track?: Track | null;
  onNext?: () => void;
  onPrevious?: () => void;
}

export function MusicPlayer({ track, onNext, onPrevious }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [canPlay, setCanPlay] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Check if the track is in user's library (i.e., has been supported)
  useEffect(() => {
    if (!track) return;
    
    const currentUser = mockGetCurrentUser();
    if (!currentUser) return;
    
    const { tracks } = mockGetUserLibrary(currentUser.id);
    const isTrackInLibrary = tracks.some(t => t.id === track.id);
    
    setCanPlay(isTrackInLibrary);
    
    if (!isTrackInLibrary && isPlaying) {
      setIsPlaying(false);
      toast.error("You need to support this track before you can play it in full.");
    }
  }, [track]);
  
  // Initialize audio
  useEffect(() => {
    if (!track) return;
    
    // In a real app, we would use the track.audioFile
    // For the demo, we'll simulate audio playback
    setCurrentTime(0);
    setDuration(track.duration);
    
    if (isPlaying && canPlay) {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [track, canPlay]);

  // Handle play/pause
  useEffect(() => {
    if (!audioRef.current || !canPlay) return;
    
    if (isPlaying) {
      // In a real app with real audio files:
      // audioRef.current.play();
      
      // For the demo, we'll simulate playback with a timer
      const interval = setInterval(() => {
        setCurrentTime((prevTime) => {
          if (prevTime >= duration) {
            setIsPlaying(false);
            clearInterval(interval);
            return 0;
          }
          return prevTime + 1;
        });
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }, [isPlaying, duration, canPlay]);

  // Handle volume change
  useEffect(() => {
    if (!audioRef.current) return;
    
    if (isMuted) {
      audioRef.current.volume = 0;
    } else {
      audioRef.current.volume = volume;
    }
  }, [volume, isMuted]);

  const togglePlayPause = () => {
    if (!canPlay && !isPlaying) {
      toast.error("You need to support this track before you can play it in full.");
      return;
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!canPlay) {
      toast.error("You need to support this track before you can play it in full.");
      return;
    }
    
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  if (!track) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-black border-t border-purple-500/30 px-2 sm:px-4 py-2 sm:py-3">
      <div className="container mx-auto flex items-center justify-between">
        {/* Track Info */}
        <div className="flex items-center space-x-2 sm:space-x-3 w-1/3 sm:w-1/4 min-w-0">
          <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-md bg-purple-900/50 border border-purple-500/30 overflow-hidden flex-shrink-0">
            <img 
              src={track.coverImage}
              alt={track.title}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="hidden sm:block min-w-0">
            <p className="text-xs sm:text-sm font-medium truncate w-24 sm:w-36 text-purple-100">{track.title}</p>
            <p className="text-xs text-purple-400 truncate w-24 sm:w-36">{track.artistName}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-purple-400 hover:text-purple-300 hover:bg-purple-900/30 h-6 w-6 sm:h-8 sm:w-8"
            onClick={toggleLike}
          >
            <Heart className={`h-3 w-3 sm:h-4 sm:w-4 ${isLiked ? 'fill-purple-500 text-purple-500' : ''}`} />
          </Button>
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center justify-center flex-1 max-w-xs sm:max-w-md">
          <div className="flex items-center justify-center space-x-1 sm:space-x-2 mb-1">
            <Button
              variant="ghost"
              size="icon"
              className="text-purple-400 hover:text-purple-300 hover:bg-purple-900/30 h-6 w-6 sm:h-8 sm:w-8"
              onClick={onPrevious}
            >
              <SkipBack className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="bg-purple-500 text-black hover:bg-purple-400 rounded-full h-6 w-6 sm:h-8 sm:w-8"
              onClick={togglePlayPause}
            >
              {isPlaying ? <Pause className="h-3 w-3 sm:h-4 sm:w-4" /> : <Play className="h-3 w-3 sm:h-4 sm:w-4" />}
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="text-purple-400 hover:text-purple-300 hover:bg-purple-900/30 h-6 w-6 sm:h-8 sm:w-8"
              onClick={onNext}
            >
              <SkipForward className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </div>
          
          <div className="w-full flex items-center space-x-1 sm:space-x-2">
            <span className="text-xs text-purple-400 w-6 sm:w-8 text-right">
              {formatTime(currentTime)}
            </span>
            
            <div className="player-progress flex-1">
              <input
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={handleProgressChange}
                className="appearance-none absolute opacity-0 w-full h-1 cursor-pointer"
                style={{ margin: 0 }}
              />
              <div 
                className="player-progress-fill" 
                style={{ width: `${(currentTime / duration) * 100}%` }}
              ></div>
            </div>
            
            <span className="text-xs text-purple-400 w-6 sm:w-8">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* Volume Control */}
        <div className="hidden lg:flex items-center justify-end space-x-2 w-1/4">
          <Button
            variant="ghost"
            size="icon"
            className="text-purple-400 hover:text-purple-300 hover:bg-purple-900/30"
            onClick={toggleMute}
          >
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </Button>
          
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="volume-slider"
          />
        </div>
      </div>
      
      {/* Hidden audio element */}
      <audio ref={audioRef} src={track.audioFile || ''} />
    </div>
  );
}

export default MusicPlayer;
