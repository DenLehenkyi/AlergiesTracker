import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons"; // Потрібно встановити expo/vector-icons
import MyDrawer from "./MyDrawer";

export default function HomeScreen() {
  const [userData, setUserData] = useState(null);



  return (
    
    <MyDrawer></MyDrawer>
   
  );
}


