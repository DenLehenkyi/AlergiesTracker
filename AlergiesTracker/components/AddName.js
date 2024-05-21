import React, { useState, useEffect } from "react";
import { Text, TextInput, View, AppState } from "react-native";
import styled from "styled-components/native";
import Svg, { Path } from "react-native-svg";
import { supabase } from "../lib/supabase";
import { Session } from "@supabase/supabase-js";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default AddName = ({ session }) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  // console.log(session);

  useEffect(() => {
    if (session) getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      const { data, error, status } = await supabase
        .from("profiles")
        .select(`username`)
        .eq("id", session?.user.id)
        .single();
      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({ username, full_name }) {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      const updates = {
        id: session?.user.id,
        username,
        full_name,
        updated_at: new Date(),
      };

      const { error } = await supabase.from("profiles").upsert(updates);

      if (!error) {
        navigation.navigate("Home");
      } else {
        throw error;
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <View>
      <EmailDiv>
        <IconWrapper>
          <EmailIcon
            width="18.11"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <Path
              d="M10 2.375C10.3447 2.375 10.6861 2.4429 11.0045 2.57482C11.323 2.70673 11.6124 2.90009 11.8562 3.14384C12.0999 3.3876 12.2933 3.67698 12.4252 3.99546C12.5571 4.31394 12.625 4.65528 12.625 5C12.625 5.34472 12.5571 5.68606 12.4252 6.00454C12.2933 6.32302 12.0999 6.6124 11.8562 6.85616C11.6124 7.09991 11.323 7.29327 11.0045 7.42518C10.6861 7.5571 10.3447 7.625 10 7.625C9.30381 7.625 8.63613 7.34844 8.14384 6.85616C7.65156 6.36387 7.375 5.69619 7.375 5C7.375 4.30381 7.65156 3.63613 8.14384 3.14384C8.63613 2.65156 9.30381 2.375 10 2.375ZM10 13.625C13.7125 13.625 17.625 15.45 17.625 16.25V17.625H2.375V16.25C2.375 15.45 6.2875 13.625 10 13.625ZM10 0C7.2375 0 5 2.2375 5 5C5 7.7625 7.2375 10 10 10C12.7625 10 15 7.7625 15 5C15 2.2375 12.7625 0 10 0ZM10 11.25C6.6625 11.25 0 12.925 0 16.25V20H20V16.25C20 12.925 13.3375 11.25 10 11.25Z"
              fill="black"
            />
          </EmailIcon>
        </IconWrapper>
        <StyledTextInput
          value={name}
          onChangeText={setName}
          placeholder="Введіть ім'я"
        />
      </EmailDiv>
      <EmailDiv>
        <IconWrapper>
          <EmailIcon
            width="18.11"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <Path
              d="M10 2.375C10.3447 2.375 10.6861 2.4429 11.0045 2.57482C11.323 2.70673 11.6124 2.90009 11.8562 3.14384C12.0999 3.3876 12.2933 3.67698 12.4252 3.99546C12.5571 4.31394 12.625 4.65528 12.625 5C12.625 5.34472 12.5571 5.68606 12.4252 6.00454C12.2933 6.32302 12.0999 6.6124 11.8562 6.85616C11.6124 7.09991 11.323 7.29327 11.0045 7.42518C10.6861 7.5571 10.3447 7.625 10 7.625C9.30381 7.625 8.63613 7.34844 8.14384 6.85616C7.65156 6.36387 7.375 5.69619 7.375 5C7.375 4.30381 7.65156 3.63613 8.14384 3.14384C8.63613 2.65156 9.30381 2.375 10 2.375ZM10 13.625C13.7125 13.625 17.625 15.45 17.625 16.25V17.625H2.375V16.25C2.375 15.45 6.2875 13.625 10 13.625ZM10 0C7.2375 0 5 2.2375 5 5C5 7.7625 7.2375 10 10 10C12.7625 10 15 7.7625 15 5C15 2.2375 12.7625 0 10 0ZM10 11.25C6.6625 11.25 0 12.925 0 16.25V20H20V16.25C20 12.925 13.3375 11.25 10 11.25Z"
              fill="black"
            />
          </EmailIcon>
        </IconWrapper>
        <StyledTextInput
          value={surname}
          onChangeText={setSurname}
          placeholder="Введіть прізвище"
        />
      </EmailDiv>
      <LoginButton
        title="Register"
        onPress={() => updateProfile({ username: name, full_name: surname })}
      >
        <ButtonText>Зареєструватись</ButtonText>
      </LoginButton>
    </View>
  );
};

const StyledForm = styled(View)`
  margin-top: 110px;
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
