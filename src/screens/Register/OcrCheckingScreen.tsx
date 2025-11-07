import React, { useState } from "react";
import { SafeAreaView, View } from "react-native";
import styled from "styled-components/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TYPOGRAPHY } from "../../constants/typography";
import Button from "../../components/ui/Button";
import { useNavigation } from "@react-navigation/native";
import type { NavigationProp } from "@react-navigation/native";
import type { RootStackParamList } from "../../types/navigation";
import BackButton from "../../components/common/BackButton";
import TitleSubtitle from "../../components/common/TitleSubtitle";

export default function OcrCheckingScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [companyName, setCompanyName] = useState("");
  const [businessNumber, setBusinessNumber] = useState("");
  const [ceoName, setCeoName] = useState("");

  return (
    <Container style={{ paddingBottom: insets.bottom + 16 }}>
      <BackButton style={{ marginBottom: 8 }} />
      <TitleSubtitle title="이 정보가 확실한가요?" subtitle="해당 정보는 나중에 수정할 수 없어요." style={{ marginBottom: 48, marginLeft: 12 }} />

      <Form>
        <Label>기업명</Label>
        <Input value={companyName} onChangeText={setCompanyName} placeholder="기업명" placeholderTextColor="#8795a1" />

        <Label>사업자등록번호</Label>
        <Input value={businessNumber} onChangeText={setBusinessNumber} placeholder="000000-0000000" placeholderTextColor="#8795a1" />

        <Label>대표자명</Label>
        <Input value={ceoName} onChangeText={setCeoName} placeholder="홍길동" placeholderTextColor="#8795a1" />
      </Form>
      <Buttons>
        <Button title="다시 촬영하기" variant="secondary" onPress={() => navigation.navigate({ name: 'Register', params: { screen: 'OcrScreen' } })} />
        <Button title="다음으로" variant="primary" onPress={() => navigation.navigate({ name: 'Register', params: { screen: 'RegistMainInfoScreen' } })} />
      </Buttons>
    </Container>
  );
}

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #101418;
`;

const Form = styled.View`
  gap: 18px;
  margin-bottom: 120px;
  padding : 0 24px;
`;

const Label = styled.Text`
  color: #d7e0e7;
  ${TYPOGRAPHY.HEADLINE_2}
`;

const Input = styled.TextInput`
  height: 56px;
  border-radius: 12px;
  padding: 0 16px;
  color: #e6f1f7;
  background: rgba(18, 59, 100, 0.25);
  border-width: 1px;
  border-color: rgba(255,255,255,0.08);
`;

const Buttons = styled.View`
  padding : 0 24px;
`;