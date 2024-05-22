import React, { useState, useEffect, useContext, useCallback } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { TouchableRipple } from "react-native-paper";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { supabase } from "../lib/supabase";
import MyDrawer from "./MyDrawer";
import ThemeContext from "../Context/ThemeContext";
import LanguageContext from "../Context/LanguageContext";

export default function HomeScreen() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { language, translate } = useContext(LanguageContext);
  const [allergies, setAllergies] = useState([]);
  const [symptoms, setSymptoms] = useState({});
  const [subcategories, setSubcategories] = useState({});
  const [session, setSession] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
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

  const userId = session ? session.user.id : null;

  const fetchAllData = useCallback(async () => {
    if (!userId) return;

    try {
      // Fetch allergies
      const { data: allergiesData, error: allergiesError } = await supabase
        .from("allergy")
        .select("*")
        .eq("user_id", userId);
      if (allergiesError) throw allergiesError;

      setAllergies(allergiesData);

      const symptomsData = {};
      const subcategoriesData = {};

      for (const allergy of allergiesData) {
        // Fetch symptoms
        const { data: symptomsRes, error: symptomsError } = await supabase
          .from("symptom")
          .select("name")
          .eq("allergy_id", allergy.id);
        if (symptomsError) throw symptomsError;
        symptomsData[allergy.id] = symptomsRes.map((symptom) => symptom.name);

        // Fetch subcategories
        const { data: subcategoriesRes, error: subcategoriesError } =
          await supabase
            .from("subcategories")
            .select("name")
            .eq("allergy_id", allergy.id);
        if (subcategoriesError) throw subcategoriesError;
        subcategoriesData[allergy.id] = subcategoriesRes.map(
          (subcategory) => subcategory.name
        );
      }

      setSymptoms(symptomsData);
      setSubcategories(subcategoriesData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [userId]);

  useFocusEffect(
    useCallback(() => {
      fetchAllData();
    }, [fetchAllData])
  );

  // Function to handle adding new allergy
  const handleAddAllergy = async (newAllergy) => {
    try {
      // Add new allergy to the database
      const { data: insertedData, error } = await supabase
        .from("allergy")
        .insert([newAllergy]);
      if (error) {
        console.error("Error adding allergy:", error);
        return;
      }
  
      // Fetch updated data for symptoms and subcategories after the new allergy is added
      await fetchAllData();
    } catch (error) {
      console.error("Error adding allergy:", error);
    }
  };
  

  const renderAllergyItem = ({ item }) => (
    <View style={[styles.allergyItem, item.dangerous && styles.dangerousItem]}>
      <Text style={[styles.allergyName, { color: theme.blackColor }]}>
        {language === "ua" ? "Алергія:" : "Allergy:"} {item.name}
      </Text>
      {item.dangerous && (
        <Text style={[styles.dangerousText, { color: "red" }]}>
          {language === "ua" ? "Небезпечно!" : "Dangerous!"}
        </Text>
      )}
      <Text style={[styles.subcategories, { color: theme.blackColor }]}>
        {language === "ua" ? "Підкатегорії:" : "Subcategories:"}{" "}
        {subcategories[item.id] && subcategories[item.id].length > 0
          ? subcategories[item.id]
              .map((subcategory) => translate(subcategory))
              .join(", ")
          : translate("noSubcategories")}
      </Text>
      <Text style={[styles.subcategories, { color: theme.blackColor }]}>
        {translate("symptoms")}:{" "}
        {symptoms[item.id] && symptoms[item.id].length > 0
          ? symptoms[item.id].map((symptom) => translate(symptom)).join(", ")
          : translate("noSymptoms")}
      </Text>
    </View>
  );

  return (
    <>
      <MyDrawer />
   
      <View
        style={[
          styles.container,
          { backgroundColor: theme.backgroundColor },
          { fontFamily: theme.font },
        ]}
      >
        
        <TouchableRipple
          style={[styles.button, { backgroundColor: theme.buttonColor }]}
          onPress={() => navigation.navigate("AddAllergy")}
        >
          <Text style={[styles.buttonText, { color: theme.textColor }]}>
          {language === 'en' ? 'Add alergy' : "Додати алергію"}
          </Text>
        </TouchableRipple>
        <View
          style={[
            styles.allergiesContainer,
            { backgroundColor: theme.backgroundColor },
          ]}
        >
             
          <Text style={[styles.sectionTitle, { color: theme.textColor }]}>
          {language === 'en' ? 'My allergies' : "Мої алергії"}
          </Text>
          <FlatList
            data={allergies}
            renderItem={renderAllergyItem}
            keyExtractor={(item) => item.id.toString()}
          />
       
        </View>

      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  button: {
    backgroundColor: "#8BDBAD",
    width: 250,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    marginTop: 20,
    alignSelf: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  allergiesContainer: {
    marginTop: 20,

    borderColor: "#white",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  listContent: {
    paddingBottom: 20,
  },
  allergyItem: {
    backgroundColor: "#e2ffe6",
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    elevation: 2,
  },
  allergyName: {
    fontWeight: "bold",
    fontSize: 18,
  },
  subcategories: {
    fontSize: 16,
    fontStyle: "italic",
  },
  symptoms: {
    fontSize: 16,
  },
  dangerousItem: {
    borderColor: "red",
    borderWidth: 2,
  },
  dangerousText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "red",
  },
});
