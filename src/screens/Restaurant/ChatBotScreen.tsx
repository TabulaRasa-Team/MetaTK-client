import { Ionicons } from "@expo/vector-icons";
import type { NavigationProp, RouteProp } from "@react-navigation/native";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import { FlatList, KeyboardAvoidingView, Platform, SafeAreaView, ActivityIndicator } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { TYPOGRAPHY } from "../../constants/typography";
import type { RestaurantStackParamList, RootStackParamList } from "../../types/navigation";

const API_URL = process.env.EXPO_PUBLIC_OCR_API_URL;

type ChatBotScreenRouteProp = RouteProp<RestaurantStackParamList, 'ChatBotScreen'>;

type Message = {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
};

export default function ChatBotScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<ChatBotScreenRouteProp>();
  const insets = useSafeAreaInsets();
  const storeId = route.params?.storeId;

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '가게 사장님이 작성하신 내용을 바탕으로 답변해드립니다',
      isUser: false,
      timestamp: '어제 9:41',
    },
    {
      id: '2',
      text: '주주원 부산광역시 강서구에 위치하는 중국집입니다.',
      isUser: false,
      timestamp: '',
    },
    {
      id: '3',
      text: '하이',
      isUser: true,
      timestamp: '',
    },
    {
      id: '4',
      text: '안녕하세요',
      isUser: false,
      timestamp: '',
    },
    {
      id: '5',
      text: '너네 집 대표메뉴가 뭐야',
      isUser: true,
      timestamp: '',
    },
    {
      id: '6',
      text: '짜장면도 잘하구요, 탕수육도 기가막히게 합니다.',
      isUser: false,
      timestamp: '',
    },
    {
      id: '7',
      text: '확인했다~~',
      isUser: true,
      timestamp: '',
    },
  ]);

  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendQuestion = async (question: string) => {
    if (!storeId) {
      throw new Error('가게 정보를 찾을 수 없습니다.');
    }

    try {
      const response = await fetch(`${API_URL}/store/question`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          store_id: storeId,
          question: question,
        }),
      });

      if (!response.ok) {
        throw new Error('API 요청 실패');
      }

      const data = await response.json();
      return data.answer;
    } catch (error) {
      console.error('챗봇 API 에러:', error);
      throw error;
    }
  };

  const handleSend = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: '',
    };

    const question = inputText;
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const answer = await sendQuestion(question);

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: answer,
        isUser: false,
        timestamp: '',
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: '죄송합니다. 답변을 가져오는데 실패했습니다. 다시 시도해주세요.',
        isUser: false,
        timestamp: '',
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderMessage = ({ item }: { item: Message }) => {
    if (item.isUser) {
      return (
        <UserMessageContainer>
          <UserBubble>
            <MessageText isUser>{item.text}</MessageText>
          </UserBubble>
        </UserMessageContainer>
      );
    }

    return (
      <BotMessageContainer>
        {item.timestamp && <Timestamp>{item.timestamp}</Timestamp>}
        <BotBubble>
          <MessageText isUser={false}>{item.text}</MessageText>
        </BotBubble>
      </BotMessageContainer>
    );
  };

  return (
    <Container style={{ paddingTop: insets.top }}>
      <Header>
        <BackButton onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#36DBFF" />
          <BackText>뒤로가기</BackText>
        </BackButton>
        <HeaderInfo>
          <StoreName>주주원</StoreName>
          <PhoneNumber>전화번호 : 051-972-078</PhoneNumber>
        </HeaderInfo>
      </Header>

      <ChatArea>
        <FlatList
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 20 }}
        />
      </ChatArea>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        <InputContainer style={{ paddingBottom: insets.bottom + 16 }}>
          <Input
            value={inputText}
            onChangeText={setInputText}
            placeholder="메세지를 입력하세요."
            placeholderTextColor="#8795a1"
            onSubmitEditing={handleSend}
            returnKeyType="send"
            editable={!isLoading}
          />
          <SendButton onPress={handleSend} disabled={isLoading}>
            {isLoading ? (
              <ActivityIndicator size="small" color="#36DBFF" />
            ) : (
              <Ionicons name="send" size={24} color="#36DBFF" />
            )}
          </SendButton>
        </InputContainer>
      </KeyboardAvoidingView>
    </Container>
  );
}

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #101418;
`;

const Header = styled.View`
  padding: 16px 20px;
  border-bottom-width: 1px;
  border-bottom-color: rgba(255, 255, 255, 0.1);
`;

const BackButton = styled.Pressable`
  flex-direction: row;
  align-items: center;
  margin-bottom: 12px;
`;

const BackText = styled.Text`
  color: #36DBFF;
  ${TYPOGRAPHY.SECTION_1}
  margin-left: 4px;
`;

const HeaderInfo = styled.View`
  gap: 4px;
`;

const StoreName = styled.Text`
  color: #36DBFF;
  ${TYPOGRAPHY.SUB_TITLE}
  font-size: 28px;
  font-weight: bold;
`;

const PhoneNumber = styled.Text`
  color: #8795a1;
  ${TYPOGRAPHY.SECTION_2}
`;

const ChatArea = styled.View`
  flex: 1;
`;

const Timestamp = styled.Text`
  color: #8795a1;
  ${TYPOGRAPHY.SECTION_2}
  font-size: 12px;
  text-align: center;
  margin-bottom: 8px;
`;

const BotMessageContainer = styled.View`
  margin-bottom: 16px;
  align-items: flex-start;
`;

const BotBubble = styled.View`
  background-color: #3B7FA3;
  border-radius: 20px;
  border-top-left-radius: 4px;
  padding: 12px 16px;
  max-width: 75%;
`;

const UserMessageContainer = styled.View`
  margin-bottom: 16px;
  align-items: flex-end;
`;

const UserBubble = styled.View`
  background-color: #E6F1F7;
  border-radius: 20px;
  border-top-right-radius: 4px;
  padding: 12px 16px;
  max-width: 75%;
`;

const MessageText = styled.Text<{ isUser: boolean }>`
  color: ${({ isUser }: { isUser: boolean }) => (isUser ? '#101418' : '#E6F1F7')};
  ${TYPOGRAPHY.SECTION_1}
  line-height: 20px;
`;

const InputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 12px 16px;
  border-top-width: 1px;
  border-top-color: rgba(255, 255, 255, 0.1);
  gap: 12px;
`;

const Input = styled.TextInput`
  flex: 1;
  height: 48px;
  background-color: rgba(255, 255, 255, 0.08);
  border-radius: 24px;
  padding: 0 20px;
  color: #E6F1F7;
  ${TYPOGRAPHY.SECTION_1}
`;

const SendButton = styled.Pressable`
  width: 48px;
  height: 48px;
  align-items: center;
  justify-content: center;
`;
