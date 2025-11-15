import BackButton from "@/src/components/common/BackButton";
import TitleSubtitle from "@/src/components/common/TitleSubtitle";
import Button from "@/src/components/ui/Button";
import { Ionicons } from "@expo/vector-icons";
import type { NavigationProp, RouteProp } from "@react-navigation/native";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import { ActivityIndicator, Modal, SafeAreaView } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { TYPOGRAPHY } from "../../constants/typography";
import type { RegisterStackParamList, RootStackParamList } from "../../types/navigation";
import { storeApi } from "../../utils/api/store";
import { useQueryClient } from "@tanstack/react-query";

type RegistSubInfoScreenRouteProp = RouteProp<RegisterStackParamList, 'RegistSubInfoScreen'>;

export default function RegistSubInfoScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<RegistSubInfoScreenRouteProp>();
  const queryClient = useQueryClient();

  const [desc, setDesc] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleNext = async () => {
    if (!desc.trim()) {
      setErrorMessage('가게 소개를 입력해주세요.');
      setShowErrorModal(true);
      return;
    }

    try {
      setIsRegistering(true);

      console.log('가게 정보 등록 요청:', {
        storeId: route.params.storeId,
        description: desc,
      });

      await storeApi.register(route.params.storeId, desc);

      // stores 쿼리 캐시 무효화하여 새로운 가게 데이터 다시 불러오기
      await queryClient.invalidateQueries({ queryKey: ['stores'] });

      navigation.navigate({ name: 'Home', params: { screen: 'MainScreen' } });
    } catch (error: any) {
      console.error('가게 정보 등록 실패:', error);
      setErrorMessage('가게 정보 등록 중 오류가 발생했습니다.\n다시 시도해주세요.');
      setShowErrorModal(true);
    } finally {
      setIsRegistering(false);
    }
  };

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
            title={isRegistering ? "등록 중..." : "다음으로"}
            variant="primary"
            onPress={isRegistering ? undefined : handleNext}
          />
        </Buttons>
      </KeyboardAwareScrollView>

      {isRegistering && (
        <LoadingOverlay>
          <ActivityIndicator size="large" color="#36DBFF" />
          <LoadingText>가게 등록 중...</LoadingText>
        </LoadingOverlay>
      )}

      <Modal
        visible={showErrorModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowErrorModal(false)}
      >
        <ModalOverlay>
          <ModalContent>
            <IconContainer>
              <Ionicons name="alert-circle" size={64} color="#FF6B6B" />
            </IconContainer>
            <ModalTitle>입력 오류</ModalTitle>
            <ModalMessage>{errorMessage}</ModalMessage>
            <ModalButton onPress={() => setShowErrorModal(false)}>
              <ModalButtonText>확인</ModalButtonText>
            </ModalButton>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </Container>
  );
}

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #101418;
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

const LoadingOverlay = styled.View`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  align-items: center;
  justify-content: center;
  gap: 16px;
  z-index: 100;
`;

const LoadingText = styled.Text`
  color: #97C3DC;
  font-size: 16px;
  ${TYPOGRAPHY.SECTION_1}
`;

const ModalOverlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.7);
  align-items: center;
  justify-content: center;
  padding: 24px;
`;

const ModalContent = styled.View`
  background-color: #1a2632;
  border-radius: 20px;
  padding: 32px 24px;
  align-items: center;
  width: 100%;
  max-width: 320px;
  border-width: 1px;
  border-color: rgba(255, 107, 107, 0.2);
`;

const IconContainer = styled.View`
  margin-bottom: 20px;
`;

const ModalTitle = styled.Text`
  color: #e6f1f7;
  ${TYPOGRAPHY.SUB_TITLE}
  margin-bottom: 12px;
  text-align: center;
`;

const ModalMessage = styled.Text`
  color: #97c3dc;
  ${TYPOGRAPHY.SECTION_1}
  text-align: center;
  margin-bottom: 28px;
  line-height: 22px;
`;

const ModalButton = styled.Pressable`
  background-color: #36dbff;
  border-radius: 12px;
  padding: 16px 32px;
  width: 100%;
  align-items: center;
`;

const ModalButtonText = styled.Text`
  color: #101418;
  ${TYPOGRAPHY.HEADLINE_1}
`;