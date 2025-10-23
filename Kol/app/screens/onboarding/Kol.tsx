import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  useWindowDimensions,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import OTP from "../onboarding/Otp";

interface FormData {
  linkedin: string;
  twitter: string;
  instagram: string;
  tiktok: string;
  rate: string;
  transactionPin: string;
  password: string;
}

export default function KOL() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const [step, setStep] = useState(1);
  const [showOTP, setShowOTP] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    linkedin: "",
    twitter: "",
    instagram: "",
    tiktok: "",
    rate: "",
    transactionPin: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const isTablet = width >= 768;
  const scale = width / 375;

  const responsiveStyles = {
    logoSize: Math.min(40 * scale, 70),
    titleFontSize: Math.min(24 * scale, 32),
    subtitleFontSize: Math.min(14 * scale, 18),
    inputFontSize: Math.min(14 * scale, 18),
    paddingHorizontal: isTablet ? width * 0.2 : 24,
    containerPadding: isTablet ? 50 : 24,
  };

  const steps = [
    {
      title: "Link your socials",
      subtitle: "We advise that you link all your socials as you can do this anytime to improve your visibility",
      field: "socials",
      platforms: [
        { name: "LinkedIn", key: "linkedin", placeholder: "Paste your profile link" },
        { name: "Twitter", key: "twitter", placeholder: "Paste your profile link" },
        { name: "Instagram", key: "instagram", placeholder: "Paste your profile link" },
        { name: "TikTok", key: "tiktok", placeholder: "Paste your profile link" },
      ],
    },
    {
      title: "Your rate",
      subtitle: "How much do you charge per hour?",
      field: "rate",
      placeholder: "Enter your rate",
      inputType: "numeric",
      prefix: "$",
    },
    {
      title: "Set transaction pin",
      subtitle: "This pin will be used for your transactions",
      field: "transactionPin",
      placeholder: "Enter your PIN",
      inputType: "numeric",
      isPassword: true,
    },
    {
      title: "Set your password",
      subtitle: "Enter your password",
      field: "password",
      placeholder: "Enter your password",
      inputType: "password",
      isPassword: true,
    },
  ];

  const currentStep = steps[step - 1];

  const handleInputChange = (text: string, field: string) => {
    setFormData({
      ...formData,
      [field]: text,
    });
  };

  const handleProceed = async () => {
    // Validation logic
    if (step === 1) {
      // At least one social should be filled
      const hasAnySocial =
        formData.linkedin || formData.twitter || formData.instagram || formData.tiktok;
      if (!hasAnySocial) {
        alert("Please link at least one social profile");
        return;
      }
    } else {
      const fieldValue = formData[currentStep.field as keyof FormData];
      if (!fieldValue || fieldValue.trim() === "") {
        alert("Please fill in this field");
        return;
      }

      // Additional validations
      if (step === 3 && formData.transactionPin.length < 4) {
        alert("PIN must be at least 4 digits");
        return;
      }

      if (step === 4 && formData.password.length < 6) {
        alert("Password must be at least 6 characters");
        return;
      }
    }

    if (step < steps.length) {
      setStep(step + 1);
    } else if (step === steps.length) {
      // Show OTP modal after password step
      setShowOTP(true);
    }
  };

  const handleOTPVerify = async (otpCode: string) => {
    setLoading(true);
    try {
      console.log("KOL Form submitted:", formData);
      console.log("OTP verified:", otpCode);
      setShowOTP(false);
      router.push("/screens/onboarding/Kols");
    } catch (error) {
      alert("Error completing onboarding");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const isSocialsStep = step === 1;

  return (
    <>
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
                  marginTop: responsiveStyles.containerPadding,
                },
              ]}
              resizeMode="contain"
            />
          </View>

          {/* Title */}
          <Text
            style={[
              styles.title,
              {
                fontSize: responsiveStyles.titleFontSize,
                marginTop: 40,
              },
            ]}
          >
            {currentStep.title}
          </Text>

          {/* Subtitle */}
          <Text
            style={[
              styles.subtitle,
              {
                fontSize: responsiveStyles.subtitleFontSize,
                marginTop: 12,
              },
            ]}
          >
            {currentStep.subtitle}
          </Text>

          {/* Input/Select Area */}
          <View style={{ marginTop: 40, marginBottom: 40, width: "100%" }}>
            {isSocialsStep ? (
              <View style={styles.socialsContainer}>
                {currentStep.platforms?.map((platform, index) => (
                  <View key={index} style={styles.platformWrapper}>
                    <Text style={styles.platformLabel}>{platform.name}</Text>
                    <TextInput
                      style={[
                        styles.textInput,
                        {
                          fontSize: responsiveStyles.inputFontSize,
                          paddingVertical: Math.max(16 * scale, 20),
                          paddingHorizontal: 16,
                        },
                      ]}
                      placeholder={platform.placeholder}
                      placeholderTextColor="#9CA3AF"
                      value={formData[platform.key as keyof FormData]}
                      onChangeText={(text) =>
                        handleInputChange(text, platform.key)
                      }
                    />
                  </View>
                ))}
              </View>
            ) : currentStep.field === "rate" ? (
              <View style={styles.rateInputWrapper}>
                <Text style={styles.ratePrefix}>{currentStep.prefix}</Text>
                <TextInput
                  style={[
                    styles.textInput,
                    styles.rateInput,
                    {
                      fontSize: responsiveStyles.inputFontSize,
                      paddingVertical: Math.max(16 * scale, 20),
                      paddingHorizontal: 16,
                    },
                  ]}
                  placeholder={currentStep.placeholder}
                  placeholderTextColor="#9CA3AF"
                  keyboardType="numeric"
                  value={formData.rate}
                  onChangeText={(text) => handleInputChange(text, "rate")}
                />
              </View>
            ) : (
              <TextInput
                style={[
                  styles.textInput,
                  {
                    fontSize: responsiveStyles.inputFontSize,
                    paddingVertical: Math.max(16 * scale, 20),
                    paddingHorizontal: 16,
                  },
                ]}
                placeholder={currentStep.placeholder}
                placeholderTextColor="#9CA3AF"
                secureTextEntry={currentStep.isPassword}
                keyboardType={
                  currentStep.inputType === "numeric" ? "numeric" : "default"
                }
                value={
                  formData[currentStep.field as keyof FormData] || ""
                }
                onChangeText={(text) =>
                  handleInputChange(text, currentStep.field)
                }
              />
            )}
          </View>

          {/* Proceed Button */}
          <TouchableOpacity
            style={[
              styles.button,
              {
                paddingVertical: Math.max(14 * scale, 16),
                marginBottom: 20,
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

          {/* Back Button */}
          {step > 1 && (
            <TouchableOpacity
              style={[
                styles.backButton,
                { paddingVertical: Math.max(12 * scale, 14) },
              ]}
              activeOpacity={0.8}
              onPress={handleBack}
            >
              <Text
                style={[
                  styles.backButtonText,
                  { fontSize: responsiveStyles.inputFontSize },
                ]}
              >
                Back
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>

      {/* OTP Modal */}
      <OTP
        visible={showOTP}
        onClose={() => setShowOTP(false)}
        onVerify={handleOTPVerify}
        email={formData.linkedin}
      />
    </>
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
    fontFamily: "Montserrat-Medium",
    color: "#6B7280",
    textAlign: "left",
    width: "100%",
    lineHeight: 20,
  },
  socialsContainer: {
    width: "100%",
  },
  platformWrapper: {
    marginBottom: 20,
  },
  platformLabel: {
    fontFamily: "Montserrat-Medium",
    color: "#111827",
    fontSize: 14,
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    fontFamily: "Montserrat-Regular",
    color: "#111827",
    width: "100%",
  },
  rateInputWrapper: {
    position: "relative",
    width: "100%",
    justifyContent: "center",
  },
  ratePrefix: {
    position: "absolute",
    left: 16,
    fontFamily: "Montserrat-SemiBold",
    fontSize: 24,
    color: "#111827",
    zIndex: 1,
  },
  rateInput: {
    paddingLeft: 40,
    textAlign: "center",
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
    fontFamily: "Montserrat-Medium",
    color: "#fff",
    textAlign: "center",
  },
  backButton: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 30,
    paddingHorizontal: 60,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  backButtonText: {
    fontFamily: "Montserrat-Medium",
    color: "#000",
    textAlign: "center",
  },
});