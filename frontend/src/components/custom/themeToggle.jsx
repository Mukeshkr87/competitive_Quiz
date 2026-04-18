import { Moon, SunMedium } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/themeContext";
import { cn } from "@/lib/utils";

export default function ThemeToggle({ className }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={toggleTheme}
      className={cn(
        "rounded-full border-white/20 bg-white/10 text-current backdrop-blur-sm hover:bg-white/20 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10",
        className
      )}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      {isDark ? <SunMedium size={16} /> : <Moon size={16} />}
      <span>{isDark ? "Light" : "Dark"} mode</span>
    </Button>
  );
}
