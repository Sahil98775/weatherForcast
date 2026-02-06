import { View, Text, ScrollView, FlatList, Image } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import styles from "../styles/styles";
import { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";

const CurrentScreen = () => {
  const context = useContext(AppContext);

  if (!context) {
    return <Text>Context not available</Text>;
  }
  const { weatherData } = context;
  if (!weatherData) {
    return <Text>Loading weather...</Text>;
  }
  const API_KEY = "a95843810001ed34db431089b26d829d";
  const [dailyData, setDailyData] = useState<any[]>([]);
  const [hourlyData, setHourlyData] = useState<any[]>([]);
  const lat = weatherData.coord.lat;
  const lon = weatherData.coord.lon;

  const fetchForecastWeather = async () => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
      const res = await fetch(url);
      const data = await res.json();

      setHourlyData(data.list.slice(0, 6));

      const dailyMap = new Map();

      data.list.forEach((item: any) => {
        const date = item.dt_txt.split(" ")[0];
        if (!dailyMap.has(date)) {
          dailyMap.set(date, item);
        }
      });

      // aaj ko hata ke next 5 days
      const dailyArray = Array.from(dailyMap.values()).slice(1, 6);
      setDailyData(dailyArray);
    } catch (error) {
      console.log("Forecast API error:", error);
    }
  };

  useEffect(() => {
    if (!weatherData) return;
    fetchForecastWeather();
  }, [weatherData]);

  const formatTime = (dt: number) => {
    return new Date(dt * 1000).toLocaleTimeString("en-US", {
      hour: "numeric",
      hour12: true,
    });
  };

  const getIconUrl = (icon: string) =>
    `https://openweathermap.org/img/wn/${icon}@2x.png`;

  //---------------------------------------------
  //   const icon = weatherData.weather[0].icon;
  //   console.log("Icon code:", icon);
  //   const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  //   console.log("Icon URL:", iconUrl);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#EAF6FA" }}>
      <ScrollView
        contentContainerStyle={styles.current}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.cityname}>
          <Text style={styles.cityText}>{weatherData.name}</Text>
          <Text
            style={{
              fontSize: 20,
              color: "white",
              fontWeight: "600",
              alignContent: "center",
            }}
          >
            ({weatherData.sys.country})
          </Text>
        </View>

        <View style={styles.weather}>
          <Text style={styles.cardTitle}>Today</Text>
          <View
            style={{
              alignItems: "center",
            }}
          >
            <Image
              source={{
                // uri: iconUrl,
                uri: getIconUrl(weatherData.weather[0].icon),
              }}
              style={{ width: 300, height: 150 }}
            />

            <Text style={{ fontSize: 20, paddingTop: 10, paddingBottom: 10 }}>
              {weatherData.weather[0].description}
            </Text>
          </View>
          <Text
            style={{
              fontSize: 70,
              color: "white",
              fontWeight: "600",
              alignContent: "center",
            }}
          >
            {weatherData.main.temp}°C
          </Text>

          <View
            style={{
              paddingHorizontal: 1,
              flexDirection: "row",
              gap: 36,
              paddingBottom: 10,
            }}
          >
            <Text
              style={{
                fontSize: 15,
                color: "white",
                fontWeight: "600",
                alignContent: "center",
              }}
            >
              🌡MIN: {weatherData.main.temp_min}°C
            </Text>
            <Text
              style={{
                fontSize: 15,
                color: "white",
                fontWeight: "600",
                alignContent: "center",
              }}
            >
              MAX:{weatherData.main.temp_max}°C
            </Text>
          </View>

          <Text
            style={{
              fontSize: 18,
              color: "white",
              fontWeight: "600",
              alignContent: "center",
            }}
          >
            💧Humidity: {weatherData.main.humidity}%
          </Text>
        </View>
        <View style={styles.present}>
          <Text style={styles.cardTitle}>Hourly Forecast</Text>

          <FlatList
            data={hourlyData}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.hourCard}>
                <Text>{formatTime(item.dt)}</Text>

                <Image
                  source={{ uri: getIconUrl(item.weather[0].icon) }}
                  style={{ width: 40, height: 40 }}
                />

                <Text>{Math.round(item.main.temp)}°C</Text>
              </View>
            )}
          />
        </View>

        <View style={styles.allday}>
          <Text style={styles.cardTitle}>Next Days</Text>
          <Text>Upcoming days' weather</Text>
          <FlatList
            data={dailyData}
            scrollEnabled={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.dayRow}>
                <Text>
                  {new Date(item.dt * 1000).toLocaleDateString("en-US", {
                    weekday: "long",
                  })}
                </Text>

                <Image
                  source={{
                    uri: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
                  }}
                  style={{ width: 40, height: 40 }}
                />

                <Text>{Math.round(item.main.temp)}°</Text>
              </View>
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default CurrentScreen;
