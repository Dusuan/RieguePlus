import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";

type Timer = {
  id: string;
  duration: number;
  remaining: number;
  isFinished: boolean;
};

export default function AlarmSection() {
  const [timers, setTimers] = useState<Timer[]>([]);
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers((prev) =>
        prev.map((timer) => {
          if (timer.isFinished) return timer;
          const newRemaining = timer.remaining - 1;
          return {
            ...timer,
            remaining: newRemaining,
            isFinished: newRemaining <= 0,
          };
        })
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const addTimer = () => {
    const uuidv4 = () =>
      Math.random().toString(36).substring(2) + Date.now().toString(36);

    const h = parseInt(hours || "0", 10);
    const m = parseInt(minutes || "0", 10);
    const s = parseInt(seconds || "0", 10);
    const totalSeconds = h * 3600 + m * 60 + s;
    if (totalSeconds <= 0) return;

    const newTimer: Timer = {
      id: uuidv4(),
      duration: totalSeconds,
      remaining: totalSeconds,
      isFinished: false,
    };

    setTimers((prev) => [newTimer, ...prev]);
    setHours("");
    setMinutes("");
    setSeconds("");
  };

  const renderItem = ({ item }: { item: Timer }) => {
    const hrs = Math.floor(item.remaining / 3600);
    const mins = Math.floor((item.remaining % 3600) / 60);
    const secs = item.remaining % 60;
    const timeDisplay = `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;

    return (
      <View
        className={`p-4 rounded-lg mb-3 items-center shadow-md ${
          item.isFinished ? "bg-green-200" : "bg-blue-100"
        }`}
      >
        <Text className="text-2xl font-semibold text-gray-800">
          {timeDisplay}
        </Text>
        {item.isFinished && (
          <Text className="text-green-700 mt-1">¡Terminado!</Text>
        )}
      </View>
    );
  };

  return (
    <View className="flex-1 px-5 py-6 bg-white">
      <Text className="text-xl font-bold text-center text-gray-900 mb-4">
        Nuevo Temporizador
      </Text>

      {/* Entradas de tiempo */}
      <View className="flex-row justify-between mb-3">
        <TextInput
          className="w-[30%] border border-gray-300 rounded-md text-center py-2 text-base text-gray-800"
          placeholder="HH"
          keyboardType="numeric"
          value={hours}
          onChangeText={setHours}
        />
        <TextInput
          className="w-[30%] border border-gray-300 rounded-md text-center py-2 text-base text-gray-800"
          placeholder="MM"
          keyboardType="numeric"
          value={minutes}
          onChangeText={setMinutes}
        />
        <TextInput
          className="w-[30%] border border-gray-300 rounded-md text-center py-2 text-base text-gray-800"
          placeholder="SS"
          keyboardType="numeric"
          value={seconds}
          onChangeText={setSeconds}
        />
      </View>

      {/* Botón */}
      <TouchableOpacity
        className="bg-blue-600 rounded-md py-3 items-center mb-6"
        onPress={addTimer}
      >
        <Text className="text-white font-medium text-base">
          Agregar Temporizador
        </Text>
      </TouchableOpacity>

      {/* Lista de temporizadores */}
      <FlatList
        data={timers}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}
