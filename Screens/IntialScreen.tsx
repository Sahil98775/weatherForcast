import { View, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect, useContext } from "react";
import useLocation from "./userLocation";
import { AppContext } from "../context/AppContext";

const API_KEY = "a95843810001ed34db431089b26d829d";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

type Weather = {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
};

const InitialScreen = () => {
  const context = useContext(AppContext);
  const navigation = useNavigation<any>();
  //   const [weather, setWeather] = useState<Weather | null>(null);
  const [loading, setLoading] = useState(false);
  const { coords, error, getLocation } = useLocation();
  if (!context) {
    throw new Error("AppContext must be used inside AppProvider");
  }
  const { weatherData, setWeatherData } = context;
  const LATITUDE = coords?.latitude;
  const LONGITUDE = coords?.longitude;

  useEffect(() => {
    if (!coords) return;

    const fetchWeather = async () => {
      setLoading(true);
      const url = `${BASE_URL}?lat=${LATITUDE}&lon=${LONGITUDE}&appid=${API_KEY}&units=metric`;
      try {
        const response = await fetch(url);
        const data = await response.json();

        setWeatherData(data);
        navigation.navigate("MainTabs");
      } catch (err) {
        console.error("Weather error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [coords]);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#EEF2F7",
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 30,
      }}
    >
      <Feather name="map-pin" size={100} color="#a1a1a1" />
      <Text style={{ fontSize: 20, paddingBottom: 25 }}>User Location</Text>
      <View>
        <TouchableOpacity
          onPress={getLocation}
          style={{
            backgroundColor: "blue",
            width: 300,
            height: 50,
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 18 }}>Get Location</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text style={{ paddingTop: 10 }}>
          {coords?.latitude} {coords?.longitude}
        </Text>
      </View>
    </View>
  );
};
export default InitialScreen;
