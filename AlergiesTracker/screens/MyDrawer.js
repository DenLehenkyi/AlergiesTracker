import * as React from 'react';
import { Appbar, Drawer, Provider as PaperProvider } from 'react-native-paper';
import { View, Text } from 'react-native';

const MyDrawer = () => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <PaperProvider>
      <Appbar.Header>
        <Appbar.Action icon="menu" onPress={toggleDrawer} />
        <Appbar.Content title="Alergies Tracker" />
      </Appbar.Header>
      <Drawer.Section title="Menu" visible={drawerOpen} style={{ width: drawerOpen ? 250 : 0 }}>
        <Drawer.Item label="Item 1" onPress={() => {}} />
        <Drawer.Item label="Item 2" onPress={() => {}} />
        <Drawer.Item label="Item 3" onPress={() => {}} />
      </Drawer.Section>
    </PaperProvider>
  );
};

export default MyDrawer;
