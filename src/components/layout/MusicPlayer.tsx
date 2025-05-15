
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
import { formatTime } from "@/lib/utils";
import { Track } from "@/types";
import { Button } from "@/components/ui/button";

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
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Initialize audio
  useEffect(() => {
    if (!track) return;
    
    // In a real app, we would use the track.audioFile
    // For the demo, we'll simulate audio playback
    setCurrentTime(0);
    setDuration(track.duration);
    
    if (isPlaying) {
      setIsPlaying(true);
    }
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [track]);

  // Handle play/pause
  useEffect(() => {
    if (!audioRef.current) return;
    
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
  }, [isPlaying, duration]);

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
    setIsPlaying(!isPlaying);
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-music-card border-t border-gray-800 px-4 py-3">
      <div className="container mx-auto flex items-center justify-between">
        {/* Track Info */}
        <div className="flex items-center space-x-3 w-1/4">
          <div className="h-10 w-10 rounded-md bg-gray-700 overflow-hidden">
            <img 
              src={track.coverImage}
              alt={track.title}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium truncate w-36">{track.title}</p>
            <p className="text-xs text-gray-400 truncate w-36">{track.artistName}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-400 hover:text-white"
            onClick={toggleLike}
          >
            <Heart className={`h-4 w-4 ${isLiked ? 'fill-music-purple text-music-purple' : ''}`} />
          </Button>
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center justify-center flex-1 max-w-md">
          <div className="flex items-center justify-center space-x-2 mb-1">
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-white"
              onClick={onPrevious}
            >
              <SkipBack className="h-4 w-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="bg-white text-black hover:bg-white/90 rounded-full h-8 w-8"
              onClick={togglePlayPause}
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-white"
              onClick={onNext}
            >
              <SkipForward className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="w-full flex items-center space-x-2">
            <span className="text-xs text-gray-400 w-8 text-right">
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
            
            <span className="text-xs text-gray-400 w-8">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* Volume Control */}
        <div className="hidden md:flex items-center justify-end space-x-2 w-1/4">
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-400 hover:text-white"
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
