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
  Image,
  Linking,
} from "react-native";
import { useRouter } from "expo-router";

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export default function Login() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isTablet = width >= 768;
  const scale = width / 375;

  const responsiveStyles = {
    logoSize: Math.min(40 * scale, 60),
    titleFontSize: Math.min(28 * scale, 36),
    subtitleFontSize: Math.min(14 * scale, 16),
    inputFontSize: Math.min(14 * scale, 16),
    paddingHorizontal: isTablet ? width * 0.15 : 24,
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleLogin = async () => {
    if (!formData.email.trim()) {
      alert("Please enter your email");
      return;
    }

    if (!formData.password.trim()) {
      alert("Please enter your password");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      alert("Please enter a valid email");
      return;
    }

    setLoading(true);
    try {
      console.log("Login attempt:", formData);
      router.push("/");
    } catch (error) {
      alert("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      console.log("Google login initiated");
    } catch (error) {
      alert("Google login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleAppleLogin = async () => {
    setLoading(true);
    try {
      console.log("Apple login initiated");
    } catch (error) {
      alert("Apple login failed");
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
        {/* Logo */}
        <View style={styles.logoWrapper}>
          <Image
            source={require("../../../assets/images/icon.png")}
            style={[
              styles.logo,
              {
                width: responsiveStyles.logoSize,
                height: responsiveStyles.logoSize,
                marginTop: 24,
              },
            ]}
            resizeMode="contain"
          />
        </View>

        {/* Title */}
        <Text
          style={[
            styles.title,
            { fontSize: responsiveStyles.titleFontSize, marginTop: 40 },
          ]}
        >
          Welcome back
        </Text>

        {/* Subtitle */}
        <Text
          style={[
            styles.subtitle,
            { fontSize: responsiveStyles.subtitleFontSize, marginTop: 8 },
          ]}
        >
          Log in to your account
        </Text>

        {/* Email Input */}
        <View style={{ marginTop: 32, width: "100%" }}>
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
            onChangeText={(text) => handleInputChange("email", text)}
          />
        </View>

        {/* Password Input */}
        <View style={{ marginTop: 24, width: "100%" }}>
          <Text
            style={[
              styles.label,
              { fontSize: responsiveStyles.inputFontSize },
            ]}
          >
            Password
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
            placeholder="Enter your password"
            placeholderTextColor="#9CA3AF"
            secureTextEntry={!showPassword}
            value={formData.password}
            onChangeText={(text) => handleInputChange("password", text)}
          />
        </View>

        {/* Remember Me & Forgot Password */}
        <View style={[styles.optionsContainer, { marginTop: 16 }]}>
          <TouchableOpacity
            style={styles.rememberMeContainer}
            onPress={() =>
              handleInputChange("rememberMe", !formData.rememberMe)
            }
          >
            <View
              style={[
                styles.checkbox,
                {
                  backgroundColor: formData.rememberMe ? "#000" : "#F3F4F6",
                  borderColor: formData.rememberMe ? "#000" : "#E5E7EB",
                },
              ]}
            >
              {formData.rememberMe && (
                <Text style={styles.checkmarkText}>✓</Text>
              )}
            </View>
            <Text
              style={[
                styles.rememberMeText,
                { fontSize: responsiveStyles.inputFontSize - 2 },
              ]}
            >
              Remember me
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/screens/Auth/Reset")}>
            <Text
              style={[
                styles.forgotPasswordText,
                { fontSize: responsiveStyles.inputFontSize - 2 },
              ]}
            >
              Forgot password?
            </Text>
          </TouchableOpacity>
        </View>

        {/* Login Button */}
        <TouchableOpacity
          style={[
            styles.button,
            {
              paddingVertical: Math.max(14 * scale, 16),
              marginTop: 32,
              opacity: loading ? 0.6 : 1,
            },
          ]}
          activeOpacity={0.8}
          onPress={handleLogin}
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
              Log in
            </Text>
          )}
        </TouchableOpacity>

        {/* Sign Up Link */}
        <View style={[styles.signupContainer, { marginTop: 24 }]}>
          <Text
            style={[
              styles.signupText,
              { fontSize: responsiveStyles.subtitleFontSize },
            ]}
          >
            Don't have an account?{" "}
          </Text>
          <TouchableOpacity onPress={() => router.push("/screens/onboarding/Onboarding")}>
            <Text
              style={[
                styles.signupLink,
                { fontSize: responsiveStyles.subtitleFontSize },
              ]}
            >
              Sign up
            </Text>
          </TouchableOpacity>
        </View>

        {/* Divider */}
        <View style={[styles.dividerContainer, { marginTop: 32, marginBottom: 32 }]}>
          <View style={styles.dividerLine} />
          <Text
            style={[
              styles.dividerText,
              { fontSize: responsiveStyles.subtitleFontSize },
            ]}
          >
            OR
          </Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Social Login - Google */}
        <TouchableOpacity
          style={[
            styles.socialButton,
            { paddingVertical: Math.max(12 * scale, 14) },
          ]}
          activeOpacity={0.8}
          onPress={handleGoogleLogin}
        >
             <Image
             source={require("../../../assets/images/google.png")}
            style={styles.socialIcon}
          />
          <Text
            style={[
              styles.socialButtonText,
              { fontSize: responsiveStyles.inputFontSize },
            ]}
          >
            Continue with Google
          </Text>
        </TouchableOpacity>

        {/* Social Login - Apple */}
        <TouchableOpacity
          style={[
            styles.socialButton,
            { paddingVertical: Math.max(12 * scale, 14), marginTop: 12 },
          ]}
          activeOpacity={0.8}
          onPress={handleAppleLogin}
        >
          <Image
             source={require("../../../assets/images/apple.png")}
            style={styles.appleIcon}
          />
          <Text
            style={[
              styles.socialButtonText,
              { fontSize: responsiveStyles.inputFontSize },
            ]}
          >
            Continue with Apple
          </Text>
        </TouchableOpacity>

        {/* Bottom Spacer */}
        <View style={{ height: 60 }} />
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
  logoWrapper: {
    width: "100%",
    alignItems: "flex-start",
  },
  logo: {
    resizeMode: "contain",
  },
  title: {
    fontFamily: "Montserrat-SemiBold",
    color: "#111827",
    textAlign: "left",
    width: "100%",
  },
  subtitle: {
    fontFamily: "Montserrat-Regular",
    color: "#6B7280",
    textAlign: "left",
    width: "100%",
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
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  rememberMeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1.5,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  checkmarkText: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "Montserrat-SemiBold",
  },
  rememberMeText: {
    fontFamily: "Montserrat-Regular",
    color: "#6B7280",
  },
  forgotPasswordText: {
    fontFamily: "Montserrat-Regular",
    color: "#6B7280",
    textDecorationLine: "none",
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
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  signupText: {
    fontFamily: "Montserrat-Regular",
    color: "#6B7280",
  },
  signupLink: {
    fontFamily: "Montserrat-SemiBold",
    color: "#0066CC",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#E5E7EB",
  },
  dividerText: {
    fontFamily: "Montserrat-Regular",
    color: "#6B7280",
    marginHorizontal: 16,
  },
  socialButton: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 32,
    paddingHorizontal: 16,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffffff",
  },
  socialIcon: {
    width: 20,
    height: 20,
    marginRight: 12,
  },
  appleIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  socialButtonText: {
    fontFamily: "Montserrat-Medium",
    color: "#111827",
    textAlign: "center",
  },
});