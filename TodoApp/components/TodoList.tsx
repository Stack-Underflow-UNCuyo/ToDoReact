import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';
import { Colors } from '../constants/colors';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onStarredToggle: (id: string) => void;
}

export function TodoList({ todos, onToggle, onDelete, onStarredToggle }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>No tasks here!</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={todos}
      keyExtractor={(item) => item.id}
      renderItem={({ item, index }) => (
        <TodoItem todo={item} index={index} onToggle={onToggle} onDelete={onDelete} onStarredToggle={onStarredToggle} />
      )}
      style={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: Colors.danger,
  },
});
