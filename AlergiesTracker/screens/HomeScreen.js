import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyDrawer from "./MyDrawer";
import { PaperProvider } from "react-native-paper";

export default function HomeScreen({ navigation }) {
  const [allergies, setAllergies] = useState([]);

  useEffect(() => {
    // Отримання даних з AsyncStorage
    const fetchData = async () => {
      const data = await AsyncStorage.getItem("allergies");
      if (data) {
        setAllergies(JSON.parse(data));
      }
    };
    fetchData();
  }, []);

  return (
    <>
        <MyDrawer />
      <View style={{ flex: 1, padding: 20 }}>
        <FlatList
          data={allergies}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={{ padding: 10, borderBottomWidth: 1 }}>
              <Text>{item.name}</Text>
              <Text>Intensity: {item.intensity}</Text>
              <Button
                title="View Details"
                onPress={() =>
                  navigation.navigate("AllergyDetail", { allergy: item })
                }
              />
            </View>
          )}
        />
        <Button
          title="Add Allergy"
          onPress={() => navigation.navigate("AddAllergy")}
        />
        <Button
          title="Settings"
          onPress={() => navigation.navigate("Settings")}
        />
      </View>
    </>
  );
}
