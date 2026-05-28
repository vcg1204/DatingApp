import { Tabs } from "expo-router";

import { Ionicons } from "@expo/vector-icons";

import colors from "../../constants/colors";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarStyle: {
          backgroundColor: "#0A0F1F",

          borderTopWidth: 0,

          height: 86,

          paddingBottom: 22,

          paddingTop: 10,
        },

        tabBarActiveTintColor: colors.primary,

        tabBarInactiveTintColor: "#7B8094",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Discover",

          tabBarIcon: ({ color, size }) => (
            <Ionicons name="flame" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="likes"
        options={{
          title: "Likes",

          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="messages"
        options={{
          title: "Chats",

          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubble" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",

          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="chat"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
