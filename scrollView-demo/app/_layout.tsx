import { Tabs } from "expo-router";
import { Text } from "react-native";
import { Colors } from "@/util/constants";
import { CartProvider, useCart } from "@/context/CartContext";

function TabsLayout() {
  const { getTotalItems } = useCart();
  const cartItemCount = getTotalItems();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.neutral900,
        tabBarInactiveTintColor: Colors.neutral400,
        tabBarStyle: {
          backgroundColor: Colors.white,
          borderTopColor: Colors.neutral200,
          borderTopWidth: 1,
          paddingTop: 8,
          paddingBottom: 8,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <TabIcon icon="🏠" color={color} />,
        }}
      />
      <Tabs.Screen
        name="categories"
        options={{
          title: "Categories",
          tabBarIcon: ({ color }) => <TabIcon icon="📂" color={color} />,
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          tabBarIcon: ({ color }) => <TabIcon icon="🛒" color={color} />,
          tabBarBadge: cartItemCount > 0 ? cartItemCount : undefined,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <TabIcon icon="👤" color={color} />,
        }}
      />
    </Tabs>
  );
}

export default function RootLayout() {
  return (
    <CartProvider>
      <TabsLayout />
    </CartProvider>
  );
}

function TabIcon({ icon, color }: { icon: string; color: string }) {
  return (
    <Text style={{ fontSize: 20, color }}>{icon}</Text>
  );
}
