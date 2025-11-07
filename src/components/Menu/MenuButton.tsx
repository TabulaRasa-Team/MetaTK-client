import React from "react";
import styled from "styled-components/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from "../Icon/Icon";

type Props = {
  onPress?: () => void;
};

export default function MenuButton({ onPress }: Props) {
  const insets = useSafeAreaInsets();
  return (
    <Container style={{ top: insets.top + 12 }}>
      <Button onPress={onPress} accessibilityLabel="메뉴">
        <Icon name="menu" width={20} height={14} />
      </Button>
    </Container>
  );
}

const Container = styled.View`
  position: absolute;
  right: 12px;
`;

const Button = styled.Pressable`
  width: 44px;
  height: 44px;
  border-radius: 12px;
  align-items: center;
  justify-content: center;
  background-color: rgba(7, 24, 40, 0.9);
  border-width: 1px;
  border-color: rgba(255, 255, 255, 0.06);
  shadow-color: #000;
  shadow-opacity: 0.3;
  shadow-radius: 8px;
  shadow-offset: 0px 2px;
  elevation: 4;
`;