
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { UserRole } from "@/types";
import { signIn, signUp } from "@/lib/supabase";
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
      await signIn(email, password);
      toast.success("Login successful!");
      window.location.reload(); // Refresh to load user state
    } catch (error: any) {
      toast.error(error.message || "Login failed. Please check your credentials.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async () => {
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    
    setIsLoading(true);
    try {
      await signUp(email, password, { name: email.split('@')[0], role });
      toast.success("Account created successfully! Please check your email to verify.");
    } catch (error: any) {
      toast.error(error.message || "Account creation failed");
    } finally {
      setIsLoading(false);
    }
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
          <p>Don't have an account? 
            <button 
              type="button"
              onClick={handleSignUp}
              className="text-music-purple hover:underline ml-1"
            >
              Sign up
            </button>
          </p>
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
        
        <div className="text-center text-sm text-gray-500">
          <p>Create an account to get started with FANBAZE</p>
        </div>
      </div>
    </div>
  );
}

export default AuthForm;
