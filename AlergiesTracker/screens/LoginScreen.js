import React, { useState } from "react";
import { Text, TextInput, View, AppState } from "react-native";
import styled from "styled-components/native";
import Svg, { Path } from "react-native-svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { useContext } from "react";
import lightTheme from "../themes/lightTheme";
import darkTheme from "../themes/darkTheme";
import ThemeContext from "../Context/ThemeContext";
import { supabase } from "../lib/supabase";
import { Alert } from "react-native";
import AddName from "../components/AddName";
import { Session } from '@supabase/supabase-js';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";



AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export default function AuthScreen() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [nameSet, setNameSet] = useState(false);
  const [session, setSession] = useState(Session );


  useEffect(() => {
    async function fetchSession() {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Error fetching session:", error);
        return;
      }
      setSession(session);
    }

    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);


  const hadleClick = () => {
    setNameSet(true);
    signUpWithEmail();
  };

  // useEffect(() => {
  //   checkIfLoggedIn();
  // }, []);
  // const checkIfLoggedIn = async () => {
  //   try {
  //     const userDataKey = `userData`;
  //     const userData = await AsyncStorage.getItem(userDataKey);
  //     if (userData) {
  //       navigation.navigate("Home");
  //     }
  //   } catch (error) {
  //     console.error("Помилка перевірки авторизації:", error);
  //   }
  // };

  // const handleLogin = async () => {
  //   try {
  //     const userDataKey = `userData`; // Створюємо унікальний ключ для кожного користувача
  //     const userData = await AsyncStorage.getItem(userDataKey);
  //     if (userData) {
  //       const savedData = JSON.parse(userData);
  //       if (savedData.password === password) {
  //         navigation.navigate("Home");
  //       } else {
  //         Alert.alert("Помилка", "Невірний пароль");
  //       }
  //     } else {
  //       Alert.alert("Помилка", "Користувача з таким email не існує");
  //     }
  //   } catch (error) {
  //     console.error("Помилка при вході:", error);
  //   }
  // };

  // const handleRegister = async () => {
  //   try {
  //     const existingUser = await AsyncStorage.getItem(email);
  //     if (existingUser) {
  //       Alert.alert("Помилка", "Користувач з таким email вже зареєстрований");
  //     } else {
  //       await AsyncStorage.setItem(
  //         "userData", // Використовуйте "userData" як ключ
  //         JSON.stringify({ name, surname, email, password }) // Збереження даних користувача під ключем "userData"
  //       );
  //       navigation.navigate("Home");
  //     }
  //   } catch (error) {
  //     console.error("Помилка при реєстрації:", error);
  //   }
  // };
  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error){
      Alert.alert(error.message);
    }
    else{
      navigation.navigate("Home");
    }

    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    // navigation.navigate("Home");
    if (error) Alert.alert(error.message);
    setLoading(false);
  }
  return (
    <KeyboardAwareScrollView
    contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
    keyboardShouldPersistTaps="handled"
  >
      <StyledTitle>Alergies Tracker</StyledTitle>
      {isRegister ? (
        <StyledForm>
          <EmailDiv>
            <IconWrapper>
              <EmailIcon
                width="21"
                height="14"
                viewBox="0 0 21 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <Path
                  d="M20.5833 2.01079C20.5833 1.08821 19.6833 0.333374 18.5833 0.333374H2.58334C1.48334 0.333374 0.583344 1.08821 0.583344 2.01079V12.0753C0.583344 12.9979 1.48334 13.7527 2.58334 13.7527H18.5833C19.6833 13.7527 20.5833 12.9979 20.5833 12.0753V2.01079ZM18.5833 2.01079L10.5833 6.20434L2.58334 2.01079H18.5833ZM18.5833 12.0753H2.58334V3.68821L10.5833 7.88176L18.5833 3.68821V12.0753Z"
                  fill="black"
                />
              </EmailIcon>
            </IconWrapper>
            <StyledTextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
            />
          </EmailDiv>
          <EmailDiv>
            <IconWrapper>
              <EmailIcon
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <Path
                  d="M10 14.1667C9.55798 14.1667 9.13406 13.9911 8.8215 13.6786C8.50894 13.366 8.33334 12.9421 8.33334 12.5C8.33334 11.575 9.07501 10.8334 10 10.8334C10.442 10.8334 10.866 11.009 11.1785 11.3215C11.4911 11.6341 11.6667 12.058 11.6667 12.5C11.6667 12.9421 11.4911 13.366 11.1785 13.6786C10.866 13.9911 10.442 14.1667 10 14.1667ZM15 16.6667V8.33337H5.00001V16.6667H15ZM15 6.66671C15.442 6.66671 15.866 6.8423 16.1785 7.15486C16.4911 7.46742 16.6667 7.89135 16.6667 8.33337V16.6667C16.6667 17.1087 16.4911 17.5327 16.1785 17.8452C15.866 18.1578 15.442 18.3334 15 18.3334H5.00001C4.55798 18.3334 4.13406 18.1578 3.8215 17.8452C3.50894 17.5327 3.33334 17.1087 3.33334 16.6667V8.33337C3.33334 7.40837 4.07501 6.66671 5.00001 6.66671H5.83334V5.00004C5.83334 3.89497 6.27233 2.83516 7.05373 2.05376C7.83513 1.27236 8.89494 0.833374 10 0.833374C10.5472 0.833374 11.089 0.941148 11.5945 1.15054C12.1 1.35994 12.5594 1.66685 12.9463 2.05376C13.3332 2.44067 13.6401 2.9 13.8495 3.40553C14.0589 3.91105 14.1667 4.45287 14.1667 5.00004V6.66671H15ZM10 2.50004C9.33697 2.50004 8.70108 2.76343 8.23224 3.23227C7.7634 3.70111 7.50001 4.337 7.50001 5.00004V6.66671H12.5V5.00004C12.5 4.337 12.2366 3.70111 11.7678 3.23227C11.2989 2.76343 10.6631 2.50004 10 2.50004Z"
                  fill="black"
                />
              </EmailIcon>
            </IconWrapper>

            <StyledTextInput
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholder="Пароль"
            />
          </EmailDiv>
          <LoginButton onPress={hadleClick}>
            <ButtonText>Продовжити</ButtonText>
          </LoginButton>
          {nameSet && (
            <>
              <AddName session={session}/>
            </>
          )}
          <StyledDiv>
            <StyledText>Вже є обліковий запис?</StyledText>
            <TapRegister onPress={() => setIsRegister(false)}>
              Увійти
            </TapRegister>
          </StyledDiv>
        </StyledForm>
      ) : (
        <StyledForm>
          <EmailDiv>
            <IconWrapper>
              <EmailIcon
                width="18.11"
                height="14"
                viewBox="0 0 21 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <Path
                  d="M20.5833 2.01079C20.5833 1.08821 19.6833 0.333374 18.5833 0.333374H2.58334C1.48334 0.333374 0.583344 1.08821 0.583344 2.01079V12.0753C0.583344 12.9979 1.48334 13.7527 2.58334 13.7527H18.5833C19.6833 13.7527 20.5833 12.9979 20.5833 12.0753V2.01079ZM18.5833 2.01079L10.5833 6.20434L2.58334 2.01079H18.5833ZM18.5833 12.0753H2.58334V3.68821L10.5833 7.88176L18.5833 3.68821V12.0753Z"
                  fill="black"
                />
              </EmailIcon>
            </IconWrapper>
            <StyledTextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
            />
          </EmailDiv>

          <EmailDiv>
            <IconWrapper>
              <EmailIcon
                width="18.11"
                height="23"
                viewBox="0 0 19 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <Path
                  d="M5.65177 1.33633L5.65139 1.33657C4.2454 2.20655 3.13882 3.59888 2.69219 5.04026L2.6921 5.04055C2.43353 5.87282 2.37575 6.41072 2.37575 8.49126V10.1023V10.4869L1.99143 10.5019L1.54851 10.5193L1.54851 10.5194L1.54214 10.5195C1.35653 10.5238 1.26359 10.5312 1.19754 10.5437C1.14249 10.554 1.09663 10.5695 1.01092 10.6106L1.01095 10.6107L1.00399 10.6139C0.79629 10.7085 0.578843 10.9191 0.46529 11.143L0.464863 11.1438L0.4 11.271V16.1685V21.0643L0.466971 21.1931C0.579557 21.4046 0.803221 21.6213 1.02139 21.7272L1.02139 21.7272L1.02302 21.728L1.17847 21.8043H9.05373H16.929L17.0844 21.728L17.0861 21.7272C17.3042 21.6213 17.5279 21.4046 17.6404 21.1932C17.6407 21.1927 17.6409 21.1923 17.6412 21.1918L17.7075 21.0643V16.1685V11.271L17.6426 11.1438L17.6422 11.143C17.5286 10.9191 17.3112 10.7085 17.1035 10.6139L17.1034 10.6139L17.0965 10.6106C17.0107 10.5695 16.9647 10.5539 16.9101 10.5436C16.8446 10.5312 16.7528 10.5238 16.5695 10.5195V10.5196L16.5634 10.5193L16.1162 10.502L15.7317 10.487V10.1023V8.49126C15.7317 6.41072 15.6739 5.87282 15.4153 5.04055L15.4153 5.04026C14.9686 3.59888 13.862 2.20655 12.4561 1.33657L12.4553 1.33608C11.2742 0.601442 9.80157 0.282326 8.27923 0.438917C7.37374 0.536995 6.41137 0.865143 5.65177 1.33633ZM9.88275 2.70412L9.88364 2.70428C10.7525 2.85875 11.5958 3.31857 12.2327 3.9745L12.2344 3.97629C12.7884 4.55394 13.1284 5.14928 13.3586 5.9379C13.4614 6.28465 13.4663 6.54061 13.479 8.22702L13.479 8.22769L13.4964 10.1072L13.5001 10.5109H13.0964H9.05373H5.01103H4.60732L4.61105 10.1072L4.62841 8.22732L4.62842 8.22702L4.62881 8.18048C4.63713 7.20033 4.64164 6.66866 4.68181 6.30253C4.72632 5.89684 4.81698 5.67595 4.96258 5.32517C5.37877 4.3098 6.39939 3.31945 7.43781 2.92027C8.16216 2.6403 9.07431 2.56229 9.88275 2.70412Z"
                  stroke="#1E1E1E"
                  stroke-width="0.8"
                />
              </EmailIcon>
            </IconWrapper>
            <StyledTextInput
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholder="Пароль"
            />
          </EmailDiv>
          <LoginButton title="Login" onPress={signInWithEmail}>
            <ButtonText>Увійти</ButtonText>
          </LoginButton>
          <StyledDiv>
            <StyledText>Немає облікового запису?</StyledText>
            <TapRegister onPress={() => setIsRegister(true)}>
              Зареєструватись
            </TapRegister>
          </StyledDiv>
        </StyledForm>
      )}
    </KeyboardAwareScrollView>
  );
}

const StyledForm = styled(View)`
  margin-top: 10px;
  padding: 20px;
  margin-bottom: 50px;
`;

const EmailDiv = styled(View)`
  display: flex;
  align-items: center;
  flex-direction: row;
  margin-top: 34px;
`;

const IconWrapper = styled(View)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 41px;
  background: rgba(139, 219, 173, 1);
  border-radius: 15px;
  position: absolute;
  z-index: 1;
  margin-left: 53px;
  border-width: 1px;
  border-color: #ccc;
`;

const EmailIcon = styled(Svg)`
  width: 23px;
  height: 15px;
`;

const StyledTextInput = styled(TextInput)`
  border-width: 1px;
  border-color: #ccc;
  padding: 10px;
  margin-top: 34px;
  width: 241px;
  height: 41px;
  gap: 0px;
  border-radius: 15px;
  background-color: rgba(209, 255, 215, 1);
  margin: 0 auto;
  position: relative;
  padding-left: 60px;
`;

const LoginButton = styled.TouchableOpacity`
  width: 190px;
  height: 40px;
  margin-top: 54px;
  margin-bottom: 20px;
  background-color: #8bdbad;
  border-radius: 15px;
  align-self: center;
  justify-content: center;
`;

const ButtonText = styled(Text)`
  font-family: "Comfortaa";
  font-size: 20px;
  font-weight: 400;
  line-height: 22.3px;
  text-align: center;
`;

const StyledDiv = styled(View)`
  margin-top: 120px;
`;

const TapRegister = styled(Text)`
  margin-top: 10px;
  text-align: center;
  color: #8bdbad;
`;

const StyledText = styled(Text)`
  text-align: center;
`;

const StyledTitle = styled(Text)`
  font-size: 32px;
  font-weight: bold;
  text-align: center;
  margin-top: 100px;
`;
