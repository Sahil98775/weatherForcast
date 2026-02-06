import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import useLocation from "./Screens/userLocation";
import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";

const API_KEY = "a95843810001ed34db431089b26d829d";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

type Weather = {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
};

const HomeScreen = () => {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [loading, setLoading] = useState(false);
  const { coords, error, getLocation } = useLocation();

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
        setWeather(data);
      } catch (err) {
        console.error("Weather error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [coords]);

  return (
    <View style={styles.container}>
      <Feather name="map-pin" size={44} color="#a1a1a1" />
      <Text style={styles.toptext}>Use Location</Text>
      <View>
        <TouchableOpacity onPress={getLocation}>
          <Text style={{ color: "blue", fontSize: 18 }}>Get Location</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text>Latitude: {coords?.latitude}</Text>
        <Text>Longitude: {coords?.longitude}</Text>

        {weather && (
          <View
            style={{ marginTop: 20, backgroundColor: "white", padding: 10 }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              📍 {weather.name}
            </Text>
            <Text>🌡 Temperature: {weather.main.temp} °C</Text>
            <Text>💧 Humidity: {weather.main.humidity} %</Text>
          </View>
        )}
      </View>
    </View>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#81D4FA",
    alignItems: "center",
    justifyContent: "center",
  },
  toptext: {
    color: "black",
    fontSize: 20,
    marginLeft: 10,
  },
});
