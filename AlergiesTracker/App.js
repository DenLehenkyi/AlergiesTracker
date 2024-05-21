import * as React from "react";
import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ThemeProvider } from "./Context/ThemeContext";
import AddAllergyScreen from "./screens/AddAllergyScreen";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import SettingsScreen from "./screens/SettingsScreen";
import ProfileScreen from "./screens/ProfileScreen";
import AddSymptomsScreen from "./screens/AddSymptomsScreen";
import { supabase } from "./lib/supabase";
import { Session } from '@supabase/supabase-js'

const Stack = createStackNavigator();

function App() {
  const [session, setSession] = useState(Session );

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

  // console.log(session);


  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={session ? "Home" : "Login"}>
        {/* <Stack.Navigator> */}
          <Stack.Screen name="Login" component={LoginScreen}  />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen name="AddAllergy" component={AddAllergyScreen} />
          <Stack.Screen name="AddSymptoms" component={AddSymptomsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}

export default App;
