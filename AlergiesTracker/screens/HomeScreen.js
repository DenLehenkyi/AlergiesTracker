import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons"; // Потрібно встановити expo/vector-icons
import MyDrawer from "./MyDrawer";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  const [userData, setUserData] = useState(null);
  const navigation = useNavigation();


  return (
    <>
    <MyDrawer></MyDrawer>
    <Button   onPress={() => navigation.navigate('AddAllergy')} >Додати алергію</Button>
    </>
   
  );
}


