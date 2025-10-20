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

interface FormData {
  name: string;
  email: string;
  role: string;
  industry: string;
}

export default function Onboarding() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    role: "",
    industry: "",
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
      title: "Let's get to know you",
      subtitle: "Enter your name",
      field: "name",
      placeholder: "Enter your name",
      inputType: "default",
    },
    {
      title: "Let's get to know you",
      subtitle: "Enter your email",
      field: "email",
      placeholder: "Enter your email",
      inputType: "email-address",
    },
    {
      title: "Who are you?",
      subtitle: "I am a/an..",
      field: "role",
      options: ["Key Opinion Leader", "Individual"],
    },
    {
      title: "What industry are you in?",
      subtitle: "I am in the____industry",
      field: "industry",
      options: ["Tech", "Health", "Engineering", "Aerospace", "Other"],
    },
  ];

  const currentStep = steps[step - 1];

  const handleInputChange = (text: string) => {
    setFormData({
      ...formData,
      [currentStep.field]: text,
    });
  };

  const handleSelectOption = (value: string) => {
    setFormData({
      ...formData,
      [currentStep.field]: value,
    });
  };

  const handleProceed = async () => {
    const fieldValue = formData[currentStep.field as keyof FormData];

    if (!fieldValue || fieldValue.trim() === "") {
      alert("Please fill in this field");
      return;
    }

    if (step < steps.length) {
      setStep(step + 1);
    } else {
      setLoading(true);
      try {
        console.log("Form submitted:", formData);
        router.push("/");
      } catch (error) {
        alert("Error completing onboarding");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const isInputFieldStep = step <= 2;
  const isIndustryStep = step === steps.length;

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
      <View
        style={[
          styles.content,
          { paddingHorizontal: responsiveStyles.paddingHorizontal },
        ]}
      >
        
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

        {/* Back Button for Industry Step */}
        {isIndustryStep && (
          <TouchableOpacity
            style={[
              styles.topBackButton,
              {
                paddingVertical: Math.max(12 * scale, 14),
                marginTop: -8,
                marginBottom: 8,
              },
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
              
            </Text>
          </TouchableOpacity>
        )}

        {/* Industry Section Container */}
        {isIndustryStep ? (
          <View style={styles.industrySection}>
            {/* Title */}
            <Text
              style={[
                styles.title,
                { fontSize: responsiveStyles.titleFontSize },
              ]}
            >
              {currentStep.title}
            </Text>

            {/* Subtitle */}
            <Text
              style={[
                styles.subtitle,
                { fontSize: responsiveStyles.subtitleFontSize, marginTop: 12 },
              ]}
            >
              {currentStep.subtitle}
            </Text>

            {/* Input/Select Area */}
            <View style={{ marginTop: 40, marginBottom: 40, width: "100%" }}>
              <View style={styles.optionsContainer}>
                {currentStep.options?.map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.optionButton,
                      {
                        backgroundColor:
                          formData[currentStep.field as keyof FormData] ===
                          option
                            ? "#000"
                            : "#F3F4F6",
                        paddingVertical: Math.max(16 * scale, 18),
                        marginBottom:
                          index < (currentStep.options?.length ?? 0) - 1
                            ? 12
                            : 0,
                      },
                    ]}
                    onPress={() => handleSelectOption(option)}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        {
                          fontSize: responsiveStyles.inputFontSize,
                          color:
                            formData[currentStep.field as keyof FormData] ===
                            option
                              ? "#fff"
                              : "#6B7280",
                        },
                      ]}
                    >
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        ) : (
          <>
            {/* Title */}
            <Text
              style={[
                styles.title,
                { fontSize: responsiveStyles.titleFontSize, marginTop: 40 },
              ]}
            >
              {currentStep.title}
            </Text>

            {/* Subtitle */}
            <Text
              style={[
                styles.subtitle,
                { fontSize: responsiveStyles.subtitleFontSize, marginTop: 12 },
              ]}
            >
              {currentStep.subtitle}
            </Text>

            {/* Input/Select Area */}
            <View style={{ marginTop: 40, marginBottom: 40, width: "100%" }}>
              {isInputFieldStep ? (
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
                  keyboardType={
                    currentStep.inputType === "email-address"
                      ? "email-address"
                      : "default"
                  }
                  value={formData[currentStep.field as keyof FormData]}
                  onChangeText={handleInputChange}
                />
              ) : (
                <View style={styles.optionsContainer}>
                  {currentStep.options?.map((option, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.optionButton,
                        {
                          backgroundColor:
                            formData[currentStep.field as keyof FormData] ===
                            option
                              ? "#000"
                              : "#F3F4F6",
                          paddingVertical: Math.max(16 * scale, 18),
                          marginBottom:
                            index < (currentStep.options?.length ?? 0) - 1
                              ? 12
                              : 0,
                        },
                      ]}
                      onPress={() => handleSelectOption(option)}
                    >
                      <Text
                        style={[
                          styles.optionText,
                          {
                            fontSize: responsiveStyles.inputFontSize,
                            color:
                              formData[currentStep.field as keyof FormData] ===
                              option
                                ? "#fff"
                                : "#6B7280",
                          },
                        ]}
                      >
                        {option}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          </>
        )}

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

        {/* Back Button - For Non-Last Steps */}
        {step > 1 && !isIndustryStep && (
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
  topBackButton: {
    alignSelf: "flex-end",
    paddingHorizontal: 16,
  },
  title: {
    fontFamily: "Montserrat-SemiBold",
    color: "#111827",
    textAlign: "left",
    width: "100%",
  },
  subtitle: {
    fontFamily: "Montserrat-SemiBold",
    color: "#000000",
    textAlign: "left",
    width: "100%",
  },
  textInput: {
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    fontFamily: "Montserrat-Regular",
    color: "#111827",
    width: "100%",
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
    marginTop: 4,
  },
  industrySection: {
    width: "100%",
    marginTop: -20,
  },
});