import React from "react";
import styled from "styled-components/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MenuItem from "./MenuItem";

type Props = {
  visible: boolean;
  onClose: () => void;
  onPressCoupon?: () => void;
  onPressScan?: () => void;
  onPressRegisterStore?: () => void;
};

export default function MenuPopover({ visible, onClose, onPressCoupon, onPressScan, onPressRegisterStore }: Props) {
  const insets = useSafeAreaInsets();
  if (!visible) return null;

  return (
    <Overlay onPress={onClose}>
      <Panel style={{ top: insets.top + 52 }}>
        <MenuItem iconName="pricetags-outline" label="메타쿠폰" onPress={onPressCoupon} />
        <Divider />
        <MenuItem iconName="scan-outline" label="메타쿠폰 스캔" onPress={onPressScan} />
        <Divider />
        <MenuItem iconName="storefront-outline" label="가게등록" onPress={onPressRegisterStore} />
      </Panel>
    </Overlay>
  );
}

const Overlay = styled.Pressable`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 20;
`;

const Panel = styled.View`
  position: absolute;
  right: 12px;
  width: 160px;
  padding: 16px;
  border-radius: 17.695px;
  background: rgba(7, 24, 40, 0.50);
  border-width: 1px;
  border-color: rgba(255, 255, 255, 0.08);
`;

const Divider = styled.View`
  height: 1px;
  background-color: rgba(255, 255, 255, 0.06);
`;


