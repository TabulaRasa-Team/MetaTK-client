import React, { useState, useMemo } from "react";
import { View, ScrollView, SafeAreaView, ActivityIndicator, Text } from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import TitleSubtitle from "../../components/common/TitleSubtitle";
import CouponItem from "../../components/coupon/CouponItem";
import BackButton from "../../components/common/BackButton";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { CouponStackParamList } from "../../types/navigation";
import { useCoupons } from "../../hooks/api/useCoupons";
import type { CouponSortType } from "../../types/api";

type SortType = 'latest' | 'oldest' | 'expiring';

export default function CouponListScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<CouponStackParamList>>();
  const [sortType, setSortType] = useState<SortType>('latest');
  const [showSortMenu, setShowSortMenu] = useState(false);

  const apiSortType: CouponSortType = useMemo(() => {
    switch (sortType) {
      case 'latest': return 'recent';
      case 'oldest': return 'old';
      case 'expiring': return 'expiration';
    }
  }, [sortType]);

  const { data: couponsData, isLoading, error } = useCoupons(apiSortType);

  const getCouponStatus = (expiration: string): 'available' | 'expired' | 'used' => {
    const expirationDate = new Date(expiration);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (expirationDate < today) {
      return 'expired';
    }
    return 'available';
  };

  const getStoreTypeLabel = (storeType: string): string => {
    const typeMap: Record<string, string> = {
      'food': '음식점',
      'cafe': '카페',
      'bar': '호프바',
    };
    return typeMap[storeType] || storeType;
  };

  const getSortLabel = (type: SortType) => {
    switch (type) {
      case 'latest': return '최신순';
      case 'oldest': return '오래된순';
      case 'expiring': return '유효기간 얼마 안 남은 순';
    }
  };

  const handleSortSelect = (type: SortType) => {
    setSortType(type);
    setShowSortMenu(false);
  };

  return (
    <Container>
      <ScrollView contentContainerStyle={{ padding: 16, gap: 16 }}>
        <BackButton style={{marginBottom: 12}}/>
        <TitleSubtitle title="보유 중인 메타쿠폰" subtitle="유효기간을 살펴보세요" />

        <SortContainer>
          <SortButton onPress={() => setShowSortMenu(!showSortMenu)}>
            <SortText>{getSortLabel(sortType)}</SortText>
            <Ionicons name="filter" size={20} color="#36DBFF" />
          </SortButton>

          {showSortMenu && (
            <SortMenu>
              <SortOption
                onPress={() => handleSortSelect('latest')}
                $isSelected={sortType === 'latest'}
              >
                <SortOptionText $isSelected={sortType === 'latest'}>
                  최신순
                </SortOptionText>
                {sortType === 'latest' && (
                  <Ionicons name="checkmark" size={20} color="#36DBFF" />
                )}
              </SortOption>

              <SortOption
                onPress={() => handleSortSelect('oldest')}
                $isSelected={sortType === 'oldest'}
              >
                <SortOptionText $isSelected={sortType === 'oldest'}>
                  오래된순
                </SortOptionText>
                {sortType === 'oldest' && (
                  <Ionicons name="checkmark" size={20} color="#36DBFF" />
                )}
              </SortOption>

              <SortOption
                onPress={() => handleSortSelect('expiring')}
                $isSelected={sortType === 'expiring'}
              >
                <SortOptionText $isSelected={sortType === 'expiring'}>
                  유효기간 얼마 안 남은 순
                </SortOptionText>
                {sortType === 'expiring' && (
                  <Ionicons name="checkmark" size={20} color="#36DBFF" />
                )}
              </SortOption>
            </SortMenu>
          )}
        </SortContainer>

        <View style={{ gap: 16 }}>
          {coupons.map((c, idx) => (
            <CouponItem
              key={`${c.name}-${idx}`}
              category={c.category}
              name={c.name}
              expireText={c.expireText}
              status={c.status}
              onPress={() => navigation.navigate('CouponDetailedScreen', {
                id: c.id,
                name: c.name,
                category: c.category,
                expires: c.expireText.replace('~ ', ''),
                address: c.address,
                qrValue: JSON.stringify({ id: c.id, name: c.name })
              })}
            />
          ))}
        </View>
        
      </ScrollView>
    </Container>
  );
}

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #101418;
`;

const SortContainer = styled.View`
  position: relative;
  align-items: flex-end;
  z-index: 10;
`;

const SortButton = styled.Pressable`
  flex-direction: row;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background-color: rgba(18, 59, 100, 0.3);
  border-radius: 8px;
  border-width: 1px;
  border-color: rgba(54, 219, 255, 0.3);
`;

const SortText = styled.Text`
  color: #97C3DC;
  font-size: 14px;
`;

const SortMenu = styled.View`
  position: absolute;
  top: 44px;
  right: 0;
  min-width: 220px;
  background-color: rgba(18, 59, 100, 0.95);
  border-radius: 12px;
  border-width: 1px;
  border-color: rgba(54, 219, 255, 0.3);
  padding: 8px;
  gap: 4px;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.3;
  shadow-radius: 8px;
  elevation: 5;
`;

const SortOption = styled.Pressable<{ $isSelected: boolean }>`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  border-radius: 8px;
  background-color: ${({ $isSelected }: { $isSelected: boolean }) =>
    $isSelected ? 'rgba(54, 219, 255, 0.1)' : 'transparent'};
`;

const SortOptionText = styled.Text<{ $isSelected: boolean }>`
  color: ${({ $isSelected }: { $isSelected: boolean }) => $isSelected ? '#36DBFF' : '#97C3DC'};
  font-size: 14px;
  flex: 1;
`;