import React, { useState } from "react";
import { Image, SafeAreaView, View, ScrollView, TextInput } from "react-native";
import styled from "styled-components/native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import TitleSubtitle from "@/src/components/common/TitleSubtitle";
import BackButton from "@/src/components/common/BackButton";
import Button from "@/src/components/ui/Button";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { NavigationProp } from "@react-navigation/native";
import type { RootStackParamList } from "../../types/navigation";
import { TYPOGRAPHY } from "../../constants/typography";

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
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [storeImages, setStoreImages] = useState<string[]>([]);

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
            title="다음으로"
            variant="primary"
            onPress={() => navigation.navigate({ name: 'Register', params: { screen: 'RegistSubInfoScreen' } })}
          />
        </Buttons>
      </ScrollView>
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