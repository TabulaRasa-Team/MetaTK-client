import React from "react";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { TYPOGRAPHY } from "../../constants/typography";

type Props = {
  iconName: React.ComponentProps<typeof Ionicons>["name"];
  label: string;
  onPress?: () => void;
};

export default function MenuItem({ iconName, label, onPress }: Props) {
  return (
    <Item onPress={onPress}>
      <IconWrap>
        <Ionicons name={iconName} size={18} color="#1BE1FF" />
      </IconWrap>
      <ItemText>{label}</ItemText>
    </Item>
  );
}

const Item = styled.Pressable`
  flex-direction: row;
  align-items: center;
  gap: 10px;
  padding: 10px 4px;
`;

const IconWrap = styled.View`
  width: 36px;
  height: 36px;
  border-radius: 12px;
  align-items: center;
  justify-content: center;
  background-color: rgba(19, 57, 86, 0.65);
`;

const ItemText = styled.Text`
  color: #97C3DC;
  ${TYPOGRAPHY.DOCS_1}
`;


