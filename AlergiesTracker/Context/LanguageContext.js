import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('ua');
  const [isLoaded, setIsLoaded] = useState(false); // новий стан для відстеження завантаження

  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const savedLanguage = await AsyncStorage.getItem('language');
        if (savedLanguage) {
          setLanguage(savedLanguage);
        }
      } catch (error) {
        console.error('Failed to load language from AsyncStorage:', error);
      } finally {
        setIsLoaded(true); // встановлюємо стан після завершення завантаження
      }
    };
    loadLanguage();
  }, []);

  const toggleLanguage = async () => {
    try {
      const newLanguage = language === 'ua' ? 'en' : 'ua';
      setLanguage(newLanguage);
      await AsyncStorage.setItem('language', newLanguage);
    } catch (error) {
      console.error('Failed to save language to AsyncStorage:', error);
    }
  };

  if (!isLoaded) {
    return null; // або показати спіннер/завантажувальний екран
  }

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;
