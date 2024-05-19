import * as React from 'react';
import { Appbar, Drawer, Provider as PaperProvider } from 'react-native-paper';
import styled from 'styled-components/native';

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
      {drawerOpen && (
        <StyledDrawerSection>
          <StyledDrawerItem 
            label="Головна" 
            onPress={() => {}} 
            titleStyle={styledTitle}
          />
          <StyledDrawerItem 
            label="Обліковий запис" 
            onPress={() => {}} 
            titleStyle={styledTitle}
          />
          <StyledDrawerItem 
            label="Налаштування" 
            onPress={() => {}} 
            titleStyle={styledTitle}
          />
        </StyledDrawerSection>
      )}
    </PaperProvider>
  );
};

// Styled components using styled-components library
const StyledDrawerSection = styled(Drawer.Section)`
  width: 300px;
  background-color: #78C599;
  z-index:5
`;

const StyledDrawerItem = styled(Drawer.Item)`
  width: 253px;
  background-color: #E2FFE6;
  margin-top: 15px;
  border-radius: 10px;
  text-align: center;
`;

const styledTitle = {
  fontSize: 12,
  color: '#333',
  textAlign: 'right',
};

export default MyDrawer;