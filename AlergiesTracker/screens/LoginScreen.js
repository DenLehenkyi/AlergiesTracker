import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";
import styled from "styled-components/native";
import Svg, { Path } from "react-native-svg";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Логіка для логіну
    navigation.navigate("Home");
  };

  return (
    <StyledLoginForm>
      <EmailDiv>
        <IconWrapper>
          <EmailIcon
            width="23"
            height="15"
            viewBox="0 0 23 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <Path
              d="M1.2793 0.0390635C0.805664 0.151368 0.380859 0.507813 0.141602 0.991212L0 1.2793V7.50488V13.7305L0.131836 14.0088C0.297851 14.3652 0.634765 14.7021 0.991211 14.8682L1.26953 15H11.4014H21.5332L21.8115 14.8682C22.168 14.7021 22.5049 14.3652 22.6709 14.0088L22.8027 13.7305V7.50488V1.2793L22.6611 0.991212C22.4805 0.620118 22.168 0.307618 21.8115 0.141603L21.5332 0.00976658L11.499 1.90735e-06C5.75195 1.90735e-06 1.38672 0.0146494 1.2793 0.0390635ZM21.3525 0.712892C21.4014 0.742188 21.3525 0.810548 21.1572 0.971681C20.1123 1.85547 11.4355 8.87207 11.4014 8.86231C11.3818 8.85254 9.11621 7.02637 6.37207 4.79981C2.85644 1.94824 1.40137 0.742188 1.45019 0.712892C1.5332 0.659181 21.2695 0.659181 21.3525 0.712892ZM4.28711 3.98438L7.68554 6.74317L6.27441 8.18359C5.49804 8.97949 3.94043 10.5518 2.8125 11.6748C0.78125 13.7061 0.761718 13.7256 0.708008 13.5889C0.673828 13.501 0.659179 11.5479 0.659179 7.51953C0.659179 1.51367 0.668945 1.17676 0.830078 1.21582C0.864257 1.22559 2.41699 2.4707 4.28711 3.98438ZM22.085 1.39649C22.1631 1.65527 22.168 13.3936 22.0898 13.5938C22.0361 13.7305 22.0215 13.7158 18.5986 10.2734C16.709 8.37402 15.1611 6.80176 15.1611 6.77734C15.1611 6.72852 21.9385 1.20606 21.9971 1.20606C22.0166 1.20606 22.0557 1.28906 22.085 1.39649ZM9.76562 8.43262C11.0107 9.44336 11.2988 9.65332 11.4209 9.65332C11.5478 9.65332 11.8359 9.43848 13.081 8.42285L14.5898 7.19727L18.0713 10.708C21.5137 14.1895 21.5478 14.2188 21.416 14.2773C21.2402 14.3604 1.63086 14.3701 1.40137 14.2871L1.24512 14.2334L4.72168 10.7227C6.63574 8.79395 8.21289 7.21192 8.23242 7.21192C8.24707 7.21192 8.94043 7.75879 9.76562 8.43262Z"
              fill="#214E34"
            />
          </EmailIcon>
        </IconWrapper>
        <StyledTextInput value={email} onChangeText={setEmail} />
      </EmailDiv>

      <EmailDiv>
      <IconWrapper>
      <EmailIcon width="19" height="23" viewBox="0 0 19 23" fill="none" xmlns="http://www.w3.org/2000/svg">
<Path d="M5.65177 1.33633L5.65139 1.33657C4.2454 2.20655 3.13882 3.59888 2.69219 5.04026L2.6921 5.04055C2.43353 5.87282 2.37575 6.41072 2.37575 8.49126V10.1023V10.4869L1.99143 10.5019L1.54851 10.5193L1.54851 10.5194L1.54214 10.5195C1.35653 10.5238 1.26359 10.5312 1.19754 10.5437C1.14249 10.554 1.09663 10.5695 1.01092 10.6106L1.01095 10.6107L1.00399 10.6139C0.79629 10.7085 0.578843 10.9191 0.46529 11.143L0.464863 11.1438L0.4 11.271V16.1685V21.0643L0.466971 21.1931C0.579557 21.4046 0.803221 21.6213 1.02139 21.7272L1.02139 21.7272L1.02302 21.728L1.17847 21.8043H9.05373H16.929L17.0844 21.728L17.0861 21.7272C17.3042 21.6213 17.5279 21.4046 17.6404 21.1932C17.6407 21.1927 17.6409 21.1923 17.6412 21.1918L17.7075 21.0643V16.1685V11.271L17.6426 11.1438L17.6422 11.143C17.5286 10.9191 17.3112 10.7085 17.1035 10.6139L17.1034 10.6139L17.0965 10.6106C17.0107 10.5695 16.9647 10.5539 16.9101 10.5436C16.8446 10.5312 16.7528 10.5238 16.5695 10.5195V10.5196L16.5634 10.5193L16.1162 10.502L15.7317 10.487V10.1023V8.49126C15.7317 6.41072 15.6739 5.87282 15.4153 5.04055L15.4153 5.04026C14.9686 3.59888 13.862 2.20655 12.4561 1.33657L12.4553 1.33608C11.2742 0.601442 9.80157 0.282326 8.27923 0.438917C7.37374 0.536995 6.41137 0.865143 5.65177 1.33633ZM9.88275 2.70412L9.88364 2.70428C10.7525 2.85875 11.5958 3.31857 12.2327 3.9745L12.2344 3.97629C12.7884 4.55394 13.1284 5.14928 13.3586 5.9379C13.4614 6.28465 13.4663 6.54061 13.479 8.22702L13.479 8.22769L13.4964 10.1072L13.5001 10.5109H13.0964H9.05373H5.01103H4.60732L4.61105 10.1072L4.62841 8.22732L4.62842 8.22702L4.62881 8.18048C4.63713 7.20033 4.64164 6.66866 4.68181 6.30253C4.72632 5.89684 4.81698 5.67595 4.96258 5.32517C5.37877 4.3098 6.39939 3.31945 7.43781 2.92027C8.16216 2.6403 9.07431 2.56229 9.88275 2.70412Z" stroke="#1E1E1E" stroke-width="0.8"/>
</EmailIcon>

        </IconWrapper>
        <StyledTextInput
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </EmailDiv>
      <LoginButton title="Login" onPress={handleLogin}>
        <ButtonText>Увійти</ButtonText>
      </LoginButton>
    </StyledLoginForm>
  );
}
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

const StyledLoginForm = styled(View)`
  margin-top: 245px;
  padding: 20px;
`;

const LoginButton = styled.TouchableOpacity`
  width: 137px;
  height: 40px;
  margin-top: 54px;
  margin-bottom: 20px;
  background-color: #8bdbad;
  border-radius: 15px;
  align-self: center;
  justify-content: center;
`;

const ButtonText = styled.Text`
  font-family: "Comfortaa";
  font-size: 20px;
  font-weight: 400;
  line-height: 22.3px;
  text-align: center;
`;
