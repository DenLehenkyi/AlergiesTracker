// Menu.js
import React from 'react';
import { View, Text, Button } from 'react-native';

const Menu = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Меню</Text>
      <Button
        onPress={() => navigation.navigate('Home')}
        title="Перейти на домашню сторінку"
      />
    </View>
  );
};

export default Menu;
