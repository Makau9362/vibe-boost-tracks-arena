
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatCurrency, formatTime, mockPurchaseTrack } from "@/lib/utils";
import { Track } from "@/types";
import { toast } from "sonner";
import { SUPPORT_TIERS } from "@/lib/constants";
import { Toggle } from "@/components/ui/toggle";
import { Download } from "lucide-react";

interface SupportModalProps {
  track: Track | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function SupportModal({ track, isOpen, onClose, onSuccess }: SupportModalProps) {
  const [selectedAmount, setSelectedAmount] = useState(50);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  
  if (!track) return null;

  const handlePurchase = () => {
    setIsPurchasing(true);
    
    // In a real app, we would call a payment processing API
    setTimeout(() => {
      const result = mockPurchaseTrack(track.id, selectedAmount);
      
      if (result && result.success) {
        toast.success(`Thank you for supporting ${track.artistName}!`);
        setPaymentComplete(true);
        onSuccess();
      } else {
        toast.error("Purchase failed. Please try again.");
      }
      
      setIsPurchasing(false);
    }, 1500);
  };

  const handleDownload = () => {
    // In a real app, this would trigger a file download
    toast.success(`Downloading ${track.title}...`);
    
    // Simulate download by creating a temporary link
    const link = document.createElement('a');
    link.href = track.audioFile || '#';
    link.download = `${track.title} - ${track.artistName}.mp3`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-music-card border-gray-700 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">Support this Artist</DialogTitle>
          <DialogDescription className="text-gray-400">
            Support {track.artistName} by downloading "{track.title}"
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex space-x-4 py-4">
          <div className="h-24 w-24 flex-shrink-0 rounded-md overflow-hidden bg-music-hover">
            <img 
              src={track.coverImage} 
              alt={track.title}
              className="h-full w-full object-cover"
            />
          </div>
          
          <div>
            <h3 className="font-medium">{track.title}</h3>
            <p className="text-sm text-gray-400 mb-2">{track.artistName}</p>
            <p className="text-xs text-gray-500">
              {track.genre} · {formatTime(track.duration)}
            </p>
          </div>
        </div>
        
        {!paymentComplete ? (
          <div className="py-4">
            <h4 className="font-medium mb-3">Choose support amount:</h4>
            <div className="grid grid-cols-3 gap-2">
              {SUPPORT_TIERS.map((tier) => (
                <Toggle
                  key={tier.value}
                  pressed={selectedAmount === tier.value}
                  onPressedChange={() => setSelectedAmount(tier.value)}
                  className={`border-gray-700 ${
                    selectedAmount === tier.value 
                      ? "bg-music-purple hover:bg-music-purple/90" 
                      : "hover:bg-gray-800"
                  }`}
                >
                  {tier.label}
                </Toggle>
              ))}
            </div>
          </div>
        ) : (
          <div className="py-4 text-center">
            <p className="text-green-400 font-medium mb-3">Payment successful!</p>
            <p className="text-gray-300">You can now download this track.</p>
          </div>
        )}
        
        <DialogFooter>
          <Button 
            variant="ghost" 
            onClick={onClose}
            className="border-gray-700 hover:bg-gray-800"
          >
            Cancel
          </Button>
          
          {!paymentComplete ? (
            <Button 
              onClick={handlePurchase}
              className="bg-music-green hover:bg-music-green/90"
              disabled={isPurchasing}
            >
              {isPurchasing ? "Processing..." : `Support ${formatCurrency(selectedAmount)}`}
            </Button>
          ) : (
            <Button 
              onClick={handleDownload}
              className="bg-music-purple hover:bg-music-purple/90"
            >
              <Download className="h-4 w-4 mr-2" /> Download Track
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default SupportModal;
