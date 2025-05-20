import { StatusBar } from "expo-status-bar";
import "../global.css";

import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <>
      <StatusBar hidden={true} />
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(dashboard)/index" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
