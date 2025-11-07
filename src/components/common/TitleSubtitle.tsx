import React from "react";
import styled from "styled-components/native";
import { TYPOGRAPHY } from "../../constants/typography";
import { TEXT_COLORS } from "@/src/constants/colors";

type Props = {
  title: string;
  subtitle?: string;
  style?: any;
};

export default function TitleSubtitle({ title, subtitle, style }: Props) {
  return (
    <Wrap style={style}>
      <Title>{title}</Title>
      {subtitle ? <Subtitle>{subtitle}</Subtitle> : null}
    </Wrap>
  );
}

const Wrap = styled.View`
  padding: 0 4px;
  gap: 8px;
`;

const Title = styled.Text`
  color: #ffffff;
  ${TYPOGRAPHY.HEADLINE_1}
`;

const Subtitle = styled.Text`
  color: #ffffff;
  ${TYPOGRAPHY.SECTION_1}
`;


