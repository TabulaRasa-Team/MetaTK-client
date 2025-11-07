import React from "react";
import { View, Text } from "react-native";
import styled from "styled-components/native";
import { PieChart } from "react-native-gifted-charts";
import { TYPOGRAPHY } from "../constants/typography";
import { TEXT_COLORS } from "../constants/colors";

type Faction = {
  name: string;
  value: number; // percentage (0-100)
  color: string;
};

type Props = {
  data: Faction[];
};

export default function OverallStatus({ data }: Props) {
  const chartData = data.map((f) => ({
    value: f.value,
    color: f.color,
    text: `${Math.round(f.value)}%`,
  }));
  const leader = data.length > 0 ? data.reduce((prev, curr) => (curr.value > prev.value ? curr : prev), data[0]) : undefined;

  return (
      <Card>
        <Title>전체 삼국 현황</Title>
      <Text style={{ ...TYPOGRAPHY.SECTION_1, color: '#B8313E', textAlign: 'center', marginBottom: 12 }}>{leader ? `${leader.name}가 우세합니다` : ''}</Text>
      <Row>
        <View style={{ flex: 1, alignItems: "center", paddingVertical: 8 }}>
          <PieChart
            data={chartData}
            showText
            textColor="#E6F1F7"
            textSize={12}
            radius={78}
            innerRadius={32}
            innerCircleColor="rgba(7,24,40,0.5)"
          />
        </View>
        <Legend>
          {data.map((f) => (
            <LegendRow key={f.name}>
              <Dot style={{ backgroundColor: f.color }} />
              <LegendText>{f.name}</LegendText>
            </LegendRow>
          ))}
        </Legend>
      </Row>
    </Card>
  );
}

const Card = styled.View`
  width: 100%;
  padding: 14px;
  border-radius: 14px;
  background: rgba(18, 59, 100, 0.25);
  border-width: 1px;
  border-color: rgba(255, 255, 255, 0.06);
`;

const Title = styled.Text`
  color: #e6f1f7;
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 12px;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Legend = styled.View`
  width: 96px;
  gap: 8px;
`;

const LegendRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

const Dot = styled.View`
  width: 10px;
  height: 10px;
  border-radius: 5px;
`;

const LegendText = styled.Text`
  color: #97c3dc;
`;


