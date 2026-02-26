import * as Location from "expo-location";
import { useState } from "react";

const useLocation = () => {
  const [coords, setCoords] = useState<Location.LocationObjectCoords | null>(
    null
  );

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const getLocation = async () => {
    try {
      console.log("Button Pressed 🔥");
      setLoading(true);
      setError(null);

      const { status } = await Location.requestForegroundPermissionsAsync();

      console.log("Permission Status:", status);

      if (status !== "granted") {
        setError("Permission denied ");
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      console.log("Location fetched:", location.coords);

      setCoords(location.coords);
    } catch (err: any) {
      console.log("Location Error:", err);
      setError("Failed to get location");
    } finally {
      setLoading(false);
    }
  };

  return { coords, error, loading, getLocation };
};

export default useLocation;
