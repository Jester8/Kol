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
import { useRouter, useLocalSearchParams } from "expo-router";
import OTP from "../onboarding/Otp";

interface FormData {
  password: string;
}

export default function Individual() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const params = useLocalSearchParams();
  const [step, setStep] = useState(1);
  const [showOTP, setShowOTP] = useState(false);
  const [formData, setFormData] = useState<FormData>({
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

//   const handleSelectOption = (value: string) => {
//     setFormData({
//       ...formData,
//       industry: value,
//     });
//   };

  const handleProceed = async () => {
    // Validation logic
    const fieldValue = formData[currentStep.field as keyof FormData];

    if (!fieldValue || fieldValue.trim() === "") {
      alert("Please fill in this field");
      return;
    }

    // Additional validations
    if (step === 1 && formData.password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
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
      const completeFormData = {
        ...params,
        ...formData,
      };
      console.log("Individual Form submitted:", completeFormData);
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

  const isIndustryStep = step === 1;
  const isPasswordStep = step === 2;

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
              value={formData.password || ""}
              onChangeText={(text) => handleInputChange(text, "password")}
            />
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
        email={params.email as string}
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
  optionsContainer: {
    width: "100%",
  },
  optionButton: {
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  optionText: {
    fontFamily: "Montserrat-Medium",
    textAlign: "center",
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