import * as React from "react";
import { useEffect, useState } from "react";
import { Appearance, AppearanceProvider } from 'react-native'; // Import from 'react-native' for Expo or 'react-native-appearance' for bare React Native
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import GlobalFont from 'react-native-global-font';
import AddAllergyScreen from "./screens/AddAllergyScreen";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import SettingsScreen from "./screens/SettingsScreen";
import ProfileScreen from "./screens/ProfileScreen";
import { View, StyleSheet } from 'react-native';
import { ThemeProvider } from '@rneui/themed';
import { createTheme } from "@rneui/themed";

const Stack = createStackNavigator();

const lightTheme = createTheme({
  colors: {
    primary: 'white',
    // Add other colors here
  },
  components: {
    Button: {
      raised: true,
    },
  },
});

// Create a dark theme
const darkTheme = createTheme({
  colors: {
    primary: 'black',
    // Add other colors here
  },
  components: {
    Button: {
      raised: true,
    },
  },
});

function App() {
  const [theme, setTheme] = useState(Appearance.getColorScheme() === 'dark' ? darkTheme : lightTheme);

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme === 'dark' ? darkTheme : lightTheme);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen name="AddAllergy" component={AddAllergyScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}

export default App;
