import React from "react";
import { SafeAreaView } from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { TYPOGRAPHY } from "../../constants/typography";
import Button from "../../components/ui/Button";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { NavigationProp } from "@react-navigation/native";
import type { RootStackParamList } from "../../types/navigation";

export default function RegistCompleteScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <Container>
      <Center>
        <Ring size={240}>
          <LinearGradient
            colors={["#23C5D9", "#1E3C63"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ width: "100%", height: "100%", borderRadius: 120, alignItems: "center", justifyContent: "center" }}
          >
            <Inner>
              <Ionicons name="checkmark" size={84} color="#49D2FF" />
            </Inner>
          </LinearGradient>
        </Ring>

        <Title>등록 완료!</Title>
        <Desc>가게 등록이 완료되었습니다</Desc>
        <Desc>이제부터 삼국의 국민들이</Desc>
        <Desc>당신의 가게를 점령하러 올 것입니다</Desc>
      </Center>

      <Buttons style={{ paddingBottom: insets.bottom + 16 }}>
        <Button
          title="완료"
          variant="primary"
          onPress={() => navigation.navigate({ name: 'Home', params: { screen: 'MainScreen' } })}
        />
      </Buttons>
    </Container>
  );
}

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #101418;
`;

const Center = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const Ring = styled.View<{ size: number }>`
  width: ${({ size }: { size: number }) => size}px;
  height: ${({ size }: { size: number }) => size}px;
  border-radius: ${({ size }: { size: number }) => size / 2}px;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
`;

const Inner = styled.View`
  width: 78%;
  height: 78%;
  border-radius: 999px;
  background-color: #0e141a;
  align-items: center;
  justify-content: center;
`;

const Title = styled.Text`
  color: #e6f1f7;
  ${TYPOGRAPHY.SUB_TITLE}
  margin-top: 8px;
`;

const Desc = styled.Text`
  color: #9fb2c1;
  ${TYPOGRAPHY.SECTION_2}
`;

const Buttons = styled.View`
  padding: 0 24px;
`;