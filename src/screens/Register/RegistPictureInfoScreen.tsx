import React, { useState } from "react";
import { Image, SafeAreaView, View } from "react-native";
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

type UploadTileProps = {
  title: string;
  subtitle: string;
  images: string[];
  onPick: () => void;
};

function UploadTile({ title, subtitle, images, onPick }: UploadTileProps) {
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
            {images.map((uri) => (
              <Thumb key={uri} source={{ uri }} />
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
  const [menuImages, setMenuImages] = useState<string[]>([]);
  const [storeImages, setStoreImages] = useState<string[]>([]);

  const pickImages = async (setter: (v: string[]) => void, existing: string[]) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") return;
    const res = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
      selectionLimit: 9,
    });
    if (res.canceled) return;
    const uris = res.assets?.map((a) => a.uri) ?? [];
    setter([...existing, ...uris]);
  };

  return (
    <Container>
      <BackButton style={{ paddingBottom: insets.bottom + 16 }} />
      <TitleSubtitle
        title="가게 사진을 첨부해주세요."
        subtitle="손님들에게는 중요한 정보입니다."
        style={{ marginBottom: 24, marginLeft: 12 }}
      />

      <Section>
        <UploadTile
          title="메뉴"
          subtitle="일괄 업로드 가능"
          images={menuImages}
          onPick={() => pickImages(setMenuImages, menuImages)}
        />

        <UploadTile
          title="가게 사진"
          subtitle="일괄 업로드 가능"
          images={storeImages}
          onPick={() => pickImages(setStoreImages, storeImages)}
        />
      </Section>

      <Buttons>
        <Button
          title="다음으로"
          variant="primary"
          onPress={() => navigation.navigate({ name: 'Register', params: { screen: 'RegistSubInfoScreen' } })}
        />
      </Buttons>
      <BottomSpacer style={{ height: insets.bottom + 24 }} />
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

const TileWrap = styled.View``;

const TileTitle = styled.Text`
  color: #e6f1f7;
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 8px;
`;

const TileSub = styled.Text`
  color: #9fb2c1;
  font-size: 14px;
  font-weight: 400;
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

const Thumb = styled(Image)`
  width: 30%;
  aspect-ratio: 1.2;
  border-radius: 8px;
  background-color: #1a232c;
`;

const Buttons = styled.View`
  padding: 0 24px;
  margin-top: 32px;
`;

const BottomSpacer = styled.View``;