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
import { Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";

export default function HomeScreen() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [userData, setUserData] = useState(null);
  const navigation = useNavigation();
  const [allergies, setAllergies] = useState([]);
  const [session, setSession] = useState(Session);

  useEffect(() => {
    async function fetchSession() {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Error fetching session:", error);
        return;
      }
      setSession(session);
    }

    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  console.log(session)
  
  const userId = session ? session.user.id : null;

  useEffect(() => {
    async function fetchAllergies() {
      try {
        if (!userId) {
          return; // Нічого не робимо, якщо user_id недоступний
        }
  
        const { data, error } = await supabase
          .from("allergy")
          .select("*")
          .eq("user_id", userId);
        if (error) {
          throw error;
        }
        setAllergies(data);
      } catch (error) {
        console.error("Error fetching allergies:", error);
      }
    }
  
    fetchAllergies();
  }, [userId]);


  return (
    <>
      <MyDrawer />
      <View style={[styles.container, {backgroundColor:theme.backgroundColor}, {fontFamily:theme.font}]}>
      <View style={styles.allergiesContainer}>
        <Text style={styles.sectionTitle}>Ваші алергії</Text>
        {allergies.map((userAllergy, index) => (
          <View key={index} style={styles.allergy}>
            <Text style={styles.allergyName}>Алергія: {userAllergy.name}</Text>
            {/* <Text style={styles.subcategories}>Підвиди: {userAllergy.subcategories.join(', ')}</Text>
            <Text style={styles.symptoms}>Симптоми: {userAllergy.symptoms.join(', ')}</Text> */}
          </View>
        ))}
      </View>


        <TouchableRipple
          style={[styles.button, {backgroundColor:theme.buttonColor }]}
          onPress={() => navigation.navigate('AddAllergy')}
        >
          <Text style={[styles.buttonText, {color: theme.textColor}]}>Додати алергію</Text>
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
  allergiesContainer: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  allergy: {
    marginBottom: 10,
  },
  allergyName: {
    fontWeight: "bold",
    fontSize: 18,
  },
  subcategories: {
    fontSize: 16,
    fontStyle: "italic",
  },
  symptoms: {
    fontSize: 16,
  },
});