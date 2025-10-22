import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Todo",
          tabBarIcon: () => <MaterialIcons name="list" size={24} />,
        }}
      />
      <Tabs.Screen
        name="done"
        options={{
          title: "Done",
          tabBarIcon: () => <MaterialIcons name="done-outline" size={24} />,
        }}
      />
    </Tabs>
  );
}
