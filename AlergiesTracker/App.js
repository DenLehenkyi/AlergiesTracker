import * as React from "react";
import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import GlobalFont from 'react-native-global-font';
import AddAllergyScreen from "./screens/AddAllergyScreen";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import SettingsScreen from "./screens/SettingsScreen";
import ProfileScreen from "./screens/ProfileScreen";

const Stack = createStackNavigator();

function App() {
  useEffect(() => {
    let fontName = 'Comfortaa-Regular';
    GlobalFont.applyGlobal(fontName);
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="AddAllergy" component={AddAllergyScreen} />
        {/* <Stack.Screen name="AllergyDetail" component={AllergyDetailScreen} />  */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
