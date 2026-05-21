import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Colors } from '../constants/colors';

interface TodoInputProps {
  onAdd: (text: string) => void;
}

export function TodoInput({ onAdd }: TodoInputProps) {
  const [text, setText] = useState('');

  function handleAdd() {
    if (text.trim() === '') return;
    onAdd(text.trim());
    setText('');
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholder="Add a new task..."
        placeholderTextColor="#9ca3af"
        onSubmitEditing={handleAdd}
        returnKeyType="done"
      />
      <TouchableOpacity style={styles.button} onPress={handleAdd}>
        <Text style={styles.buttonText}>Add</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    gap: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: Colors.text,
    backgroundColor: Colors.surface,
  },
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    paddingHorizontal: 18,
    justifyContent: 'center',
  },
  buttonText: {
    color: Colors.surface,
    fontSize: 16,
    fontWeight: '600',
  },
});
