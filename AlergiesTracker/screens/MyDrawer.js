import * as React from "react";
import { Appbar, Drawer, Provider as PaperProvider } from "react-native-paper";
import { StyleSheet, View, Text } from "react-native";
import Svg, { Path } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { useContext } from "react";
import lightTheme from "../themes/lightTheme";
import darkTheme from "../themes/darkTheme";
import ThemeContext from "../Context/ThemeContext";
import LanguageContext from "../Context/LanguageContext";

const MyDrawer = ({ loadTheme, saveTheme }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { language, toggleLanguage } = useContext(LanguageContext);

  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const navigation = useNavigation();

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <View style={{ marginTop: -48 }}>
      <Appbar.Header
        style={[styles.header, { backgroundColor: theme.backgroundColor }]}
        elevation={0}
      >
        <Appbar.Action
          icon="menu"
          onPress={toggleDrawer}
          color={theme.textColor}
        />
        <Appbar.Content title="Alergies Tracker" color={theme.textColor} />
      </Appbar.Header>
      {drawerOpen && (
        <View
          style={[
            styles.drawerSection,
            { backgroundColor: theme.backgroundColor },
          ]}
        >
          <Drawer.Item
            label={language === "ua" ? "Головна" : "Home"}
            onPress={() => {
              setDrawerOpen(false);
              navigation.navigate("Home");
            }}
            style={styles.drawerItem}
            labelStyle={{ color: theme.textColor }}
            icon={() => (
              <MaterialIcons
                name="home"
                size={30}
                color="black"
                style={styles.icon}
              />
            )}
          />

          <Drawer.Item
            label={language === "ua" ? "Обліковий запис" : "Account"}
            onPress={() => navigation.navigate("Profile")}
            style={styles.drawerItem}
            icon={() => (
              <MaterialIcons
                name="person"
                size={30}
                color="black"
                style={styles.icon}
              />
            )}
          />

          <Drawer.Item
            label={language === "ua" ? "Налаштування" : "Settings"}
            onPress={() => navigation.navigate("Settings")}
            style={styles.drawerItem}
            icon={() => (
              <MaterialIcons
                name="settings"
                size={30}
                color="black"
                style={styles.icon}
              />
            )}
          />
        </View>
      )}
    </View>
  );
};

const SvgIcon = ({ icon }) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path d={icon} fill="#000000" />
  </Svg>
);
const styles = StyleSheet.create({
  drawerSection: {
    width: 300,
    height: 1000,
    backgroundColor: "#78c599",
    zIndex: 15,
  },
  header: {
    marginTop: 0,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  drawerItem: {
    width: 253,
    backgroundColor: "#e2ffe6",
    marginTop: 15,
    borderRadius: 10,
    zIndex: 15,
  },
  drawerItemContent: {
    flexDirection: "row-reverse",
    alignItems: "center",
  },
  textWrapper: {
    flex: 1,
  },
  drawerItemLabel: {
    fontSize: 12,
    color: "#333",
    textAlign: "right",
  },
  svgIcon: {
    marginTop: 27,
    marginLeft: 17,
    position: "absolute",
  },
  svgWrapper: {
    position: "absolute",
  },
});

export default MyDrawer;
