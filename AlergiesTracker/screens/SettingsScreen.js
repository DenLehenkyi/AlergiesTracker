import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { List, Switch, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const SettingsScreen = () => {
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const navigation = useNavigation();

    const toggleTheme = () => setIsDarkTheme(!isDarkTheme);
    const toggleMute = () => setIsMuted(!isMuted);

    const handleLogout = () => {
        // Implement your logout logic here
        navigation.navigate('Login'); // Assuming you have a Login screen
    };

    return (
        <View style={styles.container}>
            <List.Section>
                <List.Subheader>Налаштування</List.Subheader>
                <List.Item
                    title="Змінити мову"
                    right={() => <Button mode="contained" onPress={() => { /* Implement language change logic */ }}>Change</Button>}
                />
                <List.Item
                    title="Чорна тема"
                    right={() => <Switch value={isDarkTheme} onValueChange={toggleTheme} />}
                />
                <List.Item
                    title="Вимкнути звук"
                    right={() => <Switch value={isMuted} onValueChange={toggleMute} />}
                />
                <List.Item
                    title="Вийти"
                    right={() => <Button mode="contained" onPress={handleLogout}>Вийти</Button>}
                />
            </List.Section>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    
});

export default SettingsScreen;
