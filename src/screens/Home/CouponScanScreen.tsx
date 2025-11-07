import React, { useEffect, useState } from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { TYPOGRAPHY } from "../../constants/typography";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function CouponScanScreen() {
  const navigation = useNavigation();
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (!permission?.granted) requestPermission();
  }, [permission]);

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
              onBarcodeScanned={(result) => {
                if (scanned) return;
                setScanned(true);
                navigation.goBack();
              }}
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
