import React, { useEffect, useRef, useState } from "react";
import { View, Alert, ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { NavigationProp } from "@react-navigation/native";
import type { RootStackParamList } from "../../types/navigation";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TYPOGRAPHY } from "../../constants/typography";
import { ocrApi } from "../../utils/api/ocr";

export default function OcrScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [permission, requestPermission] = useCameraPermissions();
  const insets = useSafeAreaInsets();
  const [isBusy, setIsBusy] = useState(false);
  const cameraRef = useRef<CameraView>(null);

  useEffect(() => {
    if (!permission?.granted) requestPermission();
  }, [permission]);

  const processOcrImage = async (imageUri: string) => {
    try {
      setIsBusy(true);

      // OCR API 호출
      const ocrResult = await ocrApi.uploadImage(imageUri);

      // OcrCheckingScreen으로 이동하며 데이터 전달
      navigation.navigate({
        name: 'Register',
        params: {
          screen: 'OcrCheckingScreen',
          params: {
            companyName: ocrResult.company_name,
            businessNumber: ocrResult.business_number,
            representativeName: ocrResult.representative_name,
            openingDate: ocrResult.opening_date,
          },
        },
      });
    } catch (error) {
      console.error('OCR 처리 실패:', error);
      Alert.alert('오류', 'OCR 처리 중 오류가 발생했습니다.');
    } finally {
      setIsBusy(false);
    }
  };

  const handleCapture = async () => {
    if (isBusy || !cameraRef.current) return;

    try {
      // 사진 촬영
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
      });

      if (!photo) {
        Alert.alert('오류', '사진 촬영에 실패했습니다.');
        return;
      }

      await processOcrImage(photo.uri);
    } catch (error) {
      console.error('사진 촬영 실패:', error);
      Alert.alert('오류', '사진 촬영에 실패했습니다.');
      setIsBusy(false);
    }
  };

  const handleGalleryPick = async () => {
    if (isBusy) return;

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: false,
        quality: 0.8,
      });

      if (result.canceled || !result.assets[0]) {
        return;
      }

      await processOcrImage(result.assets[0].uri);
    } catch (error) {
      console.error('갤러리 선택 실패:', error);
      Alert.alert('오류', '이미지 선택에 실패했습니다.');
      setIsBusy(false);
    }
  };

  return (
    <Container>
      <Header style={{ top: insets.top + 8 }}>
        <Title>확인서 인증</Title>
        <Subtitle>소상공인 확인서의 내용이 모두 담기도록 촬영해 주세요.</Subtitle>
        <Close onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={28} color="#E6F1F7" />
        </Close>
      </Header>

      <Overlay>
        <CameraBox>
          {permission?.granted && (
            <CameraView
              ref={cameraRef}
              style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
              facing="back"
            />
          )}
          <Frame pointerEvents="none">
            <CornerTL />
            <CornerTR />
            <CornerBL />
            <CornerBR />
          </Frame>
        </CameraBox>
      </Overlay>

      {isBusy && (
        <LoadingOverlay>
          <ActivityIndicator size="large" color="#36DBFF" />
          <LoadingText>OCR 처리 중...</LoadingText>
        </LoadingOverlay>
      )}

      <BottomBar style={{ bottom: insets.bottom + 24 }}>
        <GalleryButton disabled={isBusy} onPress={handleGalleryPick}>
          <Ionicons name="images" size={28} color="#E6F1F7" />
        </GalleryButton>
        <Shutter disabled={isBusy} onPress={handleCapture} />
        <Spacer />
        <Progress />
      </BottomBar>
    </Container>
  );
}

const Container = styled(View)`
  flex: 1;
  background-color: #000;
`;

const Header = styled.View`
  position: absolute;
  left: 24px;
  right: 24px;
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
  width: 88%;
  height: 62%;
  border-radius: 18px;
  overflow: hidden;
  position: relative;
`;

const Frame = styled.View`
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
  width: 44px;
  height: 44px;
  border-color: #36dbff;
`;

const CornerTL = styled(CornerBase)`
  left: 12px;
  top: 12px;
  border-top-width: 8px;
  border-left-width: 8px;
  border-top-left-radius: 12px;
`;
const CornerTR = styled(CornerBase)`
  right: 12px;
  top: 12px;
  border-top-width: 8px;
  border-right-width: 8px;
  border-top-right-radius: 12px;
`;
const CornerBL = styled(CornerBase)`
  left: 12px;
  bottom: 12px;
  border-bottom-width: 8px;
  border-left-width: 8px;
  border-bottom-left-radius: 12px;
`;
const CornerBR = styled(CornerBase)`
  right: 12px;
  bottom: 12px;
  border-bottom-width: 8px;
  border-right-width: 8px;
  border-bottom-right-radius: 12px;
`;

const BottomBar = styled.View`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 24px;
  align-items: center;
`;

const GalleryButton = styled.Pressable`
  position: absolute;
  left: 40px;
  width: 56px;
  height: 56px;
  border-radius: 28px;
  background-color: rgba(54, 219, 255, 0.3);
  align-items: center;
  justify-content: center;
`;

const Shutter = styled.Pressable`
  width: 76px;
  height: 76px;
  border-radius: 38px;
  background-color: rgba(255,255,255,0.9);
  border-width: 5px;
  border-color: rgba(255,255,255,0.4);
`;

const Spacer = styled.View`
  width: 56px;
  height: 56px;
  position: absolute;
  right: 40px;
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
