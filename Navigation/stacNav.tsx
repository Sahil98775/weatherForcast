import { createNativeStackNavigator } from "@react-navigation/native-stack";
import InitialScreen from "../Screens/IntialScreen";
import BottomTab from "./bottomNav";
import WeatherDetailScreen from "../Screens/WeatherDetailScreen";
const Stack = createNativeStackNavigator();

export default function StacNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Initial"
        component={InitialScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MainTabs"
        component={BottomTab}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="WeatherDetailScreen"
        component={WeatherDetailScreen}
        options={{
          title: "Weather Details",
          headerStyle: { backgroundColor: "#EAF6F8" },
        }}
      />
    </Stack.Navigator>
  );
}
