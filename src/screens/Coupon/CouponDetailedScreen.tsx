import React from "react";
import { View, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import QRCode from "react-native-qrcode-svg";
import BackButton from "../../components/common/BackButton";
import { useRoute } from "@react-navigation/native";
import type { RouteProp } from "@react-navigation/native";
import type { CouponStackParamList } from "../../types/navigation";
import { TYPOGRAPHY } from "../../constants/typography";
import { useCouponDetail } from "../../hooks/api/useCouponDetail";

type Route = RouteProp<CouponStackParamList, 'CouponDetailedScreen'>;

export default function CouponDetailedScreen() {
  const { params } = useRoute<Route>();
  const couponId = params.id;

  const { data: couponDetail, isLoading } = useCouponDetail(couponId);

  // 더미 데이터 맵
  const dummyCouponDetails: Record<string, any> = {
    'dummy-coupon-1': {
      coupon_id: 'dummy-coupon-1',
      coupon_name: '1000원 할인 쿠폰',
      store_name: '카페보다',
      expiration: '2025-12-31',
      store_type: 'cafe',
    },
    'dummy-coupon-2': {
      coupon_id: 'dummy-coupon-2',
      coupon_name: '2000원 할인 쿠폰',
      store_name: '만주점',
      expiration: '2025-11-20',
      store_type: 'food',
    },
    'dummy-coupon-3': {
      coupon_id: 'dummy-coupon-3',
      coupon_name: '1500원 할인 쿠폰',
      store_name: '신라바',
      expiration: '2025-11-18',
      store_type: 'drink',
    },
    'dummy-coupon-4': {
      coupon_id: 'dummy-coupon-4',
      coupon_name: '3000원 할인 쿠폰',
      store_name: '한양카페',
      expiration: '2026-01-15',
      store_type: 'cafe',
    },
    'dummy-coupon-5': {
      coupon_id: 'dummy-coupon-5',
      coupon_name: '1000원 할인 쿠폰',
      store_name: '척화비국수',
      expiration: '2025-10-30',
      store_type: 'food',
    },
  };

  // API 데이터가 없으면 더미 데이터 사용
  const displayCoupon = couponDetail || dummyCouponDetails[couponId];

  if (isLoading) {
    return (
      <Container>
        <LoadingContainer>
          <ActivityIndicator size="large" color="#36DBFF" />
          <LoadingText>쿠폰 정보를 불러오는 중...</LoadingText>
        </LoadingContainer>
      </Container>
    );
  }

  if (!displayCoupon) {
    return (
      <Container>
        <LoadingContainer>
          <LoadingText>쿠폰 정보를 찾을 수 없습니다.</LoadingText>
        </LoadingContainer>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <BackButton />
      </Header>

      <Content>
        <View style={{ gap: 12 }}>
          <QRWrap>
            <QRCode
              value={displayCoupon.coupon_id}
              size={260}
              backgroundColor="transparent"
              color="#62D0FF"
            />
          </QRWrap>
          <Title>{`${displayCoupon.coupon_name} *1000원* 할인권`}</Title>
          <Desc>아래에서 쿠폰을 사용할 수 있는 매장 정보를 확인해보세요</Desc>
        </View>

        <View style={{ gap: 8 }}>
          <SectionTitle>가게 정보</SectionTitle>
          <InfoRow>
            <InfoKey>가게명 :</InfoKey>
            <InfoValue>{displayCoupon.store_name}</InfoValue>
          </InfoRow>
          <InfoRow>
              <InfoKey>주소 :</InfoKey>
              <InfoValue>부산광역시 강서구 죽림동 1061번지 2층</InfoValue>
            </InfoRow>
          <InfoRow>
            <InfoKey>유효기간 :</InfoKey>
            <InfoValue>~ {displayCoupon.expiration} 까지</InfoValue>
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

const LoadingContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;

const LoadingText = styled.Text`
  color: #97C3DC;
  font-size: 14px;
`;