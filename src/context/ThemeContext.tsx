import {
  createContext,
  useContext,
  useLayoutEffect,
  useState,
  type ReactNode,
} from "react";
import { profiles } from "../data/profiles";

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
  profileId: string;
  setProfileId: (id: string) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  isDark: false,
  toggleTheme: () => {},
  profileId: "emerald",
  setProfileId: () => {},
});

export const useTheme = () => useContext(ThemeContext);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return true;
  });

  const [profileId, setProfileIdState] = useState(
    () => localStorage.getItem("profile") ?? "emerald",
  );

  // Apply dark class + profile CSS vars synchronously before paint to avoid flash
  useLayoutEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", isDark ? "dark" : "light");

    const profile = profiles.find((p) => p.id === profileId) ?? profiles[0];
    const vars = isDark ? profile.vars.dark : profile.vars.light;
    Object.entries(vars).forEach(([prop, value]) => {
      root.style.setProperty(prop, value);
    });
  }, [isDark, profileId]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  const setProfileId = (id: string) => {
    setProfileIdState(id);
    localStorage.setItem("profile", id);
  };

  return (
    <ThemeContext.Provider
      value={{ isDark, toggleTheme, profileId, setProfileId }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
