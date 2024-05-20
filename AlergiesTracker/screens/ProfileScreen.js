import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons"; // Потрібно встановити expo/vector-icons
import MyDrawer from "./MyDrawer";
import { useContext } from "react";
import lightTheme from "../themes/lightTheme";
import darkTheme from "../themes/darkTheme";
import ThemeContext from "../Context/ThemeContext";

export default function ProfileScreen() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    retrieveUserData();
  }, []);

  const retrieveUserData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("userData");
      if (jsonValue !== null) {
        setUserData(JSON.parse(jsonValue));
      }
    } catch (error) {
      console.error("Помилка при отриманні даних з AsyncStorage:", error);
    }
  };

  const handleLogout = async () => {
    try {
      // await AsyncStorage.removeItem("userData");
      setUserData(null);
    } catch (error) {
      console.error("Помилка при видаленні даних з AsyncStorage:", error);
    }
  };

  return (
    <>
      <MyDrawer></MyDrawer>
      <View
        style={[styles.container, { backgroundColor: theme.backgroundColor }]}
      >
        {userData ? (
          <View
            style={[
              styles.userDataContainer,
              { backgroundColor: theme.lightGreen },
            ]}
          >
            <MaterialIcons
              name="person"
              size={50}
              color={theme.textColor}
              style={styles.icon}
            />
            <View style={styles.userInfoField}>
              <Text style={[styles.fieldLabel, { color: theme.buttonColor }]}>
                Ім'я:
              </Text>
              <Text style={[styles.fieldValue, { color: theme.textColor }]}>
                {userData.name}
              </Text>
            </View>
            <View style={styles.userInfoField}>
              <Text style={[styles.fieldLabel, { color: theme.buttonColor }]}>
                Прізвище:
              </Text>
              <Text style={[styles.fieldValue, { color: theme.textColor }]}>
                {userData.surname}
              </Text>
            </View>
            <View style={styles.userInfoField}>
              <Text style={[styles.fieldLabel, { color: theme.buttonColor }]}>
                Email:
              </Text>
              <Text style={[styles.fieldValue, { color: theme.textColor }]}>
                {userData.email}
              </Text>
            </View>
            <TouchableOpacity
              onPress={handleLogout}
              style={[styles.button, { backgroundColor: theme.buttonColor }]}
            >
              <Text style={[styles.buttonText, { color: theme.textColor }]}>
                Вийти
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Text style={{ color: theme.textColor }}>
            Немає даних про користувача
          </Text>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#78C599",
  },
  userDataContainer: {
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
    height: 500,
    borderRadius: 10,
    elevation: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    justifyContent: "center",
    backgroundColor: "#E2FFE6",
    
  },
  userInfoField: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  fieldLabel: {
    marginRight: 15,
    fontWeight: "bold",
  },
  fieldValue: {
    fontSize: 16,
  },
  icon: {
    marginBottom: 60,
  },
  button: {
    backgroundColor: "#8BDBAD",
    width: 120,
    padding: 10,
    borderRadius: 15,
    marginTop: 70,
  },
  buttonText: {
    color: "black",
    textAlign: "center",
  },
});
