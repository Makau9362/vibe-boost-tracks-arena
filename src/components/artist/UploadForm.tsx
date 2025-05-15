
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { MOCK_GENRES } from "@/lib/constants";
import { mockUploadTrack } from "@/lib/utils";
import { toast } from "sonner";

export function UploadForm() {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [price, setPrice] = useState(50);
  const [description, setDescription] = useState("");
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  
  const navigate = useNavigate();
  
  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCoverImageFile(file);
      
      // Create a preview
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setCoverImagePreview(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleAudioFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAudioFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !genre || !coverImageFile || !audioFile) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    setIsUploading(true);
    
    try {
      // In a real app, we would upload files to storage and get URLs
      // For demo, we'll mock the upload
      const result = mockUploadTrack({
        title,
        genre,
        price,
        // In a real app these would be URLs from upload
        coverImage: coverImagePreview || "/placeholder.svg",
        audioFile: "audio-file-url",
      });
      
      if (result && result.success) {
        toast.success("Track uploaded successfully!");
        navigate("/dashboard");
      } else {
        toast.error("Failed to upload track");
      }
    } catch (error) {
      toast.error("An error occurred during upload");
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="container max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-gradient-purple">Upload New Track</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Track Title *</Label>
              <Input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter track title"
                required
                className="bg-music-card border-gray-700"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="genre">Genre *</Label>
              <Select value={genre} onValueChange={setGenre} required>
                <SelectTrigger className="bg-music-card border-gray-700">
                  <SelectValue placeholder="Select genre" />
                </SelectTrigger>
                <SelectContent className="bg-music-card border-gray-700">
                  {MOCK_GENRES.map((g) => (
                    <SelectItem key={g} value={g}>{g}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Tell listeners about your track"
                className="bg-music-card border-gray-700 min-h-[120px]"
              />
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="coverImage">Cover Image *</Label>
              <div 
                className="bg-music-card border border-dashed border-gray-700 rounded-lg flex flex-col items-center justify-center h-[200px] overflow-hidden relative"
              >
                {coverImagePreview ? (
                  <img 
                    src={coverImagePreview} 
                    alt="Cover Preview" 
                    className="w-full h-full object-cover" 
                  />
                ) : (
                  <div className="text-center p-4">
                    <p className="text-sm text-gray-400">Click to upload cover image</p>
                    <p className="text-xs text-gray-500 mt-1">Recommended: 300x300 JPG, PNG</p>
                  </div>
                )}
                <input
                  type="file"
                  id="coverImage"
                  accept="image/*"
                  onChange={handleCoverImageChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="audioFile">Audio File *</Label>
              <div className="bg-music-card border border-dashed border-gray-700 rounded-lg p-4 text-center">
                {audioFile ? (
                  <p className="text-sm">{audioFile.name}</p>
                ) : (
                  <div>
                    <p className="text-sm text-gray-400">Click to upload audio file</p>
                    <p className="text-xs text-gray-500 mt-1">MP3 format recommended</p>
                  </div>
                )}
                <input
                  type="file"
                  id="audioFile"
                  accept="audio/*"
                  onChange={handleAudioFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
            </div>
            
            <div className="pt-4 mt-auto">
              <Button
                type="submit"
                className="w-full bg-music-purple hover:bg-music-purple/90"
                disabled={isUploading}
              >
                {isUploading ? "Uploading..." : "Upload Track"}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default UploadForm;
