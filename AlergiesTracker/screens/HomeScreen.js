import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, Button, Alert } from "react-native";

export default function HomeScreen() {
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
      await AsyncStorage.removeItem("userData");
      setUserData(null);
    } catch (error) {
      console.error("Помилка при видаленні даних з AsyncStorage:", error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {userData ? (
        <View>
          <Text>Ім'я: {userData.name}</Text>
          <Text>Прізвище: {userData.surname}</Text>
          <Text>Email: {userData.email}</Text>
          <Button title="Вийти" onPress={handleLogout} />
        </View>
      ) : (
        <Text>Немає даних про користувача</Text>
      )}
    </View>
  );
}
