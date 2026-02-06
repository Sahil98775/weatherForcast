import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
// import HomeScreen from "./HomeScreen";
import StacNav from "./Navigation/stacNav";
import AppProvider from "./context/AppProvider";

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <StacNav />
      </NavigationContainer>
    </AppProvider>
  );
}
