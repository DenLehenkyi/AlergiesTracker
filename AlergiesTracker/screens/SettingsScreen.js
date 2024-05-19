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
                    titleStyle={styles.title}
                    right={() => <Button labelStyle={styles.buttonText} style={styles.button} mode="contained" onPress={() => { /* Implement language change logic */ }}>Змінити</Button>}
                />
                <List.Item
                    title="Чорна тема"
                    titleStyle={styles.title}
                    right={() => <Switch value={isDarkTheme} color='#E2FFE6' onValueChange={toggleTheme} />}
                />
                <List.Item
                    title="Вимкнути звук"
                    titleStyle={styles.title}
                    right={() => <Switch value={isMuted} color='#E2FFE6' onValueChange={toggleMute} />}
                />
                <List.Item
                    title="Вийти"
                    titleStyle={styles.title}
                    right={() => <Button style={styles.button} labelStyle={styles.buttonText} mode="contained" onPress={handleLogout}>Вийти</Button>}
                />
            </List.Section>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#78C599',
    },
    button: {
        backgroundColor: '#E2FFE6',
    },
    buttonText: {
        color: 'black',
        fontSize: 18
    },
    title:{
      fontWeight: 600,
      fontSize: 20,


    }
});

export default SettingsScreen;
