
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { UserRole } from "@/types";
import { mockLogin } from "@/lib/utils";
import { toast } from "sonner";

export function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("fan");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // In a real app, we would call an API endpoint
      const { success, user } = mockLogin(email, password, role);
      
      if (success) {
        toast.success(`Welcome back, ${user.name}!`);
        
        // Redirect based on user role
        if (role === "artist") {
          navigate("/dashboard");
        } else {
          navigate("/explore");
        }
      } else {
        toast.error("Login failed. Please check your credentials.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const demoLogin = (demoRole: UserRole) => {
    const demoCredentials = {
      artist: { email: "artist@example.com", password: "password" },
      fan: { email: "fan@example.com", password: "password" }
    };
    
    setEmail(demoCredentials[demoRole].email);
    setPassword(demoCredentials[demoRole].password);
    setRole(demoRole);
    
    // Submit the form after a small delay to show the filled fields
    setTimeout(() => {
      const { success, user } = mockLogin(
        demoCredentials[demoRole].email, 
        demoCredentials[demoRole].password, 
        demoRole
      );
      
      if (success) {
        toast.success(`Welcome back, ${user.name}!`);
        
        if (demoRole === "artist") {
          navigate("/dashboard");
        } else {
          navigate("/explore");
        }
      }
    }, 500);
  };

  return (
    <div className="space-y-6 w-full max-w-md">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tighter text-gradient-purple">Sign In</h1>
        <p className="text-gray-400">Enter your email and password to access your account</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-music-card border-gray-700"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-music-card border-gray-700"
          />
        </div>
        
        <div className="space-y-2">
          <Label>Account Type</Label>
          <RadioGroup
            value={role}
            onValueChange={(value) => setRole(value as UserRole)}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="fan" id="fan" />
              <Label htmlFor="fan" className="cursor-pointer">Fan</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="artist" id="artist" />
              <Label htmlFor="artist" className="cursor-pointer">Artist</Label>
            </div>
          </RadioGroup>
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-music-purple hover:bg-music-purple/90"
          disabled={isLoading}
        >
          {isLoading ? "Signing in..." : "Sign In"}
        </Button>
        
        <div className="text-center text-gray-500 text-sm mt-4">
          <p>Don't have an account? <a href="#" className="text-music-purple hover:underline">Sign up</a></p>
        </div>
      </form>
      
      <div className="space-y-3">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-700" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-music-dark px-2 text-gray-500">Demo Accounts</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            onClick={() => demoLogin("fan")}
            className="border-gray-700 hover:bg-gray-800"
          >
            Fan Demo
          </Button>
          <Button
            variant="outline"
            onClick={() => demoLogin("artist")}
            className="border-gray-700 hover:bg-gray-800"
          >
            Artist Demo
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AuthForm;
