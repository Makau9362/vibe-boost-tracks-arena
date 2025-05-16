
// This component has been disabled since we're using dark theme only
// The file exists for compatibility but its functionality is not used

import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { Moon } from "lucide-react";

export function ThemeToggle() {
  // Force dark theme only
  const { setTheme } = useTheme();
  
  // Always set to dark theme
  setTheme("dark");
  
  return (
    <Button
      variant="ghost"
      size="icon"
      className="hidden" // Hide the button completely
      aria-label="Toggle theme"
    >
      <Moon className="h-[1.2rem] w-[1.2rem]" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
