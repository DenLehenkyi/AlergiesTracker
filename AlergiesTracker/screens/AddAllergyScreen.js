import * as React from "react";
import { Appbar, Drawer, Provider as PaperProvider } from "react-native-paper";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import Svg, { Path } from "react-native-svg";
import MyDrawer from "./MyDrawer";
import { Rect } from "react-native-svg";
import { useContext, useRef } from "react";
import lightTheme from "../themes/lightTheme";
import darkTheme from "../themes/darkTheme";
import ThemeContext from "../Context/ThemeContext";
import ProductsGrid from "../components/ProductsGrid";
import Categories from "../components/Categories";

const AddAllergyScreen = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [showCategories, setShowCategories] = React.useState(false);
  const [chosenProducts, setChosenProducts] = React.useState([]);
  const categoriesScrollRef = useRef(null);

  const toggleCategories = (product) => {
    setChosenProducts((prevProducts) => {
      if (prevProducts.some((p) => p.name === product.name)) {
        return prevProducts.filter((p) => p.name !== product.name);
      }
      return [product,...prevProducts];
    });

    setShowCategories(true);

    // Scroll to the end of the categories when a new product is added
    setTimeout(() => {
      if (categoriesScrollRef.current) {
        categoriesScrollRef.current.scrollToEnd({ animated: true });
      }
    }, 100);
  };

  return (
    <>
      <MyDrawer />
      <ScrollView
        style={[styles.container, { backgroundColor: theme.backgroundColor }]}
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={[styles.text, { color: theme.textColor }]}>Додайте алерген</Text>
        <ProductsGrid oncklick={toggleCategories} selectedProducts={chosenProducts} />
      </ScrollView>
      {showCategories && (
        <Categories products={chosenProducts} ref={categoriesScrollRef} />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4FFF5",
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 40
  },
  text: {
    fontSize: 22,
    fontWeight: "600", // fontWeight should be a string
    textAlign: "center", // To center the text
    marginVertical: 30, // Equivalent to `margin: 0` for vertical margin
  },
  allProducts: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 30,
    marginBottom: 50,
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

export default AddAllergyScreen;
