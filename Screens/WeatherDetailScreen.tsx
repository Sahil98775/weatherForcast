import { View, Text, ScrollView, Image, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/native";
import { useEffect, useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
const API_KEY = "a95843810001ed34db431089b26d829d";

type FavoriteCity = {
  name: string;
  lat: number;
  lon: number;
  country: string;
  temp: number;
  weatherIcon: string;
};
export default function WeatherDetailScreen() {
  const route = useRoute<any>();
  const { lat, lon, name, country } = route.params;
  const [weather, setWeather] = useState<any>(null);
  const [hourlyData, setHourlyData] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<FavoriteCity[]>([]);

  const [isFavorite, setIsFavorite] = useState(false);
  const [dailyData, setDailyData] = useState<any[]>([]);

  useEffect(() => {
    fetchWeather();
    fetchHourlyWeather();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [name])
  );

  const loadFavorites = async () => {
    try {
      const stored = await AsyncStorage.getItem("favorites");
      if (stored) {
        const favs = JSON.parse(stored);
        setFavorites(favs);
        const exists = favs.some((fav: any) => fav.name === name);
        setIsFavorite(exists);
      } else {
        setFavorites([]);
        setIsFavorite(false);
      }
    } catch (e) {
      console.log("Error loading favorites", e);
    }
  };

  const fetchWeather = async () => {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );
    const data = await res.json();
    setWeather(data);
  };

  const fetchHourlyWeather = async () => {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );
    const data = await res.json();

    setHourlyData(data.list);
    const daily = data.list.filter((item: any) =>
      item.dt_txt.includes("12:00:00")
    );

    setDailyData(daily);
  };

  if (!weather) {
    return <Text>Loading weather...</Text>;
  }
  const toogleFavorite = async () => {
    let updateFavs = [];
    if (isFavorite) {
      updateFavs = favorites.filter((fav: any) => fav.name !== name);
    } else {
      updateFavs = [
        ...favorites,
        {
          name,
          lat,
          lon,
          country,
          temp: Math.round(weather.main.temp),
          weatherIcon: weather.weather[0].icon,
        },
      ];
    }
    setFavorites(updateFavs);
    setIsFavorite(!isFavorite);
    await AsyncStorage.setItem("favorites", JSON.stringify(updateFavs));
  };

  return (
    <ScrollView
      contentContainerStyle={{ padding: 10, backgroundColor: "#E0F2F7" }}
      showsVerticalScrollIndicator={true}
    >
      <View
        style={{
          flex: 1,
          paddingVertical: 18,
          paddingHorizontal: 20,
          borderRadius: 20,
          marginBottom: 16,
          alignItems: "center",
        }}
      >
        <Ionicons
          name={isFavorite ? "heart" : "heart-outline"}
          size={30}
          color={isFavorite ? "red" : "black"}
          style={{ position: "absolute", right: 0 }}
          onPress={toogleFavorite}
        />

        <Text style={{ fontSize: 60, fontWeight: "600" }}>{name}</Text>
        <Image
          source={{
            uri: `https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`,
          }}
          style={{ width: 200, height: 150 }}
        />
        <Text style={{ fontSize: 16 }}>{weather.weather[0].description}</Text>
        <Text style={{ fontSize: 70, fontWeight: "400", paddingTop: 15 }}>
          {weather.main.temp}°C
        </Text>
      </View>
      <View
        style={{
          backgroundColor: "#5EB5C9",
          borderRadius: 20,
          padding: 20,
          marginBottom: 16,

          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowRadius: 6,
          elevation: 3,
        }}
      >
        <Text style={{ paddingBottom: 15, fontSize: 18, fontWeight: "600" }}>
          TODAY'S FORECAST
        </Text>
        <FlatList
          data={hourlyData.slice(0, 12)}
          horizontal
          style={{ height: 120 }}
          showsHorizontalScrollIndicator={true}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
            const hour = new Date(item.dt * 1000).getHours();

            return (
              <View
                style={{
                  backgroundColor: "#FFFFFF",
                  padding: 10,
                  borderRadius: 14,
                  alignItems: "center",
                  marginRight: 10,
                  width: 80,
                }}
              >
                <Text style={{ fontSize: 18 }}>{hour}:00</Text>
                <Image
                  source={{
                    uri: `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`,
                  }}
                  style={{ width: 50, height: 50 }}
                />
                <Text style={{ fontSize: 18 }}>
                  {Math.round(item.main.temp)}°C
                </Text>
              </View>
            );
          }}
        />
      </View>

      <View
        style={{
          backgroundColor: "#5EB",
          borderRadius: 20,
          padding: 20,
          marginBottom: 16,

          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowRadius: 6,
          elevation: 3,
        }}
      >
        <Text style={{ paddingBottom: 15, fontSize: 18, fontWeight: "600" }}>
          NEXT 5 DAYS FORECAST
        </Text>
        <FlatList
          data={dailyData.slice(0, 5)}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
            const date = new Date(item.dt * 1000).toDateString();

            return (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingVertical: 10,
                }}
              >
                <Text style={{ fontSize: 18 }}>{date}</Text>

                <Image
                  source={{
                    uri: `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`,
                  }}
                  style={{ width: 50, height: 40 }}
                />

                <Text style={{ fontSize: 20 }}>
                  {Math.round(item.main.temp)}°C
                </Text>
              </View>
            );
          }}
        />
      </View>
    </ScrollView>
  );
}
