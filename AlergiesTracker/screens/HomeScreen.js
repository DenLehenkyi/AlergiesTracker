import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, TouchableRipple } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons"; // Потрібно встановити expo/vector-icons
import MyDrawer from "./MyDrawer";
import { useNavigation } from "@react-navigation/native";
import AddAllergyScreen from "./AddAllergyScreen";

export default function HomeScreen() {
  const [userData, setUserData] = useState(null);
  const navigation = useNavigation();

  return (
    <>
      <MyDrawer />
      <View style={styles.container}>
        <TouchableRipple
          style={styles.button}
          onPress={() => navigation.navigate('AddAllergy')}
        >
          <Text style={styles.buttonText}>Додати алергію</Text>
        </TouchableRipple>
  
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#8BDBAD",
    width: 250,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    marginTop: 20,
  },
  buttonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Comfortaa-VariableFont_wght",
  },
});
