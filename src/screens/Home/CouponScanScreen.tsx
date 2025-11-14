import React, { useEffect, useState } from "react";
import { View, Modal, ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { NavigationProp } from "@react-navigation/native";
import type { RootStackParamList } from "../../types/navigation";
import { TYPOGRAPHY } from "../../constants/typography";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { couponApi } from "../../utils/api/coupon";

export default function CouponScanScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (!permission?.granted) requestPermission();
  }, [permission]);

  const handleBarcodeScanned = async (result: any) => {
    if (scanned || isProcessing) return;

    setScanned(true);
    setIsProcessing(true);

    const couponId = result.data;
    console.log('스캔된 쿠폰 ID:', couponId);

    try {
      await couponApi.useCoupon(couponId);
      setShowSuccessModal(true);
    } catch (error: any) {
      console.error('쿠폰 사용 실패:', error);
      setErrorMessage('쿠폰 사용 중 오류가 발생했습니다.\n다시 시도해주세요.');
      setShowErrorModal(true);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSuccessConfirm = () => {
    setShowSuccessModal(false);
    navigation.navigate({ name: 'Home', params: { screen: 'MainScreen' } });
  };

  const handleErrorConfirm = () => {
    setShowErrorModal(false);
    setScanned(false);
  };

  return (
    <Container>
      <Header style={{ top: insets.top + 8 }}>
        <Title>메타쿠폰 스캔</Title>
        <Subtitle>메타쿠폰의 QR 코드를 스캔해주세요.</Subtitle>
        <Close onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={28} color="#E6F1F7" />
        </Close>
      </Header>

      <Overlay>
        <CameraBox>
          {permission?.granted && (
            <CameraView
              style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
              facing="back"
              onBarcodeScanned={handleBarcodeScanned}
            />
          )}
          <ScanFrame pointerEvents="none">
            <CornerTL />
            <CornerTR />
            <CornerBL />
            <CornerBR />
          </ScanFrame>
        </CameraBox>
      </Overlay>

      <BottomBar style={{ bottom: insets.bottom + 24 }}>
        <Shutter />
        <Progress />
      </BottomBar>

      {isProcessing && (
        <LoadingOverlay>
          <ActivityIndicator size="large" color="#36DBFF" />
          <LoadingText>쿠폰 사용 처리 중...</LoadingText>
        </LoadingOverlay>
      )}

      <Modal
        visible={showSuccessModal}
        transparent
        animationType="fade"
        onRequestClose={handleSuccessConfirm}
      >
        <ModalOverlay>
          <ModalContent>
            <IconContainer>
              <Ionicons name="checkmark-circle" size={64} color="#36DBFF" />
            </IconContainer>
            <ModalTitle>사용 완료</ModalTitle>
            <ModalMessage>쿠폰이 사용 완료되었습니다</ModalMessage>
            <ModalButton onPress={handleSuccessConfirm}>
              <ModalButtonText>확인</ModalButtonText>
            </ModalButton>
          </ModalContent>
        </ModalOverlay>
      </Modal>

      <Modal
        visible={showErrorModal}
        transparent
        animationType="fade"
        onRequestClose={handleErrorConfirm}
      >
        <ModalOverlay>
          <ModalContent>
            <IconContainer>
              <Ionicons name="alert-circle" size={64} color="#FF6B6B" />
            </IconContainer>
            <ModalTitle>사용 오류</ModalTitle>
            <ModalMessage>{errorMessage}</ModalMessage>
            <ModalButton onPress={handleErrorConfirm}>
              <ModalButtonText>확인</ModalButtonText>
            </ModalButton>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </Container>
  );
}

const Container = styled(View)`
  flex: 1;
  background-color: #000;
`;

const Header = styled.View`
  position: absolute;
  left: 16px;
  right: 16px;
  top: 8px;
`;

const Title = styled.Text`
  color: #e6f1f7;
  ${TYPOGRAPHY.SUB_TITLE}
`;

const Subtitle = styled.Text`
  color: #b8c7d2;
  ${TYPOGRAPHY.SECTION_2}
  margin-top: 6px;
`;

const Close = styled.Pressable`
  position: absolute;
  right: 0;
  top: 0;
  padding: 8px;
`;

const Overlay = styled.View`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  align-items: center;
  justify-content: center;
`;

const CameraBox = styled.View`
  width: 80%;
  height: 56%;
  border-radius: 16px;
  overflow: hidden;
  position: relative;
`;

const ScanFrame = styled.View`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  align-items: center;
  justify-content: center;
`;

const CornerBase = styled.View`
  position: absolute;
  width: 36px;
  height: 36px;
  border-color: #3fd1ff;
`;

const CornerTL = styled(CornerBase)`
  left: 0;
  top: 0;
  border-top-width: 6px;
  border-left-width: 6px;
  border-top-left-radius: 10px;
`;
const CornerTR = styled(CornerBase)`
  right: 0;
  top: 0;
  border-top-width: 6px;
  border-right-width: 6px;
  border-top-right-radius: 10px;
`;
const CornerBL = styled(CornerBase)`
  left: 0;
  bottom: 0;
  border-bottom-width: 6px;
  border-left-width: 6px;
  border-bottom-left-radius: 10px;
`;
const CornerBR = styled(CornerBase)`
  right: 0;
  bottom: 0;
  border-bottom-width: 6px;
  border-right-width: 6px;
  border-bottom-right-radius: 10px;
`;

const BottomBar = styled.View`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 24px;
  align-items: center;
`;

const Shutter = styled.View`
  width: 76px;
  height: 76px;
  border-radius: 38px;
  background-color: rgba(255,255,255,0.9);
  border-width: 5px;
  border-color: rgba(255,255,255,0.4);
`;

const Progress = styled.View`
  margin-top: 12px;
  width: 60%;
  height: 6px;
  border-radius: 3px;
  background-color: rgba(255,255,255,0.35);
  align-self: center;
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
