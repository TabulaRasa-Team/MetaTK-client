import React, { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { NavigationProp } from "@react-navigation/native";
import type { RootStackParamList } from "../../types/navigation";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TYPOGRAPHY } from "../../constants/typography";

export default function OcrScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [permission, requestPermission] = useCameraPermissions();
  const insets = useSafeAreaInsets();
  const [isBusy, setIsBusy] = useState(false);

  useEffect(() => {
    if (!permission?.granted) requestPermission();
  }, [permission]);

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

      <BottomBar style={{ bottom: insets.bottom + 24 }}>
        <Shutter disabled={isBusy} onPress={() => {
          if (isBusy) return;
          // 촬영 트리거 → 확인 화면으로 이동
          // 실제 촬영/업로드 로직은 후속 단계에서 연결
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          setIsBusy(true);
          // 간단한 딜레이 후 이동
          setTimeout(() => {
            setIsBusy(false);
            navigation.navigate({ name: 'Register', params: { screen: 'OcrCheckingScreen' } });
          }, 300);
        }} />
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

const Shutter = styled.Pressable`
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
