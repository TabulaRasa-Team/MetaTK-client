import React from "react";
import { Modal, View } from "react-native";
import styled from "styled-components/native";
import { TYPOGRAPHY } from "../constants/typography";
import Button from "./ui/Button";

type Shares = { a: number; b: number; c: number };

type Props = {
  visible: boolean;
  onClose: () => void;
  title?: string;
  team?: string;
  hours?: string;
  shares?: Shares;
  onPressInfo?: () => void;
  onPressConquer?: () => void;
};

export default function StoreModal({
  visible,
  onClose,
  title,
  team,
  hours,
  shares = { a: 38, b: 34, c: 28 },
  onPressInfo,
  onPressConquer,
}: Props) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Overlay onPress={onClose}>
        <Card pointerEvents="box-none">
          <HeaderRow>
            <TitleText>{title ?? ''}</TitleText>
            <CloseButton onPress={onClose}>
              <CloseText>×</CloseText>
            </CloseButton>
          </HeaderRow>
          <View>
            {team ? <BodyText>현재 점령국 : {team}</BodyText> : null}
            {hours ? (
              <BodyText style={{ marginTop: 12 }}>
                영업시간: {hours}
              </BodyText>
            ) : null}
          </View>

          <BarWrap>
            <BarSegment style={{ flex: shares.a, backgroundColor: 'rgba(195, 122, 43, 0.40)' }}>
              <BarLabel>38%</BarLabel>
            </BarSegment>
            <BarSegment style={{ flex: shares.b, backgroundColor: 'rgba(39, 55, 193, 0.40)' }}>
              <BarLabel>34%</BarLabel>
            </BarSegment>
            <BarSegment style={{ flex: shares.c, backgroundColor: 'rgba(146, 47, 51, 0.40)' }}>
              <BarLabel>28%</BarLabel>
            </BarSegment>
          </BarWrap>
          <View>
            <Button title="가게 정보 보기" onPress={onPressInfo} variant="primary" />
            <Button title="점령하기" onPress={onPressConquer} variant="secondary" />
          </View>
        </Card>
      </Overlay>
    </Modal>
  );
}

const Overlay = styled.Pressable`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.45);
  align-items: center;
  justify-content: center;
`;

const Card = styled.View`
  width: 90%;
  border-radius: 24px;
  padding: 32px;
  gap: 8px;
  border-radius: 20px;
  background: rgba(1, 8, 17, 0.60);
`;

const HeaderRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const TitleText = styled.Text`
  color: #e6f1f7;
  ${TYPOGRAPHY.HEADLINE_1}
`;

const CloseButton = styled.Pressable`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  align-items: center;
  justify-content: center;
  background-color: rgba(255,255,255,0.06);
`;

const CloseText = styled.Text`
  color: #e6f1f7;
  font-size: 18px;
`;

const BodyText = styled.Text`
  color: #DBDBDB;
  ${TYPOGRAPHY.SECTION_1}
  margin-top: 6px;
`

const BarWrap = styled.View`
  margin-top: 16px;
  height: 32px;
  border-radius: 16px;
  overflow: hidden;
  flex-direction: row;
  background-color: rgba(255,255,255,0.06);
`;

const BarSegment = styled.View`
  align-items: center;
  justify-content: center;
`;

const BarLabel = styled.Text`
  color: #e6f1f7;
  ${TYPOGRAPHY.DOCS_1}
`;

// 버튼 스타일은 ui/PrimaryButton, ui/SecondaryButton으로 분리되었습니다.


