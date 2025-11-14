import React, { useState } from "react";
import { SafeAreaView, View, Alert, ActivityIndicator, Modal } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styled from "styled-components/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TYPOGRAPHY } from "../../constants/typography";
import Button from "../../components/ui/Button";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { NavigationProp, RouteProp } from "@react-navigation/native";
import type { RootStackParamList, RegisterStackParamList } from "../../types/navigation";
import BackButton from "../../components/common/BackButton";
import TitleSubtitle from "../../components/common/TitleSubtitle";
import { businessValidationApi } from "../../utils/api/businessValidation";
import { Ionicons } from "@expo/vector-icons";

type OcrCheckingScreenRouteProp = RouteProp<RegisterStackParamList, 'OcrCheckingScreen'>;

export default function OcrCheckingScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<OcrCheckingScreenRouteProp>();

  const [openingDate, setOpeningDate] = useState(route.params?.openingDate || "");
  const [businessNumber, setBusinessNumber] = useState(route.params?.businessNumber || "");
  const [ceoName, setCeoName] = useState(route.params?.representativeName || "");
  const [isValidating, setIsValidating] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleNext = async () => {
    if (!openingDate || !businessNumber || !ceoName) {
      Alert.alert('입력 오류', '모든 정보를 입력해주세요.');
      return;
    }

    try {
      setIsValidating(true);

      const result = await businessValidationApi.validate(
        businessNumber,
        openingDate,
        ceoName
      );

      if (result.isValid) {
        setShowSuccessModal(true);
      } else {
        Alert.alert('검증 실패', result.message || '사업자등록증이 일치하지 않습니다.');
      }
    } catch (error) {
      console.error('사업자등록증 검증 실패:', error);
      Alert.alert('오류', '사업자등록증 검증 중 오류가 발생했습니다.');
    } finally {
      setIsValidating(false);
    }
  };

  const handleModalConfirm = () => {
    setShowSuccessModal(false);
    navigation.navigate({
      name: 'Register',
      params: {
        screen: 'RegistMainInfoScreen',
        params: {
          businessNumber,
          representativeName: ceoName,
          openingDate,
        }
      }
    });
  };

  return (
    <Container style={{ paddingBottom: insets.bottom + 16 }}>
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        enableOnAndroid
        extraScrollHeight={20}
        keyboardShouldPersistTaps="handled"
      >
        <BackButton style={{ marginBottom: 8 }} />
        <TitleSubtitle title="이 정보가 확실한가요?" subtitle="해당 정보는 나중에 수정할 수 없어요." style={{ marginBottom: 48, marginLeft: 12 }} />

        <Form>
          <Label>개업 날짜</Label>
          <Input value={openingDate} onChangeText={setOpeningDate} placeholder="20250813" placeholderTextColor="#8795a1" />

          <Label>사업자등록번호</Label>
          <Input value={businessNumber} onChangeText={setBusinessNumber} placeholder="000000-0000000" placeholderTextColor="#8795a1" />

          <Label>대표자명</Label>
          <Input value={ceoName} onChangeText={setCeoName} placeholder="홍길동" placeholderTextColor="#8795a1" />
        </Form>
        <Buttons>
          <Button
            title="다시 촬영하기"
            variant="secondary"
            onPress={() => navigation.navigate({ name: 'Register', params: { screen: 'OcrScreen' } })}
            disabled={isValidating}
          />
          <Button
            title={isValidating ? "검증 중..." : "다음으로"}
            variant="primary"
            onPress={handleNext}
            disabled={isValidating}
          />
        </Buttons>
      </KeyboardAwareScrollView>

      {isValidating && (
        <LoadingOverlay>
          <ActivityIndicator size="large" color="#36DBFF" />
          <LoadingText>사업자등록증 검증 중...</LoadingText>
        </LoadingOverlay>
      )}

      <Modal
        visible={showSuccessModal}
        transparent
        animationType="fade"
        onRequestClose={handleModalConfirm}
      >
        <ModalOverlay>
          <ModalContent>
            <IconContainer>
              <Ionicons name="checkmark-circle" size={64} color="#36DBFF" />
            </IconContainer>
            <ModalTitle>인증 완료</ModalTitle>
            <ModalMessage>사업자등록증 인증이 완료되었습니다</ModalMessage>
            <ModalButton onPress={handleModalConfirm}>
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
  border-color: rgba(54, 219, 255, 0.2);
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