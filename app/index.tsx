import { Text, View, Image } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { ImageBackground } from "expo-image";
import { StatusBar } from "expo-status-bar";
import AlarmSection from "../components/AlarmSection";
import { BottomNavigation } from "react-native-paper";

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

const TimerRoute = () => {
  return (
    <View className="flex-1 bg-slate-500">
      <AlarmSection />
    </View>
  );
};

const MapRoute = () => {
  return (
    <View className="flex-1 bg-white justify-center items-center">
      <Image
        source={require("../assets/images/logo.png")}
        style={{ width: 100, height: 100, marginBottom: 20 }}
      />
      <Text>Próximamente</Text>
    </View>
  );
};

const SettingsRoute = () => {
  return (
    <View className="flex-1  bg-white justify-center items-center">
      <Image
        source={require("../assets/images/logo.png")}
        style={{ width: 100, height: 100, marginBottom: 20 }}
      />
      <Text>Próximamente</Text>
    </View>
  );
};

export default function Index() {
  const [showRealApp, setShowRealApp] = useState(false);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {
      key: "timer",
      title: "Riego",
      focusedIcon: "water",
      unfocusedIcon: "water-outline",
    },
    {
      key: "map",
      title: "Mapa",
      focusedIcon: "map",
      unfocusedIcon: "map-outline",
    },
    {
      key: "settings",
      title: "Configuración",
      focusedIcon: "cog",
      unfocusedIcon: "cog-outline",
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    timer: TimerRoute,
    map: MapRoute,
    settings: SettingsRoute,
  });

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
        <SafeAreaView className="flex-1 bg-white justify-center">
          <View className="flex-1 ">
            <BottomNavigation
              navigationState={{ index, routes }}
              onIndexChange={setIndex}
              renderScene={renderScene}
              barStyle={{ backgroundColor: "#4C8E97" }}
              activeColor="#fff"
              inactiveColor="#fff"
            />
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
