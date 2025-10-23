import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  Modal,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

interface OTPProps {
  visible: boolean;
  onClose: () => void;
  onVerify: (otp: string) => void;
  email?: string;
}

export default function OTP({ visible, onClose, onVerify, email }: OTPProps) {
  const { width } = useWindowDimensions();
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const [resendTimer, setResendTimer] = useState(0);
  const [loading, setLoading] = useState(false);

  const scale = width / 375;
  const insets = useSafeAreaInsets();

  const responsiveStyles = {
    titleFontSize: Math.min(20 * scale, 28),
    subtitleFontSize: Math.min(14 * scale, 16),
    buttonFontSize: Math.min(14 * scale, 16),
  };

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const handleNumberPress = (num: string) => {
    const emptyIndex = otp.findIndex((val) => val === "");
    if (emptyIndex !== -1) {
      const newOtp = [...otp];
      newOtp[emptyIndex] = num;
      setOtp(newOtp);
    }
  };

  const handleBackspace = () => {
    const lastFilledIndex = otp.map((val) => val !== "").lastIndexOf(true);
    if (lastFilledIndex !== -1) {
      const newOtp = [...otp];
      newOtp[lastFilledIndex] = "";
      setOtp(newOtp);
    }
  };

  const handleResend = () => {
    setResendTimer(45);
    setOtp(["", "", "", ""]);
    console.log("OTP resent to", email);
  };

  const handleProceed = async () => {
    const otpString = otp.join("");
    if (otpString.length !== 4) {
      alert("Please enter all 4 digits");
      return;
    }

    setLoading(true);
    try {
      await onVerify(otpString);
    } catch (error) {
      alert("Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const numpad = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["0", "backspace"],
  ];

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <SafeAreaView style={styles.content} edges={["bottom"]}>
          {/* Title */}
          <Text
            style={[
              styles.title,
              { fontSize: responsiveStyles.titleFontSize },
            ]}
          >
            OTP Verification
          </Text>

          {/* Subtitle */}
          <Text
            style={[
              styles.subtitle,
              { fontSize: responsiveStyles.subtitleFontSize, marginTop: 16 },
            ]}
          >
            Enter the 4-digit code sent to your{"\n"}email address
          </Text>

          {/* OTP Input Display */}
          <View
            style={[styles.otpContainer, { marginTop: 40, marginBottom: 24 }]}
          >
            {otp.map((digit, index) => (
              <View
                key={index}
                style={[
                  styles.otpBox,
                  {
                    borderWidth: digit !== "" ? 2 : 1,
                    borderColor: digit !== "" ? "#000" : "#E5E7EB",
                  },
                ]}
              >
                <Text
                  style={[
                    styles.otpDigit,
                    { fontSize: responsiveStyles.buttonFontSize },
                  ]}
                >
                  {digit}
                </Text>
              </View>
            ))}
          </View>

          {/* Resend Code */}
          <View style={styles.resendContainer}>
            <Text
              style={[
                styles.resendText,
                { fontSize: responsiveStyles.subtitleFontSize },
              ]}
            >
              Didn't receive the code?{" "}
            </Text>
            <TouchableOpacity
              onPress={handleResend}
              disabled={resendTimer > 0}
            >
              <Text
                style={[
                  styles.resendLink,
                  {
                    fontSize: responsiveStyles.subtitleFontSize,
                    color: resendTimer > 0 ? "#9CA3AF" : "#000",
                  },
                ]}
              >
                Resend {resendTimer > 0 ? `(${resendTimer}s)` : ""}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Numpad */}
          <View style={[styles.numpad, { marginTop: 40, marginBottom: 40 }]}>
            {numpad.map((row, rowIndex) => (
              <View key={rowIndex} style={styles.numpadRow}>
                {row.map((num, colIndex) => (
                  <TouchableOpacity
                    key={`${rowIndex}-${colIndex}`}
                    style={styles.numpadButton}
                    onPress={() =>
                      num === "backspace"
                        ? handleBackspace()
                        : handleNumberPress(num)
                    }
                  >
                    <Text
                      style={[
                        styles.numpadButtonText,
                        { fontSize: responsiveStyles.buttonFontSize },
                      ]}
                    >
                      {num === "backspace" ? "⌫" : num}
                    </Text>
                  </TouchableOpacity>
                ))}
                {rowIndex === numpad.length - 1 && row.length === 2 && (
                  <View style={{ flex: 1 }} />
                )}
              </View>
            ))}
          </View>

          {/* Proceed Button */}
          <TouchableOpacity
            style={[
              styles.button,
              {
                paddingVertical: Math.max(14 * scale, 16),
                marginBottom: 34, // ✅ now handled safely by SafeAreaView
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
                  { fontSize: responsiveStyles.buttonFontSize },
                ]}
              >
                Proceed
              </Text>
            )}
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  content: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 12,
    maxHeight: "100%",
  },
  title: {
    fontFamily: "Montserrat-SemiBold",
    color: "#111827",
    textAlign: "center",
  },
  subtitle: {
    fontFamily: "Montserrat-Regular",
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 22,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
  },
  otpBox: {
    width: 70,
    height: 70,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
  },
  otpDigit: {
    fontFamily: "Montserrat-SemiBold",
    color: "#111827",
  },
  resendContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  resendText: {
    fontFamily: "Montserrat-Regular",
    color: "#6B7280",
  },
  resendLink: {
    fontFamily: "Montserrat-Medium",
    color: "#000",
  },
  numpad: {
    width: "87%",
  },
  numpadRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    gap: 16,
    marginLeft: 40,
  },
  numpadButton: {
    flex: 1,
    aspectRatio: 1,
    backgroundColor: "#F3F4F6",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  numpadButtonText: {
    fontFamily: "Montserrat-Medium",
    color: "#111827",
  },
  button: {
    backgroundColor: "#000",
    borderRadius: 30,
    paddingHorizontal: 70,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: -33,
  },
  buttonText: {
    fontFamily: "Montserrat-Medium",
    color: "#fff",
    textAlign: "center",
  },
});
