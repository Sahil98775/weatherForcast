import { useState } from "react";
import { AppContext } from "./AppContext";

const AppProvider = ({ children }: any) => {
  const [weatherData, setWeatherData] = useState(null);

  return (
    <AppContext.Provider value={{ weatherData, setWeatherData }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
