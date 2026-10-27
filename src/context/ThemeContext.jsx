
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("taskTheme") === "dark"
      ? "dark"
      : "light";
  });

  // Save selected theme
  useEffect(() => {
    localStorage.setItem("taskTheme", theme);
  }, [theme]);

  // Switch between light and dark mode
  function toggleTheme() {
    setTheme((previousTheme) =>
      previousTheme === "light" ? "dark" : "light"
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom Hook to access ThemeContext
export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }

  return context;
}
