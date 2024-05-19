import React, { useState } from 'react';
import { View, Text, Switch, Button } from 'react-native';



export default function SettingsScreen({ navigation }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);

  const handleLogout = () => {
    // Логіка для виходу з облікового запису
    navigation.navigate('Login');
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Dark Mode</Text>
      <Switch value={isDarkMode} onValueChange={setIsDarkMode} />
      <Text>Sound</Text>
      <Switch value={isSoundEnabled} onValueChange={setIsSoundEnabled} />
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}
