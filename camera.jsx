import { CameraView, useCameraPermissions } from "expo-camera";
import { CameraType } from "expo-image-picker";
import { useEffect, useRef, useState } from "react";
import { Text, View, Button, Image, ScrollView } from "react-native";

export default function FullCamera() {
    const [image, setImage] = useState(null);
    const [type, setType] = useState("back");
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef(null);
  
    useEffect(() => {
      if (!permission?.granted) {
        requestPermission();
      }
    }, []);
  
    if (!permission)
      return (
        <View>
          <Text>Requesting Permission...</Text>
        </View>
      );
  
    if (!permission.granted)
      return (
        <View>
          <Text>No Access to camera.</Text>
          <Button onPress={requestPermission} title="Grant Permission" />
        </View>
      );
  
    const takePicture = async () => {
      if (cameraRef.current) {
        const photo = await cameraRef.current.takePictureAsync();
        setImage(photo.uri);
      }
    };
  
    return (
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: 40,
        }}
      >
        {image && (
          <>
            <Text>Picked Image Preview:</Text>
            <Image
              source={{ uri: image }}
              style={{
                width: 200,
                height: 200,
                marginTop: 16,
                borderRadius: 12,
              }}
            />
          </>
        )}
        <CameraView
          style={{ width: 300, height: 300, marginTop: 20 }}
          facing={type}
          ref={cameraRef}
        />
        <Button
          title="Flip Camera"
          onPress={() => setType(type === "back" ? "front" : "back")}
        />
        <Button title="Take Photo" onPress={takePicture} />
      </ScrollView>
    );
  }
  
