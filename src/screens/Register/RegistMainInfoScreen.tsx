import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import styled from "styled-components/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BackButton from "../../components/common/BackButton";
import { TYPOGRAPHY } from "../../constants/typography";
import Button from "../../components/ui/Button";
import TitleSubtitle from "@/src/components/common/TitleSubtitle";
import { useNavigation } from "@react-navigation/native";
import type { NavigationProp } from "@react-navigation/native";
import type { RootStackParamList } from "../../types/navigation";

export default function RegistMainInfoScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [hours, setHours] = useState("");

  return (
    <Container style={{ paddingBottom: insets.bottom + 16 }}>
      <BackButton style={{ marginBottom: 8 }} />
      <TitleSubtitle title="가게 정보를 입력해주세요." subtitle="이 정보는 나중에 바꿀 수 있어요." style={{ marginBottom: 48, marginLeft: 12}} />

      <Form>
        <Label>주소</Label>
        <Input
          placeholder="부산광역시 강서구 가락대로 1393"
          placeholderTextColor="#8795a1"
          value={address}
          onChangeText={setAddress}
        />

        <Label>전화번호</Label>
        <Input
          placeholder="010-0326-0326"
          placeholderTextColor="#8795a1"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />

        <Label>영업시간</Label>
        <Input
          placeholder="22:00 ~ 23:00"
          placeholderTextColor="#8795a1"
          value={hours}
          onChangeText={setHours}
        />
      </Form>

      <Buttons>
         <Button
           title="다음으로"
           variant="primary"
           style={{ padding: '0 24px' }}
           onPress={() => navigation.navigate({ name: 'Register', params: { screen: 'RegistPictureInfoScreen' } })}
         />
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
  margin-bottom: 172px;
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