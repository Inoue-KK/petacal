"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useState,
} from "react";

type Theme = "turquoise" | "ocean" | "coral" | "lavender";

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    // Return default value during SSR since localStorage is browser-only
    if (typeof window === "undefined") return "turquoise";
    const saved = localStorage.getItem("theme") as Theme;
    return saved || "turquoise";
  });

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
