import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, Button, ScrollView } from 'react-native';
import "./global.css";
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import FullCamera from './camera';
import ProfilePictureSelector from './profilePicture';
import Map from './map';
import NotificationsExample from './notifications';
import Diffa from './diffa';

export default function App() {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <ScrollView
      className="flex-1 bg-white"
      contentContainerStyle={{ alignItems: "center", justifyContent: "center", paddingVertical: 50 }}
    >
      {/* <Map /> */}
     
      <ProfilePictureSelector />
      <Image
        source={{
          uri: "https://fastly.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U",
        }}
        className="w-48 h-72 mb-4 rounded-xl"
      />
      <Text className="text-black text-1xl">Let me see your faceee dawwgggg</Text>
      <StatusBar style="auto" />

      <View>
        {image && (
          <>
            <Text className="text-black mt-4">Picked Image Preview:</Text>
            <Image source={{ uri: image }} className="w-48 h-48 mt-4 rounded-lg" />
          </>
        )}
        <Button title="Pick an Image" onPress={pickImage} />
      </View>

      <FullCamera />
      <NotificationsExample />
      <Diffa />
    </ScrollView>
  );
}
