import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { List, Switch, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "@rneui/themed";
import { useContext } from "react";
import lightTheme from "../themes/lightTheme";
import darkTheme from "../themes/darkTheme";
import ThemeContext from "../Context/ThemeContext";

const SettingsScreen = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
 
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const navigation = useNavigation();

  //const toggleTheme = () => setIsDarkTheme(!isDarkTheme);

  const toggleMute = () => setIsMuted(!isMuted);

  const handleLogout = () => {
    // Implement your logout logic here
    navigation.navigate("Login"); // Assuming you have a Login screen
  };

  return (
    <View
      style={[styles.mainContainer, { backgroundColor: theme.backgroundColor }]}
    >
      <View style={[styles.container, { backgroundColor: theme.lightGreen }]}>
        <List.Section>
          <List.Subheader style={{ color: theme.textColor }}>
            Налаштування
          </List.Subheader>
          <List.Item
            title="Змінити мову"
            titleStyle={[styles.title, { color: theme.textColor }]}
            right={() => (
              <Button
                labelStyle={[styles.buttonText, { color: theme.textColor }]}
                style={[styles.button, { backgroundColor: theme.buttonColor }]}
                mode="contained"
                onPress={() => {
                  /* Implement language change logic */
                }}
              >
                Змінити
              </Button>
            )}
          />
          <List.Item
            title="Чорна тема"
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
            title="Вимкнути звук"
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
            title="Вийти"
            titleStyle={[styles.title, { color: theme.textColor }]}
            right={() => (
              <Button
                style={[styles.button, { backgroundColor: theme.buttonColor }]}
                labelStyle={[styles.buttonText, { color: theme.textColor }]}
                mode="contained"
                onPress={handleLogout}
              >
                Вийти
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
    fontWeight: 600,
    fontSize: 20,
  },
});

export default SettingsScreen;
