import { useEffect, useRef, useState } from "react";
import { View, Button, Platform, Text, Alert } from "react-native";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";

export default function NotificationsExample() {

    Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: false,
        }),
      });
      
  const [expoPushToken, setExpoPushToken] = useState();
  const notificationListener = useRef();
  const responseListener = useRef();

  async function registerForPushNotificationsAsync() {
    let token;
    if (!Device.isDevice) {
      alert("Must use physical device for PN");
      return;
    }
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log("Expo push token: ", token);
    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }
    return token;
  }

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      if (token) setExpoPushToken(token);
    });

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log("Notification Recieved: ", notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("Notification Tapped: ", response);
        Alert.alert(
          "Notification tapped!",
          "You interacted with the notification. "
        );
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const scheduleNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Hello from expo",
        body: "This is local notification",
        sound: true,
      },
      trigger: { seconds: 1 },
    });
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignContent: "center" }}>
      <Text>Your expo push token:</Text>
      <Text selectable style={{ margin: 10 }}>
        {expoPushToken || "Fetching token...."}
      </Text>
      <Button
        title="Schedule Local Notification"
        onPress={scheduleNotification}
      ></Button>
    </View>
  );
}
