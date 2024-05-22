import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  Button,
} from "react-native";
import { supabase } from "../lib/supabase";
import { AllergyContext } from "../Context/AllergyContext";
import EggSvg from "../assets/svgs/egg";
import NutsSvg from "../assets/svgs/nuts";
import ZernoSvg from "../assets/svgs/zerno";
import FishSvg from "../assets/svgs/fish";
import ChocolateSvg from "../assets/svgs/chocolate";
import VegetablesSvg from "../assets/svgs/vegetables";
import FruitsSvg from "../assets/svgs/fruits";
import HoneySvg from "../assets/svgs/honey";
import PylokSvg from "../assets/svgs/pylok";
import AnimalsSvg from "../assets/svgs/animals";
import KlishchiSvg from "../assets/svgs/klishchi";
import PlisniavaSvg from "../assets/svgs/plisniava";
import InsectsSvg from "../assets/svgs/insects";
import DrugsSvgs from "../assets/svgs/drugs";
import { useNavigation } from "@react-navigation/native";
import ThemeContext from "../Context/ThemeContext";
import LanguageContext from "../Context/LanguageContext";

const ProductsArray = [
  { name: "Яйця", svg: EggSvg, subcategories: ["Білок", "Жовток"] },
  {
    name: "Горіхи",
    svg: NutsSvg,
    subcategories: ["Мигдаль", "Фундук", "Грецький горіх", "Арахіс"],
  },
  {
    name: "Зернові",
    svg: ZernoSvg,
    subcategories: ["Пшениця", "Жито", "Ячмінь"],
  },
  {
    name: "Море-продукти",
    svg: FishSvg,
    subcategories: ["Риба", "Креветки", "Мідії"],
  },
  {
    name: "Шоколад",
    svg: ChocolateSvg,
    subcategories: ["Темний шоколад", "Молочний шоколад"],
  },
  {
    name: "Овочі",
    svg: VegetablesSvg,
    subcategories: ["Морква", "Картопля", "Буряк"],
  },
  {
    name: "Фрукти",
    svg: FruitsSvg,
    subcategories: ["Яблука", "Банани", "Цитрусові"],
  },
  { name: "Мед", svg: HoneySvg, subcategories: [] },
  { name: "Пилок", svg: PylokSvg, subcategories: [] },
  { name: "Шерсть тварин", svg: AnimalsSvg, subcategories: ["Коти", "Собаки"] },
  { name: "Кліщі", svg: KlishchiSvg, subcategories: [] },
  { name: "Пліснява", svg: PlisniavaSvg, subcategories: [] },
  { name: "Комахи", svg: InsectsSvg, subcategories: ["Бджоли", "Оси"] },
  { name: "Пеніцилін", svg: DrugsSvgs, subcategories: [] },
];

const symptomsArray = [
  { id: 1, name: "Нежить" },
  { id: 2, name: "Чхання" },
  { id: 3, name: "Свербіж очей" },
  { id: 4, name: "Сльозотеча" },
  { id: 5, name: "Закладеність носа" },
  { id: 6, name: "Кашель" },
  { id: 7, name: "Свербіж в горлі" },
  { id: 8, name: "Кропив'янка" },
  { id: 9, name: "Висип" },
  { id: 10, name: "Свербіж шкіри" },
  { id: 11, name: "Задишка" },
  { id: 12, name: "Хрипи" },
  { id: 13, name: "Набряк обличчя" },
  { id: 14, name: "Набряк губ" },
  { id: 15, name: "Набряк язика" },
  { id: 16, name: "Біль у животі" },
  { id: 17, name: "Нудота" },
  { id: 18, name: "Блювання" },
  { id: 19, name: "Діарея" },
  { id: 20, name: "Червоні плями на шкірі" },
];

const AddSymptomsScreen = () => {
  const { theme } = useContext(ThemeContext);
  const { language, translate } = useContext(LanguageContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [session, setSession] = useState(null);
  const { selectedIds } = useContext(AllergyContext);
  const [allergies, setAllergies] = useState([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState({});
  const [currentAllergy, setCurrentAllergy] = useState(null);
  const [dangerousAllergens, setDangerousAllergens] = useState([]);
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

  useEffect(() => {
    async function fetchAllergies() {
      const { data, error } = await supabase
        .from("allergy")
        .select("*") // Вибрати всі поля алергії
        .in("id", selectedIds);
      if (error) {
        console.error("Error fetching allergies:", error);
        return;
      }
      setAllergies(data);
    }

    fetchAllergies();
  }, [selectedIds]);

  const handleSelectSymptom = (symptom) => {
    setSelectedSymptoms((prevSelectedSymptoms) => {
      const allergySymptoms = prevSelectedSymptoms[currentAllergy] || [];
      if (allergySymptoms.some((s) => s.id === symptom.id)) {
        return {
          ...prevSelectedSymptoms,
          [currentAllergy]: allergySymptoms.filter((s) => s.id !== symptom.id),
        };
      } else {
        return {
          ...prevSelectedSymptoms,
          [currentAllergy]: [...allergySymptoms, symptom],
        };
      }
    });
  };

  const markAsDangerous = (allergyName) => {
    setDangerousAllergens((prevState) => {
      if (prevState.includes(allergyName)) {
        return prevState.filter((allergy) => allergy !== allergyName);
      } else {
        return [...prevState, allergyName];
      }
    });
  };

  const selectedAllergies = ProductsArray.filter((item) =>
    allergies.some((allergy) => allergy.name === item.name)
  );

  const saveSymptomsToDB = async () => {
    const symptomsData = [];

    Object.keys(selectedSymptoms).forEach((allergyName) => {
      const allergy = allergies.find((a) => a.name === allergyName);
      if (allergy) {
        selectedSymptoms[allergyName].forEach((symptom) => {
          symptomsData.push({
            allergy_id: allergy.id, // Використовуємо id алергену
            name: symptom.name,
          });
        });
      }
    });

    const { data, error } = await supabase.from("symptom").insert(symptomsData);

    if (error) {
      console.error("Error saving symptoms:", error);
      return;
    }

    console.log("Symptoms saved successfully. Checking inserted data...");

    // Перевірка вставлених даних
    const { data: insertedData, error: insertedError } = await supabase
      .from("symptom")
      .select("*")
      .in(
        "name",
        symptomsData.map((symptom) => symptom.name)
      );

    if (insertedError) {
      console.error("Error fetching inserted data:", insertedError);
      return;
    }

    console.log("Inserted data:", insertedData);
  
    // Update the dangerous field for selected allergies
    const dangerousUpdates = allergies
      .filter((allergy) => dangerousAllergens.includes(allergy.name))
      .map((allergy) => ({
        id: allergy.id,
        dangerous: true,
      }));
  
    const { data: updatedData, error: updateError } = await supabase
      .from("allergy")
      .upsert(dangerousUpdates);
  
    if (updateError) {
      console.error("Error updating dangerous field:", updateError);
      return;
    }
  
    console.log("Dangerous field updated successfully.", updatedData);
  };
  

  return (
    <ScrollView style={{ backgroundColor: theme.backgroundColor }}>
      <Text style={[styles.title, { color: theme.textColor }]}>
        {translate("Оберіть симптоми")}
      </Text>
      {selectedAllergies.map((allergy, index) => {
        const isDangerous = dangerousAllergens.includes(allergy.name);
        return (
          <View
            style={[
              styles.container,
              isDangerous && styles.dangerousContainer,

              { backgroundColor: theme.backgroundColor },
            ]}
            key={index}
          >
            <View
              style={[styles.wrap, { backgroundColor: theme.backgroundColor }]}
            >
              <View
                style={[
                  styles.flex,
                  { backgroundColor: theme.backgroundColor },
                ]}
              >
                <View
                  style={[
                    styles.product,
                    isDangerous && styles.dangerousProduct,
                  ]}
                >
                  <allergy.svg />
                  <Text style={styles.name}>{translate(allergy.name)}</Text>
                </View>
                <View
                  style={[
                    styles.options,
                    { color: theme.textColor },
                    { backgroundColor: theme.backgroundColor },
                  ]}
                >
                  <Button
                    title={
                      language === "en" ? "Select symptoms" : "Вибрати симптоми"
                    }
                    onPress={() => {
                      setCurrentAllergy(allergy.name);
                      setModalVisible(true);
                    }}
                  />
                  <Text
                    style={[
                      { fontSize: 16, fontWeight: "600", marginLeft: 10 },
                      { color: theme.textColor },
                    ]}
                  >
                    {language === "en"
                      ? "Selected symptoms"
                      : "Вибрані симптоми"}
                  </Text>
                  {(selectedSymptoms[allergy.name] || []).map((symptom) => (
                    <Text
                      style={[
                        styles.symp,
                        isDangerous && styles.dangerousSymptom,
                      ]}
                      key={symptom.id}
                    >
                      {translate(symptom.name)}
                    </Text>
                  ))}
                </View>
              </View>
              <Button
                title={
                  language === "en"
                    ? "Mark as a particularly dangerous allergen"
                    : "Позначити як особливо небезпечний алерген"
                }
                onPress={() => {
                  setCurrentAllergy(allergy.name);
                  markAsDangerous();
                }}
              />
            </View>
  
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible && currentAllergy === allergy.name}
              onRequestClose={() => {
                setModalVisible(false);
              }}
            >
              <View
                style={[
                  styles.modalView,
                  { backgroundColor: theme.backgroundColor },
                ]}
              >
                <View style={[styles.modalHeader, { color: theme.textColor }]}>
                  <Text style={[styles.modalText, { color: theme.textColor }]}>
                    {language === "en" ? "Choose symptoms" : "Оберіть симптоми"}
                  </Text>
                  <TouchableOpacity onPress={() => setModalVisible(false)}>
                    <Text
                      style={[
                        styles.closeButtonText,
                        { color: theme.textColor },
                      ]}
                    >
                      {language === "en" ? "Close" : "Закрити"}
                    </Text>
                  </TouchableOpacity>
                </View>
                <ScrollView style={styles.modalScroll}>
                  {symptomsArray.map((symptom) => (
                    <TouchableOpacity
                      key={symptom.id}
                      style={[
                        styles.symptomButton,
                        (selectedSymptoms[currentAllergy] || []).some(
                          (s) => s.id === symptom.id
                        )
                          ? styles.selectedSymptom
                          : null,
                      ]}
                      onPress={() => handleSelectSymptom(symptom)}
                    >
                      <Text style={styles.symptomText}>
                        {translate(symptom.name)}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </Modal>
          </View>
        );
      })}
      <Button
        onPress={() => {
          saveSymptomsToDB();
          navigation.navigate("Home");
        }}
        title={language === "en" ? "End" : "Завершити"}
        
      />
    </ScrollView>
  );

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F4FFF5",
    marginBottom: 20,
    padding: 10,
  },
  dangerousContainer: {
    backgroundColor: "#FFCCCC",
  },
  symp: {
    backgroundColor: "#E2FFE6",
    marginRight: 5,
    padding: 5,
    marginBottom: 5,
    marginTop: 5,
  },
  dangerousSymptom: {
    backgroundColor: "red",
    color: "white",
  },
  title: {
    fontSize: 24,
    alignSelf: "center",
    marginTop: 30,
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
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  dangerousProduct: {
    backgroundColor: "red",
  },
  flex: {
    flexDirection: "row",
    alignItems: "center",
  },
  symptomButton: {
    width: "auto",
    height: "auto",
    borderRadius: 15,
    backgroundColor: "#E2FFE6",
    shadowColor: "rgba(0, 0, 0, 0.35)",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.35,
    shadowRadius: 15,
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    padding: 10,
  },
  selectedSymptom: {
    backgroundColor: "#538A6B",
  },
  symptomText: {
    color: "#333",
  },
  options: {
    flexDirection: "row",
    marginLeft: 20,
    flexWrap: "wrap",
    width: 240,
  },
  wrap: {
    padding: 10,
    borderColor: "green",
    borderWidth: 2,
    borderRadius: 15,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalText: {
    fontSize: 24,
    marginBottom: 15,
    textAlign: "center",
  },
  modalScroll: {
    width: "100%",
  },
  closeButtonText: {
    fontSize: 24,
  },
});

export default AddSymptomsScreen;