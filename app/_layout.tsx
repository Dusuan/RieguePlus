import "../global.css";

import { StatusBar } from "expo-status-bar";
import { PaperProvider } from "react-native-paper";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <PaperProvider>
      <StatusBar hidden={true} />
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="(dashboard)/index"
          options={{ headerShown: false }}
        />
      </Stack>
    </PaperProvider>
  );
}
