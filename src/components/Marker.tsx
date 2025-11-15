import { Text, View } from "react-native";
import styled from "styled-components/native";
import Icon from "./Icon/Icon";
import { PRIMARY_COLORS, TEXT_COLORS } from "../constants/colors";
import { TYPOGRAPHY } from "../constants/typography";

export default function Marker({ storeTitle, teamLabel }: { storeTitle: string, teamLabel: string }) {
  const getPinColor = (team: string): string => {
    switch (team) {
      case '고구려':
        return '#C73434';
      case '백제':
        return '#2D3EFF';
      case '신라':
        return '#FF992D';
      case '미점령':
        return '#E5E7EB';
      default:
        return '#E5E7EB';
    }
  };

  return (
    <Container>
      <Icon name="pin" primaryColor={getPinColor(teamLabel)} />
      <Text style={{ ...TYPOGRAPHY.SECTION_2, color: PRIMARY_COLORS.DEFAULT }}>{storeTitle}</Text>
      <Text style={{ ...TYPOGRAPHY.SECTION_2, color: TEXT_COLORS.SUB }}>{teamLabel}</Text>
    </Container>
  );
}

const Container = styled(View)`
  display: flex;
  width: 80px;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;