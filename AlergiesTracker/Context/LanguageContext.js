import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LanguageContext = createContext();

const translations = {
  ua: {
    "Яйця": "Яйця",
    "Горіхи": "Горіхи",
    "Зернові": "Зернові",
    "Море-продукти": "Море-продукти",
    "Шоколад": "Шоколад",
    "Овочі": "Овочі",
    "Фрукти": "Фрукти",
    "Мед": "Мед",
    "Пилок": "Пилок",
    "Шерсть тварин": "Шерсть тварин",
    "Кліщі": "Кліщі",
    "Пліснява": "Пліснява",
    "Комахи": "Комахи",
    "Пеніцилін": "Пеніцилін",
    "Білок": "Білок",
    "Жовток": "Жовток",
    "Мигдаль": "Мигдаль",
    "Фундук": "Фундук",
    "Грецький горіх": "Грецький горіх",
    "Арахіс": "Арахіс",
    "Пшениця": "Пшениця",
    "Жито": "Жито",
    "Ячмінь": "Ячмінь",
    "Риба": "Риба",
    "Креветки": "Креветки",
    "Мідії": "Мідії",
    "Темний шоколад": "Темний шоколад",
    "Молочний шоколад": "Молочний шоколад",
    "Морква": "Морква",
    "Картопля": "Картопля",
    "Буряк": "Буряк",
    "Яблука": "Яблука",
    "Банани": "Банани",
    "Цитрусові": "Цитрусові",
    "Коти": "Коти",
    "Собаки": "Собаки",
    "Бджоли": "Бджоли",
    "Оси": "Оси",
    "Нежить" : "Нежить",
    "Сльозотеча": "Сльозотеча",
    "Кашель": "Кашель",
    "Кропив'янка": "Кропив'янка",
    "Свербіж в горлі": "Свербіж в горлі",
    "Закладеність носа": "Закладеність носа",
    "Висип": "Висип",
    "Свербіж шкіри": "Свербіж шкіри",
    "Хрипи": "Хрипи",
    "Задишка": "Задишка",
    "Свербіж очей": "Свербіж очей",
    "Чхання": "Чхання"
  },
  en: {
    "Яйця": "Eggs",
    "Горіхи": "Nuts",
    "Зернові": "Grains",
    "Море-продукти": "Seafood",
    "Шоколад": "Chocolate",
    "Овочі": "Vegetables",
    "Фрукти": "Fruits",
    "Мед": "Honey",
    "Пилок": "Pollen",
    "Шерсть тварин": "Animal Wool",
    "Кліщі": "Mites",
    "Пліснява": "Mold",
    "Комахи": "Insects",
    "Пеніцилін": "Penicillin",
    "Білок": "Egg White",
    "Жовток": "Yolk",
    "Мигдаль": "Almond",
    "Фундук": "Hazelnut",
    "Грецький горіх": "Walnut",
    "Арахіс": "Peanut",
    "Пшениця": "Wheat",
    "Жито": "Rye",
    "Ячмінь": "Barley",
    "Риба": "Fish",
    "Креветки": "Shrimp",
    "Мідії": "Mussels",
    "Темний шоколад": "Dark Chocolate",
    "Молочний шоколад": "Milk Chocolate",
    "Морква": "Carrot",
    "Картопля": "Potato",
    "Буряк": "Beet",
    "Яблука": "Apples",
    "Банани": "Bananas",
    "Цитрусові": "Citrus",
    "Коти": "Cats",
    "Собаки": "Dogs",
    "Бджоли": "Bees",
    "Оси": "Wasps",
    "Нежить" : "Cold",
    "Сльозотеча": "Tearing",
    "Кашель": "Cough",
    "Кропив'янка": "Urticaria",
    "Свербіж в горлі": "Sore Throat",
    "Закладеність носа": "Nasal Congestion",
    "Висип": "Rash",
    "Свербіж шкіри": "Skin Itching",
    "Хрипи": "Wheezing",
    "Задишка": "Shortness of Breath",
    "Свербіж очей": "Eye Itching",
    "Чхання": "Sneezing"
  },
};
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("ua");
  const [isLoaded, setIsLoaded] = useState(false);

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
        setIsLoaded(true);
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
    return null;
  }

  const translate = (key) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, translate }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;
