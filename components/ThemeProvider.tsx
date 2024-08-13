"use client";
import { useEffect } from "react";

const ThemeProvider = () => {
  useEffect(() => {

    const selectedTheme = localStorage.getItem("theme");

    if (selectedTheme) {
      document.documentElement.classList.add(selectedTheme);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.add("light");
    }
  }, []);

  return null;
};

export default ThemeProvider;
