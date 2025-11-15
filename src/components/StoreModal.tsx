import React, { useMemo } from "react";
import { ActivityIndicator, Modal, View } from "react-native";
import styled from "styled-components/native";
import { TYPOGRAPHY } from "../constants/typography";
import { useStoreDetail } from "../hooks/api/useStoreDetail";
import { getTodayOperatingHours } from "../utils/operatingHours";
import Button from "./ui/Button";

type Shares = { a: number; b: number; c: number };

type Props = {
  visible: boolean;
  onClose: () => void;
  storeId?: string;
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
  storeId,
  title,
  team,
  hours,
  shares = { a: 38, b: 34, c: 28 },
  onPressInfo,
  onPressConquer,
}: Props) {
  const { data: storeDetail, isLoading } = useStoreDetail(visible ? storeId || null : null);

  const displayTitle = storeDetail?.store_name || title || '';
  const displayHours = storeDetail ? getTodayOperatingHours(storeDetail.operating_hours) : hours;

  const ratioData = useMemo(() => {
    if (storeDetail?.ratio) {
      const ratio = storeDetail.ratio as any;
      return {
        goguryeo: ratio.goguryeo_ratio_ratio ?? ratio.goguryeo_ratio ?? 0,
        baekjae: ratio.baekjae_ratio_ratio ?? ratio.baekjae_ratio ?? 0,
        shinla: ratio.shinla_ratio_ratio ?? ratio.shinla_ratio ?? 0,
      };
    }
    return { goguryeo: shares?.a ?? 0, baekjae: shares?.b ?? 0, shinla: shares?.c ?? 0 };
  }, [storeDetail, shares]);

  // 미점령 상태 확인 (모든 비율이 0)
  const isUnoccupied = ratioData.goguryeo === 0 && ratioData.baekjae === 0 && ratioData.shinla === 0;
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Overlay onPress={onClose}>
        <Card pointerEvents="box-none">
          <HeaderRow>
            <TitleText>{displayTitle}</TitleText>
            <CloseButton onPress={onClose}>
              <CloseText>×</CloseText>
            </CloseButton>
          </HeaderRow>

          {isLoading ? (
            <LoadingContainer>
              <ActivityIndicator size="small" color="#36DBFF" />
            </LoadingContainer>
          ) : (
            <>
              <View>
                {team ? <BodyText>현재 점령국 : {team}</BodyText> : null}
                {displayHours ? (
                  <BodyText style={{ marginTop: 12 }}>
                    영업시간: {displayHours}
                  </BodyText>
                ) : null}
              </View>

              {isUnoccupied ? (
                <EmptyBarWrap>
                  <EmptyBarText>미점령</EmptyBarText>
                </EmptyBarWrap>
              ) : (
                <BarWrap>
                  <BarSegment
                    style={{
                      flex: ratioData.goguryeo,
                      backgroundColor: 'rgba(199, 52, 52, 0.40)',
                    }}
                  >
                    <BarLabel>{ratioData.goguryeo.toFixed(1)}%</BarLabel>
                  </BarSegment>
                  <BarSegment
                    style={{
                      flex: ratioData.baekjae,
                      backgroundColor: 'rgba(45, 62, 255, 0.40)',
                    }}
                  >
                    <BarLabel>{ratioData.baekjae.toFixed(1)}%</BarLabel>
                  </BarSegment>
                  <BarSegment
                    style={{
                      flex: ratioData.shinla,
                      backgroundColor: 'rgba(255, 153, 45, 0.40)',
                    }}
                  >
                    <BarLabel>{ratioData.shinla.toFixed(1)}%</BarLabel>
                  </BarSegment>
                </BarWrap>
              )}
              <View>
                <Button title="가게 정보 보기" onPress={onPressInfo} variant="primary" />
                <Button title="점령하기" onPress={onPressConquer} variant="secondary" />
              </View>
            </>
          )}
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

const EmptyBarWrap = styled.View`
  margin-top: 16px;
  height: 32px;
  border-radius: 16px;
  background-color: rgba(229, 231, 235, 0.15);
  align-items: center;
  justify-content: center;
`;

const EmptyBarText = styled.Text`
  color: #8795a1;
  ${TYPOGRAPHY.SECTION_1}
`;

const BarSegment = styled.View`
  align-items: center;
  justify-content: center;
`;

const BarLabel = styled.Text`
  color: #e6f1f7;
  ${TYPOGRAPHY.DOCS_1}
`;

const LoadingContainer = styled.View`
  padding: 20px;
  align-items: center;
  justify-content: center;
`;

