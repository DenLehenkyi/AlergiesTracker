import React, { useState, useEffect, useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import MyDrawer from "./MyDrawer";
import ThemeContext from "../Context/ThemeContext";
import { supabase } from "../lib/supabase"; // Adjust the path according to your project structure
import { Session } from "@supabase/supabase-js";import LanguageContext from "../Context/LanguageContext";

export default function ProfileScreen() {
  const { theme } = useContext(ThemeContext);
  const {language, toggleLanguage} = useContext(LanguageContext);
  const [userData, setUserData] = useState(null);
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

  useEffect(() => {
    const fetchUserData = async () => {
      if (session && session.user) {
        const { data, error } = await supabase
          .from("profiles")
          .select("username, full_name")
          .eq("id", session.user.id)
          .single();
        if (data) {
          setUserData(data);
        } else if (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, [session]);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      setUserData(null);
      setSession(null);
    } else {
      console.error("Error logging out:", error);
    }
  };

  return (
    <>
      <MyDrawer />
      <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
        {userData ? (
          <View style={[styles.userDataContainer, { backgroundColor: theme.lightGreen }]}>
            <MaterialIcons name="person" size={50} color={theme.textColor} style={styles.icon} />
            <View style={styles.userInfoField}>
              <Text style={[styles.fieldLabel, { color: theme.buttonColor }]}>{language === "ua" ? "Пошта:" : "Email"}</Text>
              <Text style={[styles.fieldValue, { color: theme.textColor }]}>{userData.username}</Text>
            </View>
            <View style={styles.userInfoField}>
              <Text style={[styles.fieldLabel, { color: theme.buttonColor }]}>{language === "ua" ? "Ім'я:" : "Name"}</Text>
              <Text style={[styles.fieldValue, { color: theme.textColor }]}>{userData.username}</Text>
            </View>
            <View style={styles.userInfoField}>
              <Text style={[styles.fieldLabel, { color: theme.buttonColor }]}>{language === "ua" ? "Прізвище" : "Surname"}</Text>
              <Text style={[styles.fieldValue, { color: theme.textColor }]}>{userData.full_name}</Text>
            </View>
            <TouchableOpacity
              onPress={handleLogout}
              style={[styles.button, { backgroundColor: theme.buttonColor }]}
            >
              <Text style={[styles.buttonText, { color: theme.textColor }]}>{language === "ua" ? "Вийти з акаунту" : "Logout"}</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Text style={{ color: theme.textColor }}>Немає даних про користувача</Text>
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
    width:370,
    borderRadius: 35,
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
