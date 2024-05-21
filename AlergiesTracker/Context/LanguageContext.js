import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LanguageContext = createContext();
const translations = {
  ua: {
    eggs: "Яйця",
    nuts: "Горіхи",
    grains: "Зернові",
    seafood: "Море-продукти",
    chocolate: "Шоколад",
    vegetables: "Овочі",
    fruits: "Фрукти",
    honey: "Мед",
    pollen: "Пилок",
    animalWool: "Шерсть тварин",
    mites: "Кліщі",
    mold: "Пліснява",
    insects: "Комахи",
    penicillin: "Пеніцилін",
    eggWhite: "Білок",
    yolk: "Жовток",
    almond: "Мигдаль",
    hazelnut: "Фундук",
    walnut: "Грецький горіх",
    peanut: "Арахіс",
    wheat: "Пшениця",
    rye: "Жито",
    barley: "Ячмінь",
    fish: "Риба",
    shrimp: "Креветки",
    mussels: "Мідії",
    darkChocolate: "Темний шоколад",
    milkChocolate: "Молочний шоколад",
    carrot: "Морква",
    potato: "Картопля",
    beet: "Буряк",
    apples: "Яблука",
    bananas: "Банани",
    citrus: "Цитрусові",
    cats: "Коти",
    dogs: "Собаки",
    bees: "Бджоли",
    wasps: "Оси",
  },
  en: {
    eggs: "Eggs",
    nuts: "Nuts",
    grains: "Grains",
    seafood: "Seafood",
    chocolate: "Chocolate",
    vegetables: "Vegetables",
    fruits: "Fruits",
    honey: "Honey",
    pollen: "Pollen",
    animalWool: "Animal Wool",
    mites: "Mites",
    mold: "Mold",
    insects: "Insects",
    penicillin: "Penicillin",
    eggWhite: "Egg White",
    yolk: "Yolk",
    almond: "Almond",
    hazelnut: "Hazelnut",
    walnut: "Walnut",
    peanut: "Peanut",
    wheat: "Wheat",
    rye: "Rye",
    barley: "Barley",
    fish: "Fish",
    shrimp: "Shrimp",
    mussels: "Mussels",
    darkChocolate: "Dark Chocolate",
    milkChocolate: "Milk Chocolate",
    carrot: "Carrot",
    potato: "Potato",
    beet: "Beet",
    apples: "Apples",
    bananas: "Bananas",
    citrus: "Citrus",
    cats: "Cats",
    dogs: "Dogs",
    bees: "Bees",
    wasps: "Wasps",
  },
};
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("ua");
  const [isLoaded, setIsLoaded] = useState(false); // новий стан для відстеження завантаження

  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const savedLanguage = await AsyncStorage.getItem("language");
        if (savedLanguage) {
          setLanguage(savedLanguage);
        }
      } catch (error) {
        console.error("Failed to load language from AsyncStorage:", error);
      } finally {
        setIsLoaded(true); // встановлюємо стан після завершення завантаження
      }
    };
    loadLanguage();
  }, []);

  const toggleLanguage = async () => {
    try {
      const newLanguage = language === "ua" ? "en" : "ua";
      setLanguage(newLanguage);
      await AsyncStorage.setItem("language", newLanguage);
    } catch (error) {
      console.error("Failed to save language to AsyncStorage:", error);
    }
  };

  if (!isLoaded) {
    return null; // або показати спіннер/завантажувальний екран
  }
  const translate = (key) => {
    return translations[language][key];
  };
  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, translate }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;
