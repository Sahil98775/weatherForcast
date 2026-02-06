import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import CurrentScreen from "../Screens/CurrentScreen";
import SearchScreen from "../Screens/SearchScreen";
import { useRoute } from "@react-navigation/native";
const Bottom = createBottomTabNavigator();

export default function BottomTab() {
  // const route = useRoute<any>();
  // const { weatherData, latitude, longitude } = route.params || {};
  return (
    <Bottom.Navigator>
      <Bottom.Screen
        name="Current"
        component={CurrentScreen}
        // initialParams={{
        //   weatherData,
        //   latitude,
        //   longitude,
        // }}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="location-outline" color={color} size={24} />
          ),
          headerShown: false,
        }}
      />

      <Bottom.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="globe-outline" color={color} size={24} />
          ),
          headerShown: false,
        }}
      />
    </Bottom.Navigator>
  );
}
