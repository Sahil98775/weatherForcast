import {
  View,
  Text,
  TextInput,
  Pressable,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import styles from "../styles/styles";
import { Ionicons } from "@expo/vector-icons";
import { useRef, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { ScrollView } from "react-native";

const API_KEY = "a95843810001ed34db431089b26d829d";

type CityData = {
  name: string;
  lat: number;
  lon: number;
  country: string;
};
export default function SearchScreen() {
  const searchInputRef = useRef<TextInput>(null);
  const navigation = useNavigation<any>();
  const [city, setCity] = useState("");
  const [favorites, setFavorites] = useState<CityData[]>([]);
  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const stored = await AsyncStorage.getItem("favorites");

      if (!stored) return;

      const parsedFavs = JSON.parse(stored); // 👈 yeh MAIN change hai

      const updatedFavs = await Promise.all(
        parsedFavs.map(async (f: CityData) => {
          try {
            const res = await fetch(
              `https://api.openweathermap.org/data/2.5/weather?lat=${f.lat}&lon=${f.lon}&units=metric&appid=${API_KEY}`
            );
            const data = await res.json();

            return {
              ...f,
              temp: Math.round(data.main.temp),
              weatherIcon: data.weather[0].icon,
            };
          } catch {
            return f;
          }
        })
      );

      setFavorites(updatedFavs); // 👈 sirf ek baar
      await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavs));
    } catch (e) {
      console.log("Error loading favorites", e);
    }
  };

  const toggleFavorite = async (favCity: CityData) => {
    let updatedFavs = [];
    const exists = favorites.some((f) => f.name === favCity.name);

    if (exists) {
      updatedFavs = favorites.filter((f) => f.name !== favCity.name);
    } else {
      updatedFavs = [...favorites, favCity];
    }

    setFavorites(updatedFavs);
    await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavs));
  };

  useFocusEffect(
    useCallback(() => {
      setCity("");
      loadFavorites();
    }, [])
  );

  const searchCityLocation = async () => {
    try {
      if (!city.trim()) {
        Alert.alert("Error", "Please enter a city name");
        return;
      }
      const response = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${API_KEY}`
      );
      const data = await response.json();

      if (data.length === 0) {
        Alert.alert("Not Found", "City not found");
        return;
      }
      const cityData = data[0];
      navigation.navigate("WeatherDetailScreen", {
        lat: cityData.lat,
        lon: cityData.lon,
        name: cityData.name,
        country: cityData.country,
      });

      const { lat, lon, name, country } = data[0];

      // console.log("City:", name);
      // console.log("Latitude:", lat);
      // console.log("Longitude:", lon);
      // console.log("Country:", country);

      navigation.navigate("WeatherDetailScreen", { lat, lon, name, country });
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Something went wrong");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#EAF6F8" }}>
      <View style={styles.searchbar}>
        <Ionicons name="search" size={20} color="#9CA3AF" />
        <TextInput
          ref={searchInputRef}
          placeholder="Search the city"
          placeholderTextColor="#9CA3AF"
          value={city}
          onChangeText={setCity}
          style={{ flex: 1, marginLeft: 10, fontSize: 16 }}
        />
      </View>

      <Pressable
        onPress={searchCityLocation}
        // onPress={() => {
        //   searchInputRef.current?.focus();
        //   searchCityLocation();
        // }}

        style={styles.presssearch}
      >
        <Ionicons name="add" size={48} color="white" />
      </Pressable>
      <View style={{ paddingTop: 16 }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "600",
            paddingLeft: 10,
            paddingBottom: 20,
          }}
        >
          MY_CITIES
        </Text>
      </View>
      <FlatList
        data={favorites}
        keyExtractor={(item: any) => item.name + item.lat + item.lon}
        renderItem={({ item }: any) => {
          const isFav = favorites.some((f) => f.name === item.name);
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("WeatherDetailScreen", {
                  lat: item.lat,
                  lon: item.lon,
                  name: item.name,
                  country: item.country,
                })
              }
              style={{
                padding: 12,
                backgroundColor: "#fff",
                borderRadius: 30,
                marginBottom: 15,
              }}
            >
              <Text style={{ fontSize: 30, fontWeight: "600" }}>
                {item.name}
                <Text style={{ fontSize: 15 }}>({item.country})</Text>
              </Text>
              <View style={{ alignItems: "center" }}>
                {item.weatherIcon && (
                  <Image
                    source={{
                      uri: `https://openweathermap.org/img/wn/${item.weatherIcon}.png`,
                    }}
                    style={{ width: 60, height: 60, marginRight: 8 }}
                  />
                )}
                <Text style={{ fontSize: 36, fontWeight: "600" }}>
                  {item.temp}°C
                </Text>
              </View>

              <TouchableOpacity onPress={() => toggleFavorite(item)}>
                <Ionicons
                  name={isFav ? "heart" : "heart-outline"}
                  size={24}
                  color={isFav ? "red" : "black"}
                  style={{
                    position: "absolute",
                    right: "0%",
                    bottom: "0%",
                  }}
                />
              </TouchableOpacity>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}
