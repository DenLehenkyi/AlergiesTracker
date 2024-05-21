import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, TouchableRipple } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons"; // Потрібно встановити expo/vector-icons
import MyDrawer from "./MyDrawer";
import { useNavigation } from "@react-navigation/native";
import AddAllergyScreen from "./AddAllergyScreen";
import { useContext } from "react";
import lightTheme from "../themes/lightTheme";
import darkTheme from "../themes/darkTheme";
import ThemeContext from "../Context/ThemeContext";
import LanguageContext from "../Context/LanguageContext";

export default function HomeScreen() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const {language, toggleLanguage} = useContext(LanguageContext);
  const [userData, setUserData] = useState(null);
  const navigation = useNavigation();

  return (
    <>
      <MyDrawer />
      <View style={[styles.container, {backgroundColor:theme.backgroundColor}, {fontFamily:theme.font}]}>
        <TouchableRipple
          style={[styles.button, {backgroundColor:theme.buttonColor }]}
          onPress={() => navigation.navigate('AddAllergy')}
        >
          <Text style={[styles.buttonText, {color: theme.textColor}]}>{language === "ua" ? "Додати алергію" : "Add allergy"}</Text>
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
    
  },
});
