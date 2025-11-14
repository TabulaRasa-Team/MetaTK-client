import React, { useState, useMemo } from "react";
import { View, ScrollView, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
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

  // 더미 데이터
  const dummyCoupons = [
    {
      coupon_id: 'dummy-coupon-1',
      coupon_name: '1000원 할인 쿠폰',
      store_name: '카페보다',
      expiration: '2025-12-31',
      store_type: 'cafe' as const,
    },
    {
      coupon_id: 'dummy-coupon-2',
      coupon_name: '2000원 할인 쿠폰',
      store_name: '만주점',
      expiration: '2025-11-20',
      store_type: 'food' as const,
    },
    {
      coupon_id: 'dummy-coupon-3',
      coupon_name: '1500원 할인 쿠폰',
      store_name: '신라바',
      expiration: '2025-11-18',
      store_type: 'bar' as const,
    },
    {
      coupon_id: 'dummy-coupon-4',
      coupon_name: '3000원 할인 쿠폰',
      store_name: '한양카페',
      expiration: '2026-01-15',
      store_type: 'cafe' as const,
    },
    {
      coupon_id: 'dummy-coupon-5',
      coupon_name: '1000원 할인 쿠폰',
      store_name: '척화비국수',
      expiration: '2025-10-30',
      store_type: 'food' as const,
    },
  ];

  const apiSortType: CouponSortType = useMemo(() => {
    switch (sortType) {
      case 'latest': return 'recent';
      case 'oldest': return 'old';
      case 'expiring': return 'expiration';
    }
  }, [sortType]);

  const { data: couponsData, isLoading } = useCoupons(apiSortType);

  // API 데이터가 없거나 에러가 발생하면 더미 데이터 사용
  const displayCoupons = (couponsData?.coupons && couponsData.coupons.length > 0)
    ? couponsData.coupons
    : dummyCoupons;

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

        {isLoading ? (
          <LoadingContainer>
            <ActivityIndicator size="large" color="#36DBFF" />
            <LoadingText>쿠폰을 불러오는 중...</LoadingText>
          </LoadingContainer>
        ) : (
          <View style={{ gap: 16 }}>
            {displayCoupons.length === 0 ? (
              <EmptyContainer>
                <EmptyText>보유한 쿠폰이 없습니다.</EmptyText>
              </EmptyContainer>
            ) : (
              displayCoupons.map((coupon, idx) => (
                <CouponItem
                  key={`${coupon.coupon_id}-${idx}`}
                  category={getStoreTypeLabel(coupon.store_type)}
                  name={coupon.store_name}
                  expireText={`~ ${coupon.expiration}`}
                  status={getCouponStatus(coupon.expiration)}
                  onPress={() => navigation.navigate('CouponDetailedScreen', {
                    id: coupon.coupon_id,
                    name: coupon.store_name,
                    category: getStoreTypeLabel(coupon.store_type),
                    expires: coupon.expiration,
                    address: '',
                    qrValue: JSON.stringify({ id: coupon.coupon_id, name: coupon.coupon_name })
                  })}
                />
              ))
            )}
          </View>
        )}
        
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

const LoadingContainer = styled.View`
  padding: 40px 0;
  align-items: center;
  gap: 12px;
`;

const LoadingText = styled.Text`
  color: #97C3DC;
  font-size: 14px;
`;

const EmptyContainer = styled.View`
  padding: 40px 20px;
  align-items: center;
`;

const EmptyText = styled.Text`
  color: #97C3DC;
  font-size: 14px;
  text-align: center;
`;