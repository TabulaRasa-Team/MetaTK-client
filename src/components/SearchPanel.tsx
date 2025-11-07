import React, { useMemo, useRef, useState } from "react";
import styled from "styled-components/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Animated } from "react-native";
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import OverallStatus from "./OverallStatus";
import { TYPOGRAPHY } from "../constants/typography";
import Marker from "./Marker";

type Props = {
  query: string;
  onChangeQuery: (text: string) => void;
  onSubmit?: () => void;
  onPressAction?: () => void;
  teamLabel?: string;
};

export default function SearchPanel({
  query,
  onChangeQuery,
  onSubmit,
  onPressAction,
  teamLabel = "",
}: Props) {
  const insets = useSafeAreaInsets();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['15%', '50%', '90%'], []);
  const [sheetIndex, setSheetIndex] = useState(0);

  return (
    <Container pointerEvents="box-none" $bottomPadding={0}>
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose={false}
        onChange={(i) => setSheetIndex(i)}
        detached
        bottomInset={insets.bottom + 12}
        style={{ width: sheetIndex === 0 ? '96%' : '96%', alignSelf: 'center', marginHorizontal: 8, gap: 24}}
        backgroundStyle={{
          backgroundColor: 'rgba(7, 24, 40, 0.50)',
          borderRadius: 28,
        }}
        handleIndicatorStyle={{ backgroundColor: '#36DBFF', height: 6, width: 64 }}
      >
        <BottomSheetView style={{ paddingHorizontal: 16, paddingBottom: insets.bottom + 12, paddingTop: 8, gap: 24 }}>
          <Row>
            <InputWrapper>
              <Ionicons name="search" size={20} color="#36DBFF" />
              <StyledTextInput
                value={query}
                onChangeText={onChangeQuery}
                onSubmitEditing={onSubmit}
                placeholder="검색"
                placeholderTextColor="#97C3DC"
                returnKeyType="search"
              />
            </InputWrapper>

            <ActionButton onPress={onPressAction}>
              <ActionLabel>{teamLabel}</ActionLabel>
            </ActionButton>
          </Row>
          {sheetIndex > 0 && (
          <Content>
            <ContentContainer>
              <SectionTitle>나의 팀</SectionTitle>
              <TeamCard>
                <TeamRow>
                  <TeamBadge>
                    <ActionLabel>民</ActionLabel>
                  </TeamBadge>
                  <TeamTexts>
                    <TeamName>백제</TeamName>
                    <TeamSub>국민으로 살기 +283일</TeamSub>
                  </TeamTexts>
                </TeamRow>
              </TeamCard>
            </ContentContainer>
            <ContentContainer>
            <SectionTitle>근처 점령할만한 땅</SectionTitle>
              <Horizontal>
                  <Marker storeTitle="만주점" teamLabel="고구려" />
                  <Marker storeTitle="한양카페" teamLabel="고구려" />
                  <Marker storeTitle="한강유역백반" teamLabel="고구려" />
                  <Marker storeTitle="척화비국수" teamLabel="고구려" />
              </Horizontal>
            </ContentContainer>
            <ContentContainer>
              <OverallStatus
                data={[
                  { name: '신라', value: 33, color: '#E19B2E' },
                  { name: '고구려', value: 34, color: '#B03C3C' },
                  { name: '백제', value: 33, color: '#3D63FF' },
                ]}
              />
            </ContentContainer>
          </Content>
          )}
        </BottomSheetView>
      </BottomSheet>
    </Container>
  );
}

const Container = styled(Animated.View)<{ $bottomPadding: number }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  alignSelf: 'center';
  z-index: 10;
  justify-content: center;
  align-items: center;
  padding-bottom: ${({ $bottomPadding }: { $bottomPadding: number }) => $bottomPadding}px;
`;

const Row = styled.View`
  flex-direction: row;
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
`;

const InputWrapper = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  padding-horizontal: 12px;
  border-radius: 10px;
  height: 44px;
  background: rgba(18, 59, 100, 0.20);
`;

const StyledTextInput = styled.TextInput`
  flex: 1;
  color: #97C3DC;
  margin-left: 8px;
  font-size: 16px;
`;

const ActionButton = styled.Pressable`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  align-items: center;
  justify-content: center;
  background-color: #36DBFF;
`;

const ActionLabel = styled.Text`
  color: #0a141c;
`;

const Content = styled.View`
  width: 100%;
  margin-top: 12px;
  gap: 24px;
`;

const SectionTitle = styled.Text`
  color: #97C3DC;
  ${TYPOGRAPHY.SECTION_2}
`;

const ContentContainer = styled.View`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
`;

const TeamCard = styled.View`
  width: 100%;
  padding: 14px;
  border-radius: 14px;
  background: rgba(18, 59, 100, 0.25);
  border-width: 1px;
  border-color: rgba(255, 255, 255, 0.06);
`;

const TeamRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 12px;
`;

const TeamBadge = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background: #3D63FF;
  align-items: center;
  justify-content: center;
`;

const TeamTexts = styled.View`
  flex: 1;
`;

const TeamName = styled.Text`
  color: #E6F1F7;
  ${TYPOGRAPHY.SECTION_1}
`;

const TeamSub = styled.Text`
  color: #97C3DC;
  margin-top: 2px;
`;

const Horizontal = styled.View`
  ddisplay: flex;
  padding: 16px 8px;
  justify-content: space-between;
  align-items: flex-start;
  align-self: stretch;
  flex-direction: row;
  border-radius: 10px;
  background: rgba(18, 59, 100, 0.20);
  border-width: 1px;
  border-color: rgba(255, 255, 255, 0.06);
`;