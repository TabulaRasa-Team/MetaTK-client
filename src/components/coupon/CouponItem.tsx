import React from "react";
import styled from "styled-components/native";
import { TYPOGRAPHY } from "../../constants/typography";

type Status = 'available' | 'expired' | 'used';

type Props = {
  category: string;
  name: string;
  expireText: string;
  status?: Status; 
  onPress?: () => void;
};

export default function CouponItem({ category, name, expireText, status = 'available', onPress }: Props) {
  const statusText = status === 'available' ? '사용가능' : status === 'expired' ? '만료' : '사용완료';
  const statusColor = status === 'available' ? '#C3C7C7' : '#505050';

  return (
    <Card onPress={onPress}>
      <Left>
        <Category>{category}</Category>
        <Name>{name}</Name>
        <Expire>유효기간 : {expireText}</Expire>
      </Left>
      <Right>
        <StatusText style={{ color: statusColor }}>{statusText}</StatusText>
      </Right>
    </Card>
  );
}

const Card = styled.Pressable`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-radius: 16px;
  background: rgba(7, 24, 40, 0.50);
`;

const Left = styled.View`
  gap: 6px;
`;

const Right = styled.View``;

const Category = styled.Text`
  color: #91D2D5;
  ${TYPOGRAPHY.DOCS_1}
`;

const Name = styled.Text`
  color: #E2E2E2;
  ${TYPOGRAPHY.HEADLINE_2}
`;

const Expire = styled.Text`
  color: #C3C7C7;
  ${TYPOGRAPHY.SECTION_2}
`;

const StatusText = styled.Text`
  ${TYPOGRAPHY.SECTION_2}
`;


