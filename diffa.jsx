import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import FullCamera from "./camera";
// import Notification from "./notification";

export default function Diffa() {
  const [pickedImage, setPickedImage] = useState(null);
  const [location, setLocation] = useState(null);
  const [city, setCity] = useState("Fetching...");


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Greeting */}
        <View style={styles.greetingContainer}>
          <Text style={styles.greeting}>Good Morning, Chelsea</Text>
          <Text style={styles.subtext}>
            Check all your incoming and outgoing transactions here
          </Text>
        </View>

        {/* Account Card */}
        <View style={styles.accountCard}>
          <Text style={styles.label}>Account No.</Text>
          <Text style={styles.accountNumber}>100899</Text>
        </View>

        {/* Balance Section */}
        <View style={styles.balanceCard}>
          <View>
            <Text style={styles.label}>Balance</Text>
            <Text style={styles.balance}>Rp 10.000.000</Text>
          </View>
          <View style={styles.actions}>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="add" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="send" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Transaction History */}
        <View style={styles.transactionSection}>
          <Text style={styles.sectionTitle}>Transaction History</Text>

          {[
            {
              name: "Adityo Gizwanda",
              type: "Transfer",
              amount: "- 75.000,00",
              color: "#1a1b2f",
            },
            {
              name: "Adityo Gizwanda",
              type: "Topup",
              amount: "+ 75.000,00",
              color: "#00b94a",
            },
            {
              name: "Adityo Gizwanda",
              type: "Transfer",
              amount: "- 75.000,00",
              color: "#1a1b2f",
            },
          ].map((item, idx) => (
            <View key={idx} style={styles.transactionItem}>
              <View style={styles.dot} />
              <View style={{ flex: 1 }}>
                <Text style={styles.transactionName}>{item.name}</Text>
                <Text style={styles.transactionType}>{item.type}</Text>
                <Text style={styles.transactionDate}>08 December 2024</Text>
              </View>
              <Text style={[styles.amount, { color: item.color }]}>
                {item.amount}
              </Text>
            </View>
          ))}
        </View>
        
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fc", padding: 20 },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 12 },
  userName: { fontSize: 18, fontWeight: "bold" },
  location: { fontSize: 14, color: "#555", marginLeft: 4 },

  greetingContainer: { marginBottom: 20 },
  greeting: { fontSize: 24, fontWeight: "bold" },
  subtext: { fontSize: 16, color: "#333", marginTop: 6 },

  accountCard: {
    backgroundColor: "#005CFF",
    padding: 16,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  label: { color: "#fff", fontSize: 16 },
  accountNumber: { color: "#fff", fontSize: 18, fontWeight: "bold" },

  balanceCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  balance: { fontSize: 24, fontWeight: "bold", color: "#000" },
  actions: { flexDirection: "row", gap: 10 },
  iconButton: {
    backgroundColor: "#005CFF",
    padding: 10,
    borderRadius: 12,
    shadowColor: "#005CFF",
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },

  transactionSection: { marginBottom: 24 },
  sectionTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  transactionItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
  },
  dot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#ccc",
    marginRight: 12,
  },
  previewText: { fontSize: 16, marginTop: 20 },
  image: { width: "100%", height: 200, borderRadius: 12, marginVertical: 10 },
  pickButton: { color: "#005CFF", textAlign: "center", fontSize: 16 },

  map: { width: "100%", height: 300, marginTop: 20, borderRadius: 12 },
});
