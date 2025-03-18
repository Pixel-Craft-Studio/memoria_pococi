import { useEffect, useCallback } from "react";

import SunIcon from "./SunIcon";
import MoonIcon from "./MoonIcon";
import useLocalStorage from "../../hooks/useLocalStorage";

const ThemeSwitcher = () => {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [isDarkMode, setIsDarkMode] = useLocalStorage("theme", prefersDark);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  const toggleTheme = useCallback(() => {
    setIsDarkMode((prevMode) => !prevMode);
  }, [setIsDarkMode]);

  return (
    <div
      onClick={toggleTheme}
      className="mr-4 relative hover:rotate-360 bg-neutral-600 dark:bg-gray-100 w-6 h-6 cursor-pointer rounded-full  flex items-center justify-center"
    >
      <SunIcon
        className={`absolute inset-0 m-auto w-4 h-4 transform transition-all duration-300 fill-neutral-100 ${
          !isDarkMode ? "opacity-100 rotate-0" : "opacity-0 rotate-180"
        }`}
      />
      <MoonIcon
        className={`absolute inset-0 m-auto w-4 h-4 transform transition-all duration-300 fill-neutral-800 ${
          isDarkMode ? "opacity-100 rotate-0" : "opacity-0 rotate-180"
        }`}
      />
    </div>
  );
};

export default ThemeSwitcher;
