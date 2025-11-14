import React, { useState } from "react";
import { Image, SafeAreaView, View, ScrollView, TextInput, Modal, ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system/legacy";
import { Ionicons } from "@expo/vector-icons";
import TitleSubtitle from "@/src/components/common/TitleSubtitle";
import BackButton from "@/src/components/common/BackButton";
import Button from "@/src/components/ui/Button";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { NavigationProp, RouteProp } from "@react-navigation/native";
import type { RootStackParamList, RegisterStackParamList } from "../../types/navigation";
import { TYPOGRAPHY } from "../../constants/typography";
import { storeApi } from "../../utils/api/store";

type RegistPictureInfoScreenRouteProp = RouteProp<RegisterStackParamList, 'RegistPictureInfoScreen'>;

type MenuItem = {
  id: string;
  imageUri: string;
  name: string;
  price: string;
};

type UploadTileProps = {
  title: string;
  subtitle: string;
  images: string[];
  onPick: () => void;
  onRemove?: (index: number) => void;
};

function UploadTile({ title, subtitle, images, onPick, onRemove }: UploadTileProps) {
  return (
    <TileWrap>
      <TileTitle>
        {title} <TileSub>({subtitle})</TileSub>
      </TileTitle>
      <Tile onPress={onPick}>
        {images.length === 0 ? (
          <TileCenter>
            <Ionicons name="cloud-upload-outline" size={20} color="#CFEFFF" />
            <TileText>갤러리에서 선택</TileText>
          </TileCenter>
        ) : (
          <ImagesGrid>
            {images.map((uri, index) => (
              <ThumbContainer key={uri}>
                <Thumb source={{ uri }} />
                {onRemove && (
                  <RemoveButton onPress={() => onRemove(index)}>
                    <Ionicons name="close-circle" size={24} color="#FF6B6B" />
                  </RemoveButton>
                )}
              </ThumbContainer>
            ))}
          </ImagesGrid>
        )}
      </Tile>
    </TileWrap>
  );
}

export default function RegistPictureInfoScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<RegistPictureInfoScreenRouteProp>();

  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [storeImages, setStoreImages] = useState<string[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const addMenuItem = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") return;

    const res = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: false,
      mediaTypes: ['images'],
      quality: 0.8,
    });

    if (res.canceled || !res.assets[0]) return;

    const newItem: MenuItem = {
      id: Date.now().toString(),
      imageUri: res.assets[0].uri,
      name: '',
      price: '',
    };

    setMenuItems([...menuItems, newItem]);
  };

  const removeMenuItem = (id: string) => {
    setMenuItems(menuItems.filter(item => item.id !== id));
  };

  const updateMenuItem = (id: string, field: 'name' | 'price', value: string) => {
    setMenuItems(menuItems.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const pickStoreImages = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") return;

    const res = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: true,
      mediaTypes: ['images'],
      quality: 0.8,
      selectionLimit: 9,
    });

    if (res.canceled) return;
    const uris = res.assets?.map((a) => a.uri) ?? [];
    setStoreImages([...storeImages, ...uris]);
  };

  const removeStoreImage = (index: number) => {
    setStoreImages(storeImages.filter((_, i) => i !== index));
  };

  const convertImageToBase64 = async (uri: string): Promise<string> => {
    try {
      const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: 'base64',
      });
      return base64;
    } catch (error) {
      console.error('이미지 변환 실패:', error);
      throw error;
    }
  };

  const handleNext = async () => {
    try {
      setIsCreating(true);

      // 메뉴 이미지 base64 변환
      const menusWithBase64 = await Promise.all(
        menuItems.map(async (item) => ({
          name: item.name,
          price: parseInt(item.price) || 0,
          image: await convertImageToBase64(item.imageUri),
        }))
      );

      // 가게 이미지 base64 변환
      const imagesBase64 = await Promise.all(
        storeImages.map((uri) => convertImageToBase64(uri))
      );

      // 요일 한글 -> 영문 매핑
      const dayMapping: { [key: string]: string } = {
        '월': 'mon',
        '화': 'tue',
        '수': 'wed',
        '목': 'thu',
        '금': 'fri',
        '토': 'sat',
        '일': 'sun',
      };

      // weeklyHours를 API 형식으로 변환
      const operatingHours: any = {};
      Object.entries(route.params.weeklyHours).forEach(([day, hours]) => {
        const englishDay = dayMapping[day];
        operatingHours[englishDay] = [hours.start, hours.end];
      });

      // API 요청 데이터 구성
      const requestData = {
        company_name: route.params.businessNumber ? 'Company Name' : 'Default Company',
        bln: route.params.businessNumber || 'XXX-XX-XXXXX',
        owner_name: route.params.representativeName || '점주',
        address: route.params.address,
        phone_number: route.params.phone,
        store_type: 'food' as const,
        operating_hours: operatingHours,
        menus: menusWithBase64,
        images: imagesBase64,
      };

      // 가게 생성 API 호출
      const response = await storeApi.create(requestData);

      console.log('가게 생성 완료! store_id:', response.store_id);

      // RegistCompleteScreen으로 이동하며 store_id 전달
      navigation.navigate({
        name: 'Register',
        params: {
          screen: 'RegistCompleteScreen',
          params: {
            storeId: response.store_id,
          }
        }
      });
    } catch (error: any) {
      console.error('가게 생성 실패:', error);
      setErrorMessage('가게 생성 중 오류가 발생했습니다.\n다시 시도해주세요.');
      setShowErrorModal(true);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Container>
      <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}>
        <BackButton style={{ marginBottom: 16 }} />
        <TitleSubtitle
          title="가게 사진을 첨부해주세요."
          subtitle="손님들에게는 중요한 정보입니다."
          style={{ marginBottom: 24, marginLeft: 12 }}
        />

        <Section>
          {/* 메뉴 섹션 */}
          <SectionTitle>
            메뉴 <SectionSub>(개별 추가)</SectionSub>
          </SectionTitle>

          {menuItems.map((item) => (
            <MenuItemCard key={item.id}>
              <MenuImageContainer>
                <MenuImage source={{ uri: item.imageUri }} />
                <RemoveMenuButton onPress={() => removeMenuItem(item.id)}>
                  <Ionicons name="trash-outline" size={20} color="#FF6B6B" />
                </RemoveMenuButton>
              </MenuImageContainer>

              <MenuInputs>
                <MenuInput
                  placeholder="메뉴 이름"
                  placeholderTextColor="#8795a1"
                  value={item.name}
                  onChangeText={(value: string) => updateMenuItem(item.id, 'name', value)}
                />
                <MenuInput
                  placeholder="가격 (원)"
                  placeholderTextColor="#8795a1"
                  value={item.price}
                  onChangeText={(value: string) => updateMenuItem(item.id, 'price', value)}
                  keyboardType="number-pad"
                />
              </MenuInputs>
            </MenuItemCard>
          ))}

          <AddMenuButton onPress={addMenuItem}>
            <Ionicons name="add-circle-outline" size={24} color="#36DBFF" />
            <AddMenuText>메뉴 추가</AddMenuText>
          </AddMenuButton>

          {/* 가게 사진 섹션 */}
          <UploadTile
            title="가게 사진"
            subtitle="일괄 업로드 가능"
            images={storeImages}
            onPick={pickStoreImages}
            onRemove={removeStoreImage}
          />
        </Section>

        <Buttons>
          <Button
            title={isCreating ? "가게 생성 중..." : "다음으로"}
            variant="primary"
            onPress={isCreating ? undefined : handleNext}
          />
        </Buttons>
      </ScrollView>

      {isCreating && (
        <LoadingOverlay>
          <ActivityIndicator size="large" color="#36DBFF" />
          <LoadingText>가게를 생성하고 있습니다...</LoadingText>
        </LoadingOverlay>
      )}

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
            <ModalTitle>생성 오류</ModalTitle>
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

const Section = styled.View`
  padding: 0 24px;
  gap: 24px;
`;

const SectionTitle = styled.Text`
  color: #e6f1f7;
  ${TYPOGRAPHY.SUB_TITLE}
  margin-bottom: 12px;
`;

const SectionSub = styled.Text`
  color: #9fb2c1;
  ${TYPOGRAPHY.SECTION_2}
`;

const MenuItemCard = styled.View`
  background: rgba(18, 59, 100, 0.25);
  border-radius: 16px;
  border-width: 1px;
  border-color: rgba(255,255,255,0.08);
  padding: 16px;
  gap: 12px;
`;

const MenuImageContainer = styled.View`
  position: relative;
  width: 100%;
  aspect-ratio: 1.5;
`;

const MenuImage = styled(Image)`
  width: 100%;
  height: 100%;
  border-radius: 12px;
  background-color: #1a232c;
`;

const RemoveMenuButton = styled.Pressable`
  position: absolute;
  top: 8px;
  right: 8px;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 20px;
  padding: 8px;
`;

const MenuInputs = styled.View`
  gap: 8px;
`;

const MenuInput = styled.TextInput`
  height: 48px;
  border-radius: 10px;
  padding: 0 16px;
  color: #e6f1f7;
  background: rgba(18, 59, 100, 0.3);
  border-width: 1px;
  border-color: rgba(255,255,255,0.08);
  ${TYPOGRAPHY.SECTION_1}
`;

const AddMenuButton = styled.Pressable`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 20px;
  border-radius: 16px;
  background: rgba(18, 59, 100, 0.15);
  border-width: 2px;
  border-color: rgba(54, 219, 255, 0.3);
  border-style: dashed;
`;

const AddMenuText = styled.Text`
  color: #36DBFF;
  ${TYPOGRAPHY.HEADLINE_2}
`;

const TileWrap = styled.View`
  margin-top: 16px;
`;

const TileTitle = styled.Text`
  color: #e6f1f7;
  ${TYPOGRAPHY.SUB_TITLE}
  margin-bottom: 8px;
`;

const TileSub = styled.Text`
  color: #9fb2c1;
  ${TYPOGRAPHY.SECTION_2}
`;

const Tile = styled.Pressable`
  padding: 24px 16px;
  border-radius: 16px;
  background: rgba(18, 59, 100, 0.25);
  border-width: 1px;
  border-color: rgba(255,255,255,0.08);
`;

const TileCenter = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const TileText = styled.Text`
  color: #cfefff;
  font-size: 16px;
`;

const ImagesGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
`;

const ThumbContainer = styled.View`
  position: relative;
  width: 30%;
  aspect-ratio: 1.2;
`;

const Thumb = styled(Image)`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  background-color: #1a232c;
`;

const RemoveButton = styled.Pressable`
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 12px;
`;

const Buttons = styled.View`
  padding: 0 24px;
  margin-top: 32px;
`;

const LoadingOverlay = styled.View`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  align-items: center;
  justify-content: center;
  gap: 16px;
  z-index: 100;
`;

const LoadingText = styled.Text`
  color: #97C3DC;
  font-size: 16px;
  ${TYPOGRAPHY.SECTION_1}
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