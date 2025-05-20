import { Text, View, Image } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { ImageBackground } from "expo-image";
import { StatusBar } from "expo-status-bar";
import AlarmSection from "../components/AlarmSection";
type Slide = {
  title?: string;
  content?: string;
};

const slides: Slide[] = [
  {
    title: "Haz que cada gota cuente con AquaFlow!",
    content:
      "Bienvenido a AquaFlow, la app que optimiza el riego de tus cultivos.",
  },
  {
    title: "¿Qué hace AquaFlow?",
    content:
      "Optimiza la irrigación en tus surcos con AquaFlow: la solución tecnológica que maximiza el rendimiento de tus cultivos mientras ahorras agua y recursos.",
  },
  {
    title: "¡Comienza a usar AquaFlow!",
  },
];

export default function Index() {
  const [showRealApp, setShowRealApp] = useState(false);

  const onDone = () => {
    setShowRealApp(true);
  };
  const onSkip = () => {
    setShowRealApp(true);
  };

  const RenderItem = ({ item }: { item: Slide }) => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: 100,
        }}
      >
        <Image
          source={require("../assets/images/logo.png")}
          style={{ width: 100, height: 100, marginBottom: 20 }}
        />
        <Text style={styles.introTitleStyle}>{item.title} </Text>

        <Text style={styles.content}>{item.content} </Text>
      </View>
    );
  };

  return (
    <>
      {showRealApp ? (
        <SafeAreaView className="flex-1 bg-[#4C8E97] justify-center text-black">
          <View className="flex-1 justify-center items-center mt-10">
            <AlarmSection />
          </View>
        </SafeAreaView>
      ) : (
        <SafeAreaView style={{ flex: 1 }}>
          <ImageBackground
            source={require("../assets/images/bg.png")}
            style={{ flex: 1 }}
          >
            <AppIntroSlider
              data={slides}
              renderItem={RenderItem}
              onDone={onDone}
              showSkipButton={true}
              showPrevButton={true}
              onSkip={onSkip}
            />
          </ImageBackground>
        </SafeAreaView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  introTitleStyle: {
    marginHorizontal: 20,
    flexWrap: "wrap",
    textAlign: "center",
    marginBottom: 40,
    fontSize: 30,
    color: "white",
    fontWeight: "bold",
  },
  content: {
    marginHorizontal: 20,
    flexWrap: "wrap",
    textAlign: "center",
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
});
