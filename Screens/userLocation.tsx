import * as Location from "expo-location";
import { useState } from "react";

const useLocation = () => {
  const [coords, setCoords] = useState<Location.LocationObjectCoords | null>(
    null
  );
  //   const [coords, setCoords] = useState<null>(null);
  const [error, setError] = useState<null | string>(null);
  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setError("Permission to access location was denied");
      return;
    }
    const isEnabled = await Location.hasServicesEnabledAsync();
    if (!isEnabled) {
      setError("Location services are disabled");
      return;
    }
    const loc = await Location.getCurrentPositionAsync({});
    setCoords(loc.coords);
  };
  return { coords, error, getLocation };
};
export default useLocation;
