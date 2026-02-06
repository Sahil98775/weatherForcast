import { View, Text, TextInput, Pressable } from "react-native";
import styles from "../styles/styles";
import { Ionicons } from "@expo/vector-icons";
import { useRef } from "react";

export default function SearchScreen() {
  const searchInputRef = useRef<TextInput>(null);
  return (
    <View style={{ flex: 1, backgroundColor: "#EAF6F8" }}>
      <View style={styles.searchbar}>
        <Ionicons name="search" size={20} color="#9CA3AF" />
        <TextInput
          ref={searchInputRef}
          placeholder="Search the city"
          placeholderTextColor="#9CA3AF"
          style={{
            flex: 1,
            marginLeft: 10,
            fontSize: 16,
          }}
        />
      </View>
      <Pressable
        onPress={() => searchInputRef.current?.focus()}
        style={styles.presssearch}
      >
        <Ionicons name="add" size={48} color="white" />
      </Pressable>
    </View>
  );
}
