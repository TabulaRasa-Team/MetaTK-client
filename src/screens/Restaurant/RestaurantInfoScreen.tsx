import React from "react";
import { SafeAreaView, View, Image, ScrollView, ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import BackButton from "../../components/common/BackButton";
import { TYPOGRAPHY } from "../../constants/typography";
import { useRoute, useNavigation, RouteProp } from "@react-navigation/native";
import type { NavigationProp } from "@react-navigation/native";
import { RestaurantStackParamList, RootStackParamList } from "../../types/navigation";
import { useStoreDetailedInfo } from "../../hooks/api/useStoreDetailedInfo";
import { getTodayOperatingHours } from "../../utils/operatingHours";

type RestaurantInfoScreenRouteProp = RouteProp<RestaurantStackParamList, 'RestaurantInfoScreen'>;

export default function RestaurantInfoScreen() {
  const route = useRoute<RestaurantInfoScreenRouteProp>();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const storeId = route.params?.storeId;

  const { data: storeInfo, isLoading } = useStoreDetailedInfo(storeId);

  const displayHours = storeInfo ? getTodayOperatingHours(storeInfo.operating_hours) : '정보 없음';

  // 더미 데이터 (API 데이터가 없을 때 사용)
  const products = [
    { id: "p1", name: "류승찬", price: "-100,000원", img: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=400&q=80" },
    { id: "p2", name: "아이스 아메리카노", price: "5,100원", img: "https://images.unsplash.com/photo-1517705008128-361805f42e86?w=400&q=80" },
    { id: "p3", name: "아이스 아메리카노", price: "5,100원", img: "https://images.unsplash.com/photo-1551024709-8f23befc6cf7?w=400&q=80" },
    { id: "p4", name: "아이스 아메리카노", price: "5,100원", img: "https://images.unsplash.com/photo-1517705008128-361805f42e86?w=400&q=80" },
  ];

  const photos = new Array(9).fill(0).map((_, i) => ({
    id: `ph${i}`,
    img: `https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80&sig=${i}`,
  }));

  const getTeamNameFromRatio = () => {
    if (!storeInfo?.ratio) return '정보 없음';
    const { goguryeo_ratio, baekjae_ratio, shinla_ratio } = storeInfo.ratio;
    const max = Math.max(goguryeo_ratio, baekjae_ratio, shinla_ratio);
    if (max === goguryeo_ratio) return '고구려';
    if (max === baekjae_ratio) return '백제';
    return '신라';
  };

  if (isLoading) {
    return (
      <Container>
        <LoadingContainer>
          <ActivityIndicator size="large" color="#36DBFF" />
          <LoadingText>가게 정보를 불러오는 중...</LoadingText>
        </LoadingContainer>
      </Container>
    );
  }

  return (
    <Container>
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 120 }}>
        <BackButton style={{ marginBottom: 12 }} />

        <Title>{storeInfo?.store_name || '가게명 정보 없음'}</Title>

        <InfoWrap>
          <InfoRow>
            <Ionicons name="flag-outline" size={20} color="#B8C7D2" />
            <InfoKeyStrong>현재 점령국 :</InfoKeyStrong>
            <InfoVal>{getTeamNameFromRatio()}</InfoVal>
          </InfoRow>
          <InfoRow>
            <Ionicons name="time-outline" size={20} color="#B8C7D2" />
            <InfoKey>영업시간:</InfoKey>
            <InfoVal>{displayHours}</InfoVal>
          </InfoRow>
          <InfoRow>
            <Ionicons name="location-outline" size={20} color="#B8C7D2" />
            <InfoKey>주소 :</InfoKey>
            <InfoVal>{storeInfo?.address || '주소 정보 없음'}</InfoVal>
          </InfoRow>
          <InfoRow>
            <Ionicons name="call-outline" size={20} color="#B8C7D2" />
            <InfoKey>전화번호 :</InfoKey>
            <InfoVal>{storeInfo?.phone_number || '전화번호 정보 없음'}</InfoVal>
          </InfoRow>
        </InfoWrap>

        {storeInfo?.menus && storeInfo.menus.length > 0 && (
          <>
            <SectionDivider />
            <SectionTitle>인기 상품</SectionTitle>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 4 }}>
              {storeInfo.menus.map((menu, idx) => (
                <ProductCard key={`menu-${idx}`}>
                  <ProductImage
                    source={{ uri: menu.image.startsWith('data:') ? menu.image : `data:image/png;base64,${menu.image}` }}
                  />
                  <ProductName>{menu.name}</ProductName>
                  <ProductPrice>{menu.price.toLocaleString()}원</ProductPrice>
                </ProductCard>
              ))}
            </ScrollView>
          </>
        )}

        {storeInfo?.images && storeInfo.images.length > 0 && (
          <>
            <SectionDivider />
            <SectionTitle>가게 사진</SectionTitle>
            <PhotoGrid>
              {storeInfo.images.map((img, idx) => (
                <Photo
                  key={`photo-${idx}`}
                  source={{ uri: img.startsWith('data:') ? img : `data:image/png;base64,${img}` }}
                />
              ))}
            </PhotoGrid>
          </>
        )}
      </ScrollView>

      <BottomBar>
        <AskBtn onPress={() => navigation.navigate({ name: 'Restaurant', params: { screen: 'ChatBotScreen' } })}>
          <AskText>질문하기</AskText>
        </AskBtn>
      </BottomBar>
    </Container>
  );
}

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #101418;
`;

const Title = styled.Text`
  color: #e6f1f7;
  ${TYPOGRAPHY.SUB_TITLE}
`;

const InfoWrap = styled.View`
  margin-top: 16px;
  gap: 14px;
`;

const InfoRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

const InfoKey = styled.Text`
  color: #b8c7d2;
  ${TYPOGRAPHY.SECTION_1}
`;

const InfoKeyStrong = styled.Text`
  color: #b8c7d2;
  ${TYPOGRAPHY.HEADLINE_2}
`;

const InfoVal = styled.Text`
  color: #e6f1f7;
  ${TYPOGRAPHY.SECTION_1}
`;

const SectionDivider = styled.View`
  height: 1px;
  background-color: rgba(255,255,255,0.08);
  margin: 18px 0 12px 0;
`;

const SectionTitle = styled.Text`
  color: #e6f1f7;
  ${TYPOGRAPHY.HEADLINE_2}
  margin-bottom: 12px;
`;

const ProductCard = styled.View`
  width: 160px;
  padding: 8px;
`;

const ProductImage = styled(Image)`
  width: 140px;
  height: 140px;
  border-radius: 12px;
  background-color: #1a232c;
`;

const ProductName = styled.Text`
  color: #e6f1f7;
  ${TYPOGRAPHY.SECTION_1}
  margin-top: 8px;
`;

const ProductPrice = styled.Text`
  color: #e6f1f7;
  ${TYPOGRAPHY.HEADLINE_3}
  margin-top: 6px;
`;

const PhotoGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Photo = styled(Image)`
  width: 32%;
  height: 110px;
  border-radius: 10px;
  background-color: #1a232c;
  margin-bottom: 8px;
`;

const BottomBar = styled.View`
  position: absolute;
  left: 16px;
  right: 16px;
  bottom: 24px;
  align-items: center;
`;

const AskBtn = styled.Pressable`
  width: 100%;
  height: 56px;
  border-radius: 28px;
  align-items: center;
  justify-content: center;
  background-color: rgba(18,59,100,0.5);
`;

const AskText = styled.Text`
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