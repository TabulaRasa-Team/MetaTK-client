import React from "react";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

type Props = {
  label?: string;
  onPress?: () => void;
  color?: string;
  style?: any;
};

export default function BackButton({ label = "뒤로가기", onPress, color = "#36DBFF", style }: Props) {
  const navigation = useNavigation();
  return (
    <Wrap style={style} onPress={onPress ?? (() => navigation.goBack())} accessibilityRole="button" accessibilityLabel={label}>
      <Ionicons name="chevron-back" size={22} color={color} />
      <Label style={{ color }}>{label}</Label>
    </Wrap>
  );
}

const Wrap = styled.Pressable`
  flex-direction: row;
  align-items: center;
  gap: 6px;
`;

const Label = styled.Text`
  font-size: 16px;
`;


