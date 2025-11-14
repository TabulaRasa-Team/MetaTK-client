import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styled from "styled-components/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import TitleSubtitle from "@/src/components/common/TitleSubtitle";
import BackButton from "@/src/components/common/BackButton";
import Button from "@/src/components/ui/Button";
import { TYPOGRAPHY } from "../../constants/typography";
import { useNavigation } from "@react-navigation/native";
import type { NavigationProp } from "@react-navigation/native";
import type { RootStackParamList } from "../../types/navigation";

export default function RegistSubInfoScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [desc, setDesc] = useState("");

  return (
    <Container>
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        enableOnAndroid
        extraScrollHeight={20}
        keyboardShouldPersistTaps="handled"
      >
        <BackButton style={{ paddingBottom: insets.bottom + 16 }} />
        <TitleSubtitle
          title="가게 정보를 입력해주세요."
          subtitle="이 정보는 나중에 바꿀 수 있어요."
          style={{ marginBottom: 48, marginLeft: 12 }}
        />

        <Section>
          <Label>사람들이 궁금해 할 내용을 작성해 주세요.</Label>
          <TextArea
            multiline
            value={desc}
            onChangeText={setDesc}
            placeholder="가게 소개, 주요 메뉴, 주차/휴무 안내 등"
            placeholderTextColor="#8795a1"
            textAlignVertical="top"
          />
        </Section>

        <Buttons style={{ paddingBottom: insets.bottom + 16 }}>
          <Button
            title="다음으로"
            variant="primary"
            onPress={() => navigation.navigate({ name: 'Register', params: { screen: 'RegistCompleteScreen' } })}
          />
        </Buttons>
      </KeyboardAwareScrollView>
    </Container>
  );
}

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #101418;
`;

const Header = styled.View`
  padding-top: 8px;
  padding-left: 12px;
`;

const Section = styled.View`
  padding: 0 24px;
`;

const Label = styled.Text`
  color: #e6f1f7;
  ${TYPOGRAPHY.HEADLINE_2}
  margin-bottom: 12px;
`;

const TextArea = styled.TextInput`
  min-height: 420px;
  border-radius: 12px;
  padding: 16px;
  color: #e6f1f7;
  background: rgba(18, 59, 100, 0.25);
  border-width: 1px;
  border-color: rgba(255,255,255,0.08);
`;

const Buttons = styled.View`
  padding: 0 24px;
  margin-top: 24px;
`;