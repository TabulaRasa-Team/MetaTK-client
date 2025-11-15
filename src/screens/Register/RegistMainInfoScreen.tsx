import TitleSubtitle from "@/src/components/common/TitleSubtitle";
import { Ionicons } from "@expo/vector-icons";
import type { NavigationProp, RouteProp } from "@react-navigation/native";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import { Modal, SafeAreaView } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styled from "styled-components/native";
import BackButton from "../../components/common/BackButton";
import Button from "../../components/ui/Button";
import { TYPOGRAPHY } from "../../constants/typography";
import type { RootStackParamList, RegisterStackParamList } from "../../types/navigation";
import { formatPhoneNumber, formatTime } from "../../utils/formatters";
import { validateStoreInfo } from "../../utils/validators";

type RegistMainInfoScreenRouteProp = RouteProp<RegisterStackParamList, 'RegistMainInfoScreen'>;

type WeeklyHours = {
  [key: string]: { start: string; end: string };
};

const DAYS = ['월', '화', '수', '목', '금', '토', '일'];

export default function RegistMainInfoScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<RegistMainInfoScreenRouteProp>();

  const [storeName, setStoreName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [weeklyHours, setWeeklyHours] = useState<WeeklyHours>(
    DAYS.reduce((acc, day) => ({ ...acc, [day]: { start: '', end: '' } }), {})
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);

  const handlePhoneChange = (value: string) => {
    setPhone(formatPhoneNumber(value));
  };

  const handleTimeChange = (day: string, type: 'start' | 'end', value: string) => {
    setWeeklyHours(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [type]: formatTime(value),
      },
    }));
  };

  const handleNext = () => {
    if (!storeName.trim()) {
      setErrorMessage("가게명을 입력해주세요.");
      setShowErrorModal(true);
      return;
    }

    const error = validateStoreInfo(address, phone, weeklyHours);

    if (error) {
      setErrorMessage(error);
      setShowErrorModal(true);
      return;
    }

    navigation.navigate({
      name: 'Register',
      params: {
        screen: 'RegistPictureInfoScreen',
        params: {
          businessNumber: route.params?.businessNumber,
          representativeName: route.params?.representativeName,
          openingDate: route.params?.openingDate,
          storeName,
          address,
          phone,
          weeklyHours,
        }
      }
    });
  };

  return (
    <Container style={{ paddingBottom: insets.bottom + 16 }}>
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        enableOnAndroid
        enableAutomaticScroll={true}
        keyboardShouldPersistTaps="handled"
      >
        <BackButton style={{ marginBottom: 8 }} />
        <TitleSubtitle title="가게 정보를 입력해주세요." subtitle="이 정보는 나중에 바꿀 수 있어요." style={{ marginBottom: 48, marginLeft: 12}} />

        <Form>
          <Label>가게명</Label>
          <Input
            placeholder="주주원"
            placeholderTextColor="#8795a1"
            value={storeName}
            onChangeText={setStoreName}
          />

          <Label>주소</Label>
          <Input
            placeholder="부산광역시 강서구 가락대로 1393"
            placeholderTextColor="#8795a1"
            value={address}
            onChangeText={setAddress}
          />

          <Label>전화번호</Label>
          <Input
            placeholder="010-0326-0326"
            placeholderTextColor="#8795a1"
            value={phone}
            onChangeText={handlePhoneChange}
            keyboardType="phone-pad"
          />

          <Label>영업시간</Label>
          {DAYS.map(day => (
            <DayRow key={day}>
              <DayLabel>{day}</DayLabel>
              <TimeInputContainer>
                <TimeInput
                  placeholder="09:00"
                  placeholderTextColor="#8795a1"
                  value={weeklyHours[day].start}
                  onChangeText={(value: string) => handleTimeChange(day, 'start', value)}
                  keyboardType="number-pad"
                  maxLength={5}
                />
                <TimeSeparator>~</TimeSeparator>
                <TimeInput
                  placeholder="18:00"
                  placeholderTextColor="#8795a1"
                  value={weeklyHours[day].end}
                  onChangeText={(value: string) => handleTimeChange(day, 'end', value)}
                  keyboardType="number-pad"
                  maxLength={5}
                />
              </TimeInputContainer>
            </DayRow>
          ))}
        </Form>

        <Buttons>
           <Button
             title="다음으로"
             variant="primary"
             style={{ padding: '0 24px' }}
             onPress={handleNext}
           />
        </Buttons>
      </KeyboardAwareScrollView>

      <Modal
        visible={showErrorModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowErrorModal(false)}
      >
        <ModalOverlay>
          <ModalContent>
            <IconContainer>
              <Ionicons name="alert-circle" size={64} color="#FF6B6B" />
            </IconContainer>
            <ModalTitle>입력 오류</ModalTitle>
            <ModalMessage>{errorMessage}</ModalMessage>
            <ModalButton onPress={() => setShowErrorModal(false)}>
              <ModalButtonText>확인</ModalButtonText>
            </ModalButton>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </Container>
  );
} 

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #101418;
`;

const Form = styled.View`
  gap: 18px;
  margin-bottom: 40px;
  padding : 0 24px;
`;

const Label = styled.Text`
  color: #d7e0e7;
  ${TYPOGRAPHY.HEADLINE_2}
  margin-top: 8px;
`;

const Input = styled.TextInput`
  height: 56px;
  border-radius: 12px;
  padding: 0 16px;
  color: #e6f1f7;
  background: rgba(18, 59, 100, 0.25);
  border-width: 1px;
  border-color: rgba(255,255,255,0.08);
`;

const DayRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
`;

const DayLabel = styled.Text`
  color: #97c3dc;
  ${TYPOGRAPHY.SECTION_1}
  width: 24px;
`;

const TimeInputContainer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

const TimeInput = styled.TextInput`
  flex: 1;
  height: 48px;
  border-radius: 10px;
  padding: 0 12px;
  color: #e6f1f7;
  background: rgba(18, 59, 100, 0.25);
  border-width: 1px;
  border-color: rgba(255,255,255,0.08);
  text-align: center;
  ${TYPOGRAPHY.SECTION_1}
`;

const TimeSeparator = styled.Text`
  color: #97c3dc;
  ${TYPOGRAPHY.SECTION_1}
`;

const Buttons = styled.View`
  padding : 0 24px;
`;

const ModalOverlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.7);
  align-items: center;
  justify-content: center;
  padding: 24px;
`;

const ModalContent = styled.View`
  background-color: #1a2632;
  border-radius: 20px;
  padding: 32px 24px;
  align-items: center;
  width: 100%;
  max-width: 320px;
  border-width: 1px;
  border-color: rgba(255, 107, 107, 0.2);
`;

const IconContainer = styled.View`
  margin-bottom: 20px;
`;

const ModalTitle = styled.Text`
  color: #e6f1f7;
  ${TYPOGRAPHY.SUB_TITLE}
  margin-bottom: 12px;
  text-align: center;
`;

const ModalMessage = styled.Text`
  color: #97c3dc;
  ${TYPOGRAPHY.SECTION_1}
  text-align: center;
  margin-bottom: 28px;
  line-height: 22px;
`;

const ModalButton = styled.Pressable`
  background-color: #36dbff;
  border-radius: 12px;
  padding: 16px 32px;
  width: 100%;
  align-items: center;
`;

const ModalButtonText = styled.Text`
  color: #101418;
  ${TYPOGRAPHY.HEADLINE_1}
`;