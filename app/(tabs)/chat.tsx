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

import { useState } from "react";

import { router } from "expo-router";

const initialMessages = [
  {
    id: "1",
    text: "Hey 👋",
    sender: "other",
  },

  {
    id: "2",
    text: "You seem cool haha",
    sender: "other",
  },

  {
    id: "3",
    text: "Thank you 😄",
    sender: "me",
  },
];

export default function ChatScreen() {
  const [messages, setMessages] = useState(initialMessages);

  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessage = {
      id: Date.now().toString(),

      text: input,

      sender: "me",
    };

    setMessages((prev) => [...prev, newMessage]);

    setInput("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={26} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.name}>Sophia</Text>

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

                item.sender === "me" ? styles.myMessage : styles.otherMessage,
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
