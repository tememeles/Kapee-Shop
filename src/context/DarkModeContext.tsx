import { createContext } from "react";

export const DarkModeContext = createContext({
  darkMode: false,
  setDarkMode: (_: boolean) => {},
});
