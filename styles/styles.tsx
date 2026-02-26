import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  // --------------------------------------------------CurrentScreen ---------------------------------------
  current: {
    backgroundColor: "#E0F2F7",
    padding: 16,
  },

  cityname: {
    backgroundColor: "#2C3E50",
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginBottom: 16,

    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
    alignItems: "center",
  },

  cityText: {
    fontSize: 40,
    fontWeight: "600",
    color: "#FFFFFF",
  },

  weather: {
    backgroundColor: "#8BC",
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,

    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },

  present: {
    backgroundColor: "#4FB6CF",
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,

    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },

  allday: {
    backgroundColor: "#C8E6C9",

    borderRadius: 20,
    padding: 20,
    marginBottom: 24,

    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },

  cardTitle: {
    fontSize: 25,
    fontWeight: "600",
    marginBottom: 8,
    color: "#FFFFFF",
  },
  hourCard: {
    backgroundColor: "rgba(255,255,255,0.25)",
    padding: 12,
    borderRadius: 12,
    marginRight: 12,
  },
  dayRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: "rgba(255,255,255,0.4)",
  },
  // --------------------------------------------------SearchScreen ---------------------------------------

  searchbar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginTop: 60,
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 50,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  presssearch: {
    position: "absolute",
    bottom: 60,
    right: 50,
    zIndex: 10,
    elevation: 10,
    backgroundColor: "#2563EB",
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#2563EB",
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
});

export default styles;
