import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { supabase } from "../lib/supabase";
import { AllergyContext } from "../Context/AllergyContext";
import { Language } from "@mui/icons-material";
import LanguageContext from "../Context/LanguageContext";
import ThemeContext from "../Context/ThemeContext";

const Categories = ({ products }) => {
  const { language, translate } = useContext(LanguageContext);
  const { theme } = useContext(ThemeContext);
  const navigation = useNavigation();
  const [selectedCategories, setSelectedCategories] = useState({});
  const [session, setSession] = useState(null);
  const { addId, resetIds } = useContext(AllergyContext);

  useEffect(() => {
    resetIds();

    async function fetchSession() {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (error) {
        console.error("Error fetching session:", error);
        return;
      }
      setSession(session);
    }

    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const saveSelectedProducts = async (selectedProducts) => {
    const userId = session.user.id;

    for (let product of selectedProducts) {
      const selectedSubcategories =
        selectedCategories[selectedProducts.indexOf(product)] || [];
      console.log(selectedCategories);

      // Вставка алергії для кожного продукту
      const { data, error } = await supabase
        .from("allergy")
        .insert([{ user_id: userId, name: product.name, dangerous: false }])
        .select("*") // Явно вказуємо, що потрібно повернути вставлені дані
        .single();

      if (error) {
        console.error("Error inserting allergy data:", error);
      } else {
        console.log("Allergy data inserted successfully:", data);
        const allergyId = data.id; // Отримуємо id алергії
        addId(allergyId);
        // Вставка підкатегорій для кожної алергії
        for (let subcategory of selectedSubcategories) {
          const { data: subcategoryData, error: subcategoryError } =
            await supabase
              .from("subcategories")
              .insert([{ name: subcategory, allergy_id: allergyId }])
              .select("*") // Явно вказуємо, що потрібно повернути вставлені дані
              .single();

          if (subcategoryError) {
            console.error(
              "Error inserting subcategory data:",
              subcategoryError
            );
          } else {
            console.log(
              "Subcategory data inserted successfully:",
              subcategoryData
            );
          }
        }
      }
    }
  };

  const handleSelectCategory = (itemIndex, category) => {
    setSelectedCategories((prevSelectedCategories) => {
      const newCategories = { ...prevSelectedCategories };
      if (!newCategories[itemIndex]) {
        newCategories[itemIndex] = [];
      }
      newCategories[itemIndex].push(category);
      return newCategories;
    });
  };

  const handleRemoveCategory = (itemIndex, category) => {
    setSelectedCategories((prevSelectedCategories) => {
      const newCategories = { ...prevSelectedCategories };
      newCategories[itemIndex] = newCategories[itemIndex].filter(
        (cat) => cat !== category
      );
      if (newCategories[itemIndex].length === 0) {
        delete newCategories[itemIndex];
      }
      return newCategories;
    });
  };

  return (
    <ScrollView
      style={[styles.scrollView, {backgroundColor: theme.backgroundColor}]}
      contentContainerStyle={styles.scrollViewContent}
    >
      <View style={[styles.container,  {backgroundColor: theme.backgroundColor}]}>
        <Text style={styles.t}>
          {language === "en" ? "Choose categories" : "Оберіть категорії"}
        </Text>
        {products &&
          products.map((item, itemIndex) => (
            <View key={itemIndex} style={styles.productContainer}>
              <View style={styles.product}>
                <item.svg />
                <Text style={styles.name}>
                  {" "}
                  {language === "en" ? translate(item.name) : item.name}
                </Text>
              </View>
              {item.subcategories && item.subcategories.length > 0 && (
                <View style={styles.choose}>
                  <View style={styles.categoriesContainer}>
                    <Text style={styles.title}>
                      {language === "en"
                        ? "Choose category"
                        : "Виберіть категорію"}
                    </Text>
                    {item.subcategories.map((category, categoryIndex) => (
                      <View key={categoryIndex} style={styles.categoryItem}>
                        <TouchableOpacity
                          onPress={() =>
                            handleSelectCategory(itemIndex, category)
                          }
                          disabled={
                            selectedCategories[itemIndex] &&
                            selectedCategories[itemIndex].includes(category)
                          }
                        >
                          <Text
                            style={[
                              styles.category,
                              selectedCategories[itemIndex] &&
                              selectedCategories[itemIndex].includes(category)
                                ? styles.selectedCategory
                                : null,
                            ]}
                          >
                            {language === "en"
                              ? translate(category)
                              : item.name}
                          </Text>
                        </TouchableOpacity>
                        {selectedCategories[itemIndex] &&
                          selectedCategories[itemIndex].includes(category) && (
                            <TouchableOpacity
                              onPress={() =>
                                handleRemoveCategory(itemIndex, category)
                              }
                            >
                              <Text style={styles.removeCategory}>
                                {language === "en" ? "Remove" : "Видалити"}
                              </Text>
                            </TouchableOpacity>
                          )}
                      </View>
                    ))}
                  </View>
                </View>
              )}
            </View>
          ))}
      </View>
      <Button
        style={[styles.button, {backgroundColor:theme.buttonColor}]}
        labelStyle={[styles.buttonLabel, {color: theme.textColor}]}
        onPress={() => {
          navigation.navigate("AddSymptoms");
          saveSelectedProducts(products);
        }}
      >
        {language === "en" ? "Go to symptoms" : "Перейти до симптомів"}
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: "#538A6B",
    paddingLeft: 25,
    paddingTop: 20,
  },
  scrollViewContent: {},
  container: {
    backgroundColor: "#538A6B",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 20,
    borderRadius: 15,
  },
  productContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: "900",
    marginBottom: 5,
  },
  t: {
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 5,
    color: "white",
    marginTop: 10,
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
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    marginTop: 8,
    fontSize: 16,
  },
  categoriesContainer: {
    flexDirection: "column",
    padding: 10,
    backgroundColor: "#E2FFE6",
    borderRadius: 10,
  },
  categoryItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  category: {
    fontSize: 14,
    color: "#333",
    marginRight: 10,
    padding: 5,
    borderRadius: 10,
    backgroundColor: "#E2FFE6",
  },
  selectedCategory: {
    backgroundColor: "#538A6B",
    color: "#fff",
  },
  removeCategory: {
    fontSize: 12,
    color: "#FF0000",
    marginLeft: 5,
  },
  choose: {
    marginLeft: 20,
    width: 250,
  },
  button: {
    padding: 10,
    backgroundColor: "#E2FFE6",
    fontSize: 20,
    marginBottom: 70,
    width: 300,
    alignSelf: "center",
    marginTop: 20,
  },
  buttonLabel: {
    fontSize: 20,
    color: "black", // Increase this value to make the text larger
  },
});

export default Categories;
