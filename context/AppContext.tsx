import { createContext } from "react";

export type AppContextType = {
  weatherData: any;
  setWeatherData: (data: any) => void;
};

export const AppContext = createContext<AppContextType | null>(null);
