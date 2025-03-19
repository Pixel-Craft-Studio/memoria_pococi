import { useEffect, useState, useRef } from "react";

function useLocalStorage(key, initialValue) {
  const isFirstRender = useRef(true); // Evitar que el primer render dispare el efecto
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    try {
      const prevValue = window.localStorage.getItem(key);
      const newValue = JSON.stringify(storedValue);

      if (prevValue !== newValue) {
        window.localStorage.setItem(key, newValue);
        window.dispatchEvent(new Event("localStorageUpdate"));
      }
    } catch (error) {
      console.error(error);
    }
  }, [key, storedValue]);

  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const item = window.localStorage.getItem(key);
        setStoredValue(item ? JSON.parse(item) : initialValue);
      } catch {
        setStoredValue(initialValue);
      }
    };

    window.addEventListener("localStorageUpdate", handleStorageChange);
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("localStorageUpdate", handleStorageChange);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [key, initialValue]);

  return [storedValue, setStoredValue];
}

export default useLocalStorage;
