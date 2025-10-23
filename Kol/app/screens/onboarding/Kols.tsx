import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ScrollView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

interface KOL {
  id: string;
  name: string;
  category: string;
  image: any;
  isVerified: boolean;
  isFollowing: boolean;
}

export default function Kols() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [kols, setKols] = useState<KOL[]>([
    {
      id: "1",
      name: "Ireti Doyle",
      category: "Arts and Crafts",
      image: require("../../../assets/images/1.png"),
      isVerified: true,
      isFollowing: false,
    },
    {
      id: "2",
      name: "Rita Peters",
      category: "UX Design",
      image: require("../../../assets/images/2.png"),
      isVerified: true,
      isFollowing: false,
    },
    {
      id: "3",
      name: "Chichi Eze",
      category: "Photography",
      image: require("../../../assets/images/3.png"),
      isVerified: true,
      isFollowing: false,
    },
    {
      id: "4",
      name: "Maria Cole",
      category: "Fashion",
      image: require("../../../assets/images/4.png"),
      isVerified: true,
      isFollowing: false,
    },
    {
      id: "5",
      name: "Chichi Eze",
      category: "Aerospace",
      image: require("../../../assets/images/5.png"),
      isVerified: true,
      isFollowing: false,
    },
    {
      id: "6",
      name: "Maria Cole",
      category: "Engineering",
      image: require("../../../assets/images/6.png"),
      isVerified: true,
      isFollowing: false,
    },
  ]);

  const handleFollowToggle = (id: string) => {
    setKols((prev) =>
      prev.map((kol) =>
        kol.id === id ? { ...kol, isFollowing: !kol.isFollowing } : kol
      )
    );
  };

  const handleProceed = async () => {
    setLoading(true);
    try {
      router.push("/");
    } catch (error) {
      alert("Error proceeding. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = () => {
    router.push("/");
  };

  const KOLCard = ({ kol }: { kol: KOL }) => (
    <View style={styles.card}>
      <Image source={kol.image} style={styles.profileImage} resizeMode="cover" />
      <View style={styles.textContainer}>
        <View style={styles.nameRow}>
          <Text style={styles.name}>{kol.name}</Text>
          {kol.isVerified && (
            <Ionicons
              name="checkmark-circle"
              size={16}
              color="#7C3AED"
              style={{ marginLeft: 4 }}
            />
          )}
        </View>
        <Text style={styles.category}>{kol.category}</Text>

        <TouchableOpacity
          style={[
            styles.followButton,
            kol.isFollowing && styles.followingButton,
          ]}
          onPress={() => handleFollowToggle(kol.id)}
        >
          <Text
            style={[
              styles.followButtonText,
              kol.isFollowing && styles.followingButtonText,
            ]}
          >
            {kol.isFollowing ? "Following" : "Follow"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require("../../../assets/images/icon.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Meet fellow influencers</Text>
      </View>

      {/* Scrollable list of cards */}
      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.grid}>
          {kols.map((kol) => (
            <View key={kol.id} style={styles.gridItem}>
              <KOLCard kol={kol} />
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.proceedButton, loading && { opacity: 0.6 }]}
          onPress={handleProceed}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.proceedButtonText}>Proceed</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  header: {
    alignItems: "flex-start",
    marginBottom: 16,
  },
  logo: {
    width: 40,
    height: 40,
  },
  title: {
    fontSize: 22,
    color: "#111827",
    marginTop: 24,
    fontFamily: "Montserrat-SemiBold",
  },
  scrollArea: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 16,
  },
  gridItem: {
    width: "48%",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#F9FAFB",
    borderRadius: 16,
    alignItems: "center",
    paddingVertical: 16,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 12,
  },
  textContainer: {
    alignItems: "center",
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  name: {
    fontSize: 15,
    color: "#111827",
    textAlign: "center",
    fontFamily: "Montserrat-SemiBold",
  },
  category: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 2,
    marginBottom: 12,
    textAlign: "center",
    fontFamily: "Montserrat-Regular",
  },
  followButton: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  followingButton: {
    backgroundColor: "#000",
  },
  followButtonText: {
    fontSize: 13,
    fontFamily: "Montserrat-Medium",
    color: "#000",
  },
  followingButtonText: {
    color: "#fff",
  },
  footer: {
    paddingVertical: 14,
    backgroundColor: "#fff",
    paddingBottom: Platform.OS === "ios" ? 30 : 20, // moves it up from navigation area
  },
  proceedButton: {
    backgroundColor: "#000",
    borderRadius: 30,
    width: "100%",
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 10,
  },
  proceedButtonText: {
    color: "#fff",
    fontSize: 15,
    fontFamily: "Montserrat-SemiBold",
  },
  skipButton: {
    alignItems: "center",
  },
  skipText: {
    color: "#111827",
    fontSize: 15,
    fontFamily: "Montserrat-Medium",
    marginBottom: 23,
  },
});
