import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Todo } from '../types/Todo';
import { Colors } from '../constants/colors';
import { MaterialIcons } from '@expo/vector-icons';

interface TodoItemProps {
  todo: Todo;
  index: number;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onStarredToggle: (id: string) => void;
}

export function TodoItem({ todo, index,onToggle, onDelete, onStarredToggle }: TodoItemProps) {

  const isEven = index % 2 === 0;
  const backgroundColor = isEven ? '#FFFFFF' : '#F3F4F6';


  return (
    <View style={[styles.container, { backgroundColor }]}>
      <TouchableOpacity style={styles.textContainer} onPress={() => onToggle(todo.id)}>
          <MaterialIcons 
            style={styles.icon} 
            name={todo.completed ? "radio-button-checked" : "radio-button-unchecked"} 
            size={24} color={todo.completed ? Colors.primary : Colors.muted} />
          <Text style={[styles.text, todo.completed && styles.completedText]}>
            {todo.text}
          </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onStarredToggle(todo.id)}>
        <MaterialIcons style={styles.icon} name="star" size={24} color={todo.starred ? Colors.primary : Colors.muted} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onDelete(todo.id)}>
        <MaterialIcons name="delete" size={24} color={Colors.danger} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    backgroundColor: Colors.surface,
  },

  icon: {
    marginRight: 12
  },

  textContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,

  },
  text: {
    fontSize: 16,
    color: Colors.text,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: Colors.primary,
  },

  hovered: {
    backgroundColor: Colors.primary + '20', // 20 for 12.5% opacity
  },

  deleteButton: {
    fontSize: 16,
    color: Colors.danger,
    paddingLeft: 12,
  },
  starButton: {
    fontSize: 16,
    paddingLeft: 12,
  },
});
