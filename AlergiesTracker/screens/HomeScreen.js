import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, FlatList, ScrollView } from "react-native";
import { TouchableRipple } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { supabase } from "../lib/supabase";
import MyDrawer from "./MyDrawer";
import ThemeContext from "../Context/ThemeContext";
import LanguageContext from "../Context/LanguageContext";

export default function HomeScreen() {
  const { theme } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);
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

  useEffect(() => {
    async function fetchAllergies() {
      if (!userId) return;

      try {
        const { data, error } = await supabase
          .from("allergy")
          .select("*")
          .eq("user_id", userId);
        if (error) {
          throw error;
        }
        setAllergies(data);
      } catch (error) {
        console.error("Error fetching allergies:", error);
      }
    }

    fetchAllergies();
  }, [userId]);

  useEffect(() => {
    async function fetchSymptoms() {
      if (!allergies.length) return;

      const symptomsData = {};

      for (const allergy of allergies) {
        try {
          const { data, error } = await supabase
            .from("symptom")
            .select("name")
            .eq("allergy_id", allergy.id);
          if (error) {
            throw error;
          }
          symptomsData[allergy.id] = data.map((symptom) => symptom.name);
        } catch (error) {
          console.error("Error fetching symptoms:", error);
          symptomsData[allergy.id] = [];
        }
      }

      setSymptoms(symptomsData);
    }

    fetchSymptoms();
  }, [allergies]);

  useEffect(() => {
    async function fetchSubcategories() {
      if (!allergies.length) return;

      const subcategoriesData = {};

      for (const allergy of allergies) {
        try {
          const { data, error } = await supabase
            .from("subcategories")
            .select("name")
            .eq("allergy_id", allergy.id);
          if (error) {
            throw error;
          }
          subcategoriesData[allergy.id] = data.map(
            (subcategory) => subcategory.name
          );
        } catch (error) {
          console.error("Error fetching subcategories:", error);
          subcategoriesData[allergy.id] = [];
        }
      }

      setSubcategories(subcategoriesData);
    }

    fetchSubcategories();
  }, [allergies]);

  const renderAllergyItem = ({ item }) => (
    <View style={styles.allergyItem}>
      <Text style={[styles.allergyName, { color: theme.textColor }]}>
        {language === "ua" ? "Алергія:" : "Allergy:"} {item.name}
      </Text>
      <Text style={[styles.subcategories, { color: theme.textColor }]}>
        {language === "ua" ? "Підкатегорії:" : "Subcategories:"}{" "}
        {subcategories[item.id] && subcategories[item.id].length > 0
          ? subcategories[item.id].join(", ")
          : language === "ua"
          ? "Немає підкатегорій"
          : "No subcategories"}
      </Text>
      <Text style={[styles.subcategories, { color: theme.textColor }]}>
        {language === "ua" ? "Симптоми:" : "Symptoms:"}{" "}
        {symptoms[item.id] && symptoms[item.id].length > 0
          ? symptoms[item.id].join(", ")
          : language === "ua"
          ? "Немає симптомів"
          : "No symptoms"}
      </Text>
    </View>
  );

  return (
    <>
      <MyDrawer />
      <ScrollView>
        <View
          style={[
            styles.container,
            { backgroundColor: theme.backgroundColor },
            { fontFamily: theme.font },
          ]}
        >
          <View style={styles.allergiesContainer}>
            <Text style={[styles.sectionTitle, { color: theme.textColor }]}>
              {language === "ua" ? "Ваші алергії" : "Your Allergies"}
            </Text>
            <FlatList
              data={allergies}
              renderItem={renderAllergyItem}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>

          <TouchableRipple
            style={[styles.button, { backgroundColor: theme.buttonColor }]}
            onPress={() => navigation.navigate("AddAllergy")}
          >
            <Text style={[styles.buttonText, { color: theme.textColor }]}>
              {language === "ua" ? "Додати алергію" : "Add allergy"}
            </Text>
          </TouchableRipple>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  allergiesContainer: {
    marginTop: 20,
    width: "100%",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  allergyItem: {
    backgroundColor: "#E2FFE6",
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
});
