import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";

export default function GetStarted() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Image
          source={require("../assets/images/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        <View style={styles.imageContainer}>
          <View style={styles.sideImagesRow}>
            <Image
              source={require("../assets/images/start/img1.png")}
              style={[styles.sideImage, { marginRight: 60 }]}
              resizeMode="cover"
            />
            <Image
              source={require("../assets/images/start/img.png")}
              style={[styles.sideImage, { marginLeft: 60 }]}
              resizeMode="cover"
            />
          </View>
          <Image
            source={require("../assets/images/start/img2.png")}
            style={styles.centerImage}
            resizeMode="cover"
          />
        </View>
      </View>

      <View style={styles.bottomSection}>
        <Text style={styles.title}>World’s best at your fingertips</Text>
        <Text style={styles.subtitle}>
          Lorem ipsum dolor sit amet consectetur. Consequat ac at blandit enim
          auctor.
        </Text>

        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={() => router.push("/screens/Auth/Login")}
        >
          <Text style={styles.buttonText}>Get started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  topSection: {
    flex: 1.3,
    backgroundColor: "#000",
    borderBottomLeftRadius: 80,
    borderBottomRightRadius: 80,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 40,
  },
  logo: {
    width: 50,
    height: 50,
    marginBottom: 40,
  },
  imageContainer: {
    alignItems: "center",
    marginTop: -20,
  },
  sideImagesRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: -40,
  },
  centerImage: {
    width: 120,
    height: 200,
    borderRadius: 70,
    zIndex: 2,
  },
  sideImage: {
    width: 100,
    height: 160,
    borderRadius: 50,
    opacity: 0.95,
  },
  bottomSection: {
    flex: 0.9,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  title: {
    fontFamily: "Montserrat-SemiBold",
    fontSize: 20,
    color: "#111827",
    textAlign: "center",
    marginTop: 30,
  },
  subtitle: {
    fontFamily: "Montserrat-Regular",
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    marginTop: 10,
    lineHeight: 20,
  },
  button: {
    backgroundColor: "#000",
    borderRadius: 30,
    paddingVertical: 14,
    paddingHorizontal: 80,
    marginTop: 40,
  },
  buttonText: {
    fontFamily: "Montserrat-Medium",
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});
