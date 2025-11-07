import React from "react";
import { View, ScrollView, SafeAreaView } from "react-native";
import styled from "styled-components/native";
import TitleSubtitle from "../../components/common/TitleSubtitle";
import CouponItem from "../../components/coupon/CouponItem";
import BackButton from "../../components/common/BackButton";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { CouponStackParamList } from "../../types/navigation";

export default function CouponListScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<CouponStackParamList>>();
  const coupons = [
    { id: 'coupon1', category: '음식점', name: '주주원', expireText: '~ 2025.12.25', status: 'available' as const, address: '부산광역시 강서구 죽림동 1061번지 2층' },
    { id: 'coupon2', category: '음식점', name: '서정헌', expireText: '~ 2025.09.26', status: 'expired' as const },
    { id: 'coupon3', category: '카페', name: '권민재', expireText: '~ 2025.12.09', status: 'used' as const },
    { id: 'coupon4', category: '호프바', name: '박가온', expireText: '~ 2025.12.09', status: 'available' as const },
    { id: 'coupon5', category: '카페', name: '권민재', expireText: '~ 2025.12.09', status: 'available' as const },
  ];

  return (
    <Container>
      <ScrollView contentContainerStyle={{ padding: 16, gap: 16 }}>
        <BackButton style={{marginBottom: 12}}/>
        <TitleSubtitle title="보유 중인 메타쿠폰" subtitle="유효기간을 살펴보세요" />
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