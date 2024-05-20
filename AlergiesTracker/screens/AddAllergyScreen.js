import * as React from "react";
import { Appbar, Drawer, Provider as PaperProvider } from "react-native-paper";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import Svg, { Path } from "react-native-svg";
import MyDrawer from "./MyDrawer";
import { Rect } from "react-native-svg";
import G from "react-native-svg";
import ProductsGrid from "../ProductsGrid";

export default AddAllergyScreeen = () => {
    const [showCategories, setShowCategories] = React.useState(false);
    const [chosenProducts, setChosenProducts] = React.useState([]);
    const toggleCategories = (product) => {
        setShowCategories(true);
        

    }
  return (
    <>
      <MyDrawer />
      <ScrollView style={styles.container}>
        <Text style={styles.text}>Додайте алерген</Text>
        <ProductsGrid oncklick={toggleCategories}/>
   
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: "#F4FFF5",
  },
  text: {
    fontSize: 22,
    fontWeight: "600", // fontWeight should be a string
    textAlign: "center", // To center the text
    marginVertical: 30, // Equivalent to `margin: 0` for vertical margin
    marginHorizontal: "auto", // This would be more accurately represented by flex properties
  },
  allProducts: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 30,
    marginBottom: 50,
    marginLeft:20

  },
  product: {
    width: 88,
    height: 110,
    borderRadius: 15,
    backgroundColor: "#E2FFE6",
    shadowColor: "rgba(0, 0, 0, 0.35)",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.35,
    shadowRadius: 15,
    // Elevation for Android
    elevation: 5,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",

  },

  name: {
    marginTop: 5,
    fontSize: 16,
  },
});
