import { Stack } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      {/* <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="user" />
        <StatusBar style="auto" />
      </Stack> */}
      <Drawer>
        <Drawer.Screen
          name="(tabs)/index"
          options={{
            drawerLabel: "Home",
            title: "overview",
          }}
        />
        <Drawer.Screen
          name="user"
          options={{
            drawerLabel: "User",
            title: "overview",
          }}
        />
      </Drawer>
    </>
  );
}
