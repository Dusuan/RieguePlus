import { Text, View } from "react-native";
export default function Index() {
  return (
    <View
      className="bg-black"
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="text-green-700 text-3xl">dashboard</Text>
    </View>
  );
}
