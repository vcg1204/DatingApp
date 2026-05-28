import React from "react";

import {
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import colors from "../../constants/colors";

type Props = {
  label: string;

  placeholder: string;

  value: string;

  onChangeText: (text: string) => void;

  keyboardType?: KeyboardTypeOptions;
};

export default function AppInput({
  label,
  placeholder,
  value,
  onChangeText,
  keyboardType = "default",
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#6E6E73"
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },

  label: {
    color: "#B8B8C2",

    fontSize: 14,

    marginBottom: 10,
  },

  input: {
    height: 58,

    borderRadius: 18,

    backgroundColor: colors.card,

    paddingHorizontal: 18,

    color: "#fff",

    fontSize: 16,
  },
});
