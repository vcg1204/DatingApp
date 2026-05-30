import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { Ionicons } from "@expo/vector-icons";

import { useEffect, useState } from "react";

import { router, useLocalSearchParams } from "expo-router";

import { supabase } from "../../lib/supabase";

import { useUserStore } from "../../store/useUserStore";

export default function ChatScreen() {
  const { userId: receiverId, name } = useLocalSearchParams();

  const currentUserId = useUserStore((state) => state.userId);

  const [messages, setMessages] = useState<any[]>([]);

  const [input, setInput] = useState("");

  useEffect(() => {
    loadMessages();

    const channel = supabase
      .channel("messages")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
        },
        () => {
          loadMessages();
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const loadMessages = async () => {
    console.log("CURRENT USER:", currentUserId);
    console.log("RECEIVER:", receiverId);

    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .order("created_at", {
        ascending: true,
      });

    console.log("LOAD DATA:", data);
    console.log("LOAD ERROR:", error);

    const filtered =
      data?.filter(
        (message) =>
          (message.sender_id === currentUserId &&
            message.receiver_id === receiverId) ||
          (message.sender_id === receiverId &&
            message.receiver_id === currentUserId),
      ) || [];

    setMessages(filtered);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const { data, error } = await supabase
      .from("messages")
      .insert([
        {
          sender_id: currentUserId,
          receiver_id: receiverId,
          text: input.trim(),
        },
      ])
      .select();

    console.log("MESSAGE DATA:", data);
    console.log("MESSAGE ERROR:", error);

    if (error) return;

    setInput("");

    loadMessages();
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.replace("/messages")}>
            <Ionicons name="arrow-back" size={26} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.name}>{name || "Chat"}</Text>

          <View style={{ width: 26 }} />
        </View>

        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            padding: 20,
          }}
          renderItem={({ item }) => (
            <View
              style={[
                styles.messageBubble,
                item.sender_id === currentUserId
                  ? styles.myMessage
                  : styles.otherMessage,
              ]}
            >
              <Text style={styles.messageText}>{item.text}</Text>
            </View>
          )}
        />

        <View style={styles.inputRow}>
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Type a message..."
            placeholderTextColor="#777"
            style={styles.input}
          />

          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Ionicons name="send" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050816",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#151B2E",
  },

  name: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },

  messageBubble: {
    maxWidth: "78%",
    padding: 14,
    borderRadius: 22,
    marginBottom: 12,
  },

  myMessage: {
    backgroundColor: "#7C3AED",
    alignSelf: "flex-end",
  },

  otherMessage: {
    backgroundColor: "#111827",
    alignSelf: "flex-start",
  },

  messageText: {
    color: "#fff",
    fontSize: 15,
    lineHeight: 22,
  },

  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#151B2E",
    backgroundColor: "#050816",
  },

  input: {
    flex: 1,
    backgroundColor: "#111827",
    color: "#fff",
    borderRadius: 999,
    paddingHorizontal: 18,
    paddingVertical: 14,
    fontSize: 15,
  },

  sendButton: {
    marginLeft: 10,
    backgroundColor: "#7C3AED",
    width: 50,
    height: 50,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
});
