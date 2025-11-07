import React from "react";
import { SafeAreaView, View } from "react-native";
import styled from "styled-components/native";
import QRCode from "react-native-qrcode-svg";
import BackButton from "../../components/common/BackButton";
import { useRoute } from "@react-navigation/native";
import type { RouteProp } from "@react-navigation/native";
import type { CouponStackParamList } from "../../types/navigation";
import { TYPOGRAPHY } from "../../constants/typography";

type Route = RouteProp<CouponStackParamList, 'CouponDetailedScreen'>;

export default function CouponDetailedScreen() {
  const { params } = useRoute<Route>();
  const { name, category, expires, address, qrValue } = params;

  return (
    <Container>
      <Header>
        <BackButton />
      </Header>

      <Content>
        <View style={{ gap: 12 }}>
          <QRWrap>
            <QRCode
              value={qrValue}
              size={260}
              backgroundColor="transparent"
              color="#62D0FF"
            />
          </QRWrap>
          <Title>{`${name} *1000원* 할인권`}</Title>
          <Desc>아래에서 쿠폰을 사용할 수 있는 매장 정보를 확인해보세요</Desc>
        </View>

        <View style={{ gap: 8 }}>
          <SectionTitle>가게 정보</SectionTitle>
          <InfoRow>
            <InfoKey>가게명 :</InfoKey>
            <InfoValue>{name}</InfoValue>
          </InfoRow>
          <InfoRow>
              <InfoKey>주소 :</InfoKey>
              <InfoValue>{address ? address : '부산광역시 강서구 죽림동 1061번지 2층'}</InfoValue>
            </InfoRow>
          <InfoRow>
            <InfoKey>유효기간 :</InfoKey>
            <InfoValue>~ {expires} 까지</InfoValue>
          </InfoRow>
        </View>

        <ExpandBtn>
          <ExpandText>확대하기</ExpandText>
        </ExpandBtn>
      </Content>
    </Container>
  );
}

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #111317;
`;

const Header = styled.View`
  padding: 16px;
`;

const Content = styled.View`
  padding: 16px;
  gap: 60px;
`;

const QRWrap = styled.View`
  align-self: center;
  padding: 16px;
  border-radius: 16px;
  background: rgba(7, 24, 40, 0.6);
  border-width: 1px;
  border-color: rgba(255,255,255,0.06);
`;

const Title = styled.Text`
  color: #e6f1f7;
  ${TYPOGRAPHY.HEADLINE_1}
  text-align: center;
`;

const Desc = styled.Text`
  color: #9fb2c1;
  ${TYPOGRAPHY.SECTION_2}
  text-align: center;
`;

const SectionTitle = styled.Text`
  color: #e6f1f7;
  ${TYPOGRAPHY.HEADLINE_2}
`;

const InfoRow = styled.View`
  flex-direction: row;
  gap: 6px;
`;

const InfoKey = styled.Text`
  color: #9fb2c1;
  ${TYPOGRAPHY.SECTION_2}
`;

const InfoValue = styled.Text`
  color: #e6f1f7;
  ${TYPOGRAPHY.SECTION_2}
`;

const ExpandBtn = styled.Pressable`
  margin-top: 8px;
  height: 56px;
  border-radius: 28px;
  align-items: center;
  justify-content: center;
  background: rgba(18,59,100,0.5);
`;

const ExpandText = styled.Text`
  color: #e6f1f7;
  ${TYPOGRAPHY.SECTION_1}
`;