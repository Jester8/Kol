import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  useWindowDimensions,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";

interface ResetFormData {
  email: string;
}

export default function Reset() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [formData, setFormData] = useState<ResetFormData>({
    email: "",
  });
  const [loading, setLoading] = useState(false);

  const isTablet = width >= 768;
  const scale = width / 375;

  const responsiveStyles = {
    titleFontSize: Math.min(24 * scale, 32),
    subtitleFontSize: Math.min(14 * scale, 16),
    inputFontSize: Math.min(14 * scale, 16),
    paddingHorizontal: isTablet ? width * 0.15 : 24,
  };

  const handleInputChange = (value: string) => {
    setFormData({
      email: value,
    });
  };

  const handleProceed = async () => {
    if (!formData.email.trim()) {
      alert("Please enter your email");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      alert("Please enter a valid email");
      return;
    }

    setLoading(true);
    try {
      console.log("Password reset initiated for:", formData.email);
      alert("Reset link sent to your email");
      router.back();
    } catch (error) {
      alert("Failed to send reset link. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
      <View
        style={[
          styles.content,
          { paddingHorizontal: responsiveStyles.paddingHorizontal },
        ]}
      >
        {/* Title */}
        <Text
          style={[
            styles.title,
            { fontSize: responsiveStyles.titleFontSize, marginTop: 40 },
          ]}
        >
          Enter email
        </Text>

        {/* Subtitle */}
        <Text
          style={[
            styles.subtitle,
            { fontSize: responsiveStyles.subtitleFontSize, marginTop: 12 },
          ]}
        >
          Enter the email attached to your account
        </Text>

        {/* Email Input */}
        <View style={{ marginTop: 40, width: "100%" }}>
          <Text
            style={[
              styles.label,
              { fontSize: responsiveStyles.inputFontSize },
            ]}
          >
            Email
          </Text>
          <TextInput
            style={[
              styles.textInput,
              {
                fontSize: responsiveStyles.inputFontSize,
                paddingVertical: Math.max(12 * scale, 14),
                paddingHorizontal: 16,
                marginTop: 8,
              },
            ]}
            placeholder="Enter your email"
            placeholderTextColor="#9CA3AF"
            keyboardType="email-address"
            value={formData.email}
            onChangeText={handleInputChange}
          />
        </View>

        {/* Proceed Button */}
        <TouchableOpacity
          style={[
            styles.button,
            {
              paddingVertical: Math.max(14 * scale, 16),
              marginTop: 48,
              opacity: loading ? 0.6 : 1,
            },
          ]}
          activeOpacity={0.8}
          onPress={handleProceed}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text
              style={[
                styles.buttonText,
                { fontSize: responsiveStyles.inputFontSize },
              ]}
            >
              Proceed
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  title: {
    fontFamily: "Montserrat-SemiBold",
    color: "#111827",
    textAlign: "center",
    width: "100%",
  },
  subtitle: {
    fontFamily: "Montserrat-Regular",
    color: "#6B7280",
    textAlign: "center",
    width: "100%",
    lineHeight: 20,
  },
  label: {
    fontFamily: "Montserrat-Medium",
    color: "#111827",
  },
  textInput: {
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    fontFamily: "Montserrat-Regular",
    color: "#111827",
    width: "100%",
  },
  button: {
    backgroundColor: "#000",
    borderRadius: 30,
    paddingHorizontal: 60,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontFamily: "Montserrat-SemiBold",
    color: "#fff",
    textAlign: "center",
  },
});