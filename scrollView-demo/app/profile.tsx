import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { Colors, Spacing, Typography, BorderRadius, Shadows } from "@/util/constants";
import { useCart } from "@/context/CartContext";

interface ProfileOptionProps {
  icon: string;
  title: string;
  subtitle?: string;
  onPress: () => void;
  showArrow?: boolean;
}

const ProfileOption: React.FC<ProfileOptionProps> = ({
  icon,
  title,
  subtitle,
  onPress,
  showArrow = true,
}) => (
  <TouchableOpacity style={styles.optionItem} onPress={onPress} activeOpacity={0.7}>
    <View style={styles.optionLeft}>
      <Text style={styles.optionIcon}>{icon}</Text>
      <View style={styles.optionText}>
        <Text style={styles.optionTitle}>{title}</Text>
        {subtitle && <Text style={styles.optionSubtitle}>{subtitle}</Text>}
      </View>
    </View>
    {showArrow && <Text style={styles.optionArrow}>›</Text>}
  </TouchableOpacity>
);

export default function Profile() {
  const { getTotalItems, clearCart } = useCart();

  const handleOptionPress = (option: string) => {
    Alert.alert("Coming Soon", `${option} feature will be available in a future update.`);
  };

  const handleSignOut = () => {
    Alert.alert(
      "Sign Out",
      "Are you sure you want to sign out?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Sign Out", 
          style: "destructive",
          onPress: () => Alert.alert("Signed Out", "You have been signed out successfully.")
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.profileInfo}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>JD</Text>
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>John Doe</Text>
              <Text style={styles.userEmail}>john.doe@example.com</Text>
            </View>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{getTotalItems()}</Text>
            <Text style={styles.statLabel}>Items in Cart</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Orders</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>4.8</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
        </View>

        {/* Account Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <View style={styles.optionsContainer}>
            <ProfileOption
              icon="👤"
              title="Edit Profile"
              subtitle="Update your personal information"
              onPress={() => handleOptionPress("Edit Profile")}
            />
            <ProfileOption
              icon="📍"
              title="Addresses"
              subtitle="Manage shipping addresses"
              onPress={() => handleOptionPress("Addresses")}
            />
            <ProfileOption
              icon="💳"
              title="Payment Methods"
              subtitle="Manage cards and payment options"
              onPress={() => handleOptionPress("Payment Methods")}
            />
            <ProfileOption
              icon="📦"
              title="Order History"
              subtitle="View your past orders"
              onPress={() => handleOptionPress("Order History")}
            />
          </View>
        </View>

        {/* Preferences Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <View style={styles.optionsContainer}>
            <ProfileOption
              icon="🔔"
              title="Notifications"
              subtitle="Manage notification settings"
              onPress={() => handleOptionPress("Notifications")}
            />
            <ProfileOption
              icon="🌙"
              title="Dark Mode"
              subtitle="Currently disabled"
              onPress={() => handleOptionPress("Dark Mode")}
            />
            <ProfileOption
              icon="🌍"
              title="Language"
              subtitle="English"
              onPress={() => handleOptionPress("Language")}
            />
            <ProfileOption
              icon="💰"
              title="Currency"
              subtitle="USD"
              onPress={() => handleOptionPress("Currency")}
            />
          </View>
        </View>

        {/* Support Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          <View style={styles.optionsContainer}>
            <ProfileOption
              icon="❓"
              title="Help Center"
              subtitle="Get help and support"
              onPress={() => handleOptionPress("Help Center")}
            />
            <ProfileOption
              icon="📞"
              title="Contact Us"
              subtitle="Reach out to our support team"
              onPress={() => handleOptionPress("Contact Us")}
            />
            <ProfileOption
              icon="⭐"
              title="Rate App"
              subtitle="Share your feedback"
              onPress={() => handleOptionPress("Rate App")}
            />
            <ProfileOption
              icon="📄"
              title="Terms & Privacy"
              subtitle="Legal information"
              onPress={() => handleOptionPress("Terms & Privacy")}
            />
          </View>
        </View>

        {/* Sign Out */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
            <Text style={styles.signOutText}>Sign Out</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Version 1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.lg,
    paddingTop: Spacing.xl,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.neutral900,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  avatarText: {
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.bold,
    color: Colors.white,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  userEmail: {
    fontSize: Typography.sizes.base,
    color: Colors.textSecondary,
  },
  statsContainer: {
    backgroundColor: Colors.white,
    marginHorizontal: Spacing.md,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    flexDirection: 'row',
    marginBottom: Spacing.lg,
    ...Shadows.sm,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: Typography.sizes['2xl'],
    fontWeight: Typography.weights.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  statLabel: {
    fontSize: Typography.sizes.sm,
    color: Colors.textMuted,
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: Colors.neutral200,
    marginHorizontal: Spacing.md,
  },
  section: {
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.bold,
    color: Colors.textPrimary,
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.md,
  },
  optionsContainer: {
    backgroundColor: Colors.white,
    marginHorizontal: Spacing.md,
    borderRadius: BorderRadius.lg,
    ...Shadows.sm,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral100,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  optionIcon: {
    fontSize: Typography.sizes.xl,
    marginRight: Spacing.md,
    width: 24,
    textAlign: 'center',
  },
  optionText: {
    flex: 1,
  },
  optionTitle: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.semibold,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  optionSubtitle: {
    fontSize: Typography.sizes.sm,
    color: Colors.textMuted,
  },
  optionArrow: {
    fontSize: Typography.sizes.xl,
    color: Colors.textMuted,
    marginLeft: Spacing.sm,
  },
  signOutButton: {
    backgroundColor: Colors.error,
    marginHorizontal: Spacing.md,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    alignItems: 'center',
    ...Shadows.sm,
  },
  signOutText: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.semibold,
    color: Colors.white,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
  },
  footerText: {
    fontSize: Typography.sizes.sm,
    color: Colors.textMuted,
  },
});
