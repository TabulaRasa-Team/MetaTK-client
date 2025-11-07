import React from "react";
import styled from "styled-components/native";
import { TYPOGRAPHY } from "../../constants/typography";

type ButtonVariant = 'primary' | 'secondary';

type Props = {
  title: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  style?: any;
};

export default function Button({ title, onPress, variant = 'primary', style }: Props) {
  return (
    <Btn onPress={onPress} $variant={variant} style={style}>
      <BtnText $variant={variant}>{title}</BtnText>
    </Btn>
  );
}

const Btn = styled.Pressable<{ $variant: ButtonVariant }>`
  margin-top: ${({ $variant }: { $variant: ButtonVariant }) => ($variant === 'primary' ? '16px' : '12px')};
  height: 52px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  ${({ $variant }: { $variant: ButtonVariant }) =>
    $variant === 'primary'
      ? `border: 1px solid #000; background: rgba(18, 59, 100, 0.50);`
      : `background: rgba(56, 99, 142, 0.30);`}
`;

const BtnText = styled.Text<{ $variant: ButtonVariant }>`
  ${TYPOGRAPHY.SECTION_2}
  color: ${({ $variant }: { $variant: ButtonVariant }) => ($variant === 'primary' ? '#46DEFF' : '#E6F1F7')};
`;


