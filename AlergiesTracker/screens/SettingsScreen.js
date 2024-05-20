import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { List, Switch, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "@rneui/themed";

const SettingsScreen = () => {
  const { theme,lightTheme, darkTheme, updateTheme } = useTheme();

  const [isMuted, setIsMuted] = useState(false);
  const navigation = useNavigation();

  const toggleTheme = () =>
    updateTheme(theme === lightTheme ? darkTheme : lightTheme);
  
  
  const toggleMute = () => setIsMuted(!isMuted);

  const handleLogout = () => {
    // Implement your logout logic here
    navigation.navigate("Login"); // Assuming you have a Login screen
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <List.Section>
          <List.Subheader>Налаштування</List.Subheader>
          <List.Item
            title="Змінити мову"
            titleStyle={styles.title}
            right={() => (
              <Button
                labelStyle={styles.buttonText}
                style={styles.button}
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
            titleStyle={styles.title}
            right={() => (
                <Switch
                value={theme === darkTheme}
                color="#8BDBAD"
                onValueChange={toggleTheme}
              />
              
            )}
          />
          <List.Item
            title="Вимкнути звук"
            titleStyle={styles.title}
            right={() => (
              <Switch
                value={isMuted}
                color="#8BDBAD"
                onValueChange={toggleMute}
              />
            )}
          />
          <List.Item
            title="Вийти"
            titleStyle={styles.title}
            right={() => (
              <Button
                style={styles.button}
                labelStyle={styles.buttonText}
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
    backgroundColor: "#fff",
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
