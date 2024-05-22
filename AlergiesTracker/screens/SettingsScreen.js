import React, { useState, useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import { List, Switch, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import lightTheme from "../themes/lightTheme";
import darkTheme from "../themes/darkTheme";
import ThemeContext from "../Context/ThemeContext";
import { Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";
import LanguageContext from "../Context/LanguageContext";

const SettingsScreen = () => {
  const [session, setSession] = useState(Session);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { language, toggleLanguage } = useContext(LanguageContext);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const navigation = useNavigation();

  //const toggleTheme = () => setIsDarkTheme(!isDarkTheme);

  const toggleMute = () => setIsMuted(!isMuted);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigation.navigate("Login");
  };

  return (
    <View
      style={[styles.mainContainer, { backgroundColor: theme.backgroundColor }]}
    >
      <View style={[styles.container, { backgroundColor: theme.lightGreen }]}>
        <List.Section>
          {/* <List.Subheader style={{ color: theme.textColor }}>
            {language === "ua" ? "Налаштування" : "Settings"}
          </List.Subheader> */}
          <List.Item
            title={language === "ua" ? "Змінити мову" : "Change Language"}
            titleStyle={[styles.title, { color: theme.textColor }]}
            right={() => (
              <Button
                labelStyle={[styles.buttonText, { color: theme.textColor }]}
                style={[styles.button, { backgroundColor: theme.buttonColor }]}
                mode="contained"
                onPress={toggleLanguage}
              >
                {language === "ua" ? "Змінити" : "Change"}
              </Button>
            )}
          />
          <List.Item
            title={language === "ua" ? "Чорна тема" : "Dark Theme"}
            titleStyle={[styles.title, { color: theme.textColor }]}
            right={() => (
              <Switch
                value={theme === darkTheme}
                thumbColor={isMuted ? "#ffffff" : "#000000"}
                trackColor={{ false: "#767577", true: "green" }}
                onValueChange={toggleTheme}
              />
            )}
          />
          <List.Item
            title={language === "ua" ? "Вимкнути звук" : "Mute"}
            titleStyle={[styles.title, { color: theme.textColor }]}
            right={() => (
              <Switch
                value={isMuted}
                thumbColor={isMuted ? "#ffffff" : "#000000"}
                trackColor={{ false: "green", true: "green" }}
                onValueChange={toggleMute}
              />
            )}
          />
          <List.Item
            title={language === "ua" ? "Вийти" : "Logout"}
            titleStyle={[styles.title, { color: theme.textColor }]}
            right={() => (
              <Button
                style={[styles.button, { backgroundColor: theme.buttonColor }]}
                labelStyle={[styles.buttonText, { color: theme.textColor }]}
                mode="contained"
                onPress={handleLogout}
              >
                {language === "ua" ? "Вийти" : "Logout"}
              </Button>
            )}
          />
        </List.Section>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#78C599",
  },
  container: {
    alignItems: "center",
    padding: 20,
    height: 500,
    width: 370,
    borderRadius: 35,
    elevation: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    justifyContent: "center",
    backgroundColor: "#E2FFE6",
  },
  button: {
    backgroundColor: "#8BDBAD",
    marginLeft: 40,
  },
  buttonText: {
    color: "black",
    fontSize: 18,
  },
  title: {
    fontWeight: "600",
    fontSize: 20,
  },
});

export default SettingsScreen;
