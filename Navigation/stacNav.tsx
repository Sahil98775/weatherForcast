import { createNativeStackNavigator } from "@react-navigation/native-stack";
import InitialScreen from "../Screens/IntialScreen";
import BottomTab from "./bottomNav";
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
    </Stack.Navigator>
  );
}
