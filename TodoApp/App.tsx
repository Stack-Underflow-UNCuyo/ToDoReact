import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Todo } from './types/Todo';
import { TodoInput } from './components/TodoInput';
import { TodoList } from './components/TodoList';
import { Colors } from './constants/colors';
import { MaterialIcons } from '@expo/vector-icons';

type Filter = 'all' | 'active' | 'completed' | 'starred';

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>('all');

  function addTodo(text: string) {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  }

  function toggleTodo(id: string) {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  }

  function deleteTodo(id: string) {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  function toggleStarred(id: string) {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, starred: !todo.starred } : todo
    ));
  }

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    if (filter === 'starred') return todo.starred;
    return true;
  });

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Text style={styles.title}>My TODOs</Text>
      <TodoInput onAdd={addTodo} />
      <View style={styles.filterBar}>
        {(['all', 'active', 'completed'] as Filter[]).map(f => (
          <TouchableOpacity
            key={f}
            style={[styles.filterButton, filter === f && styles.filterButtonActive]}
            onPress={() => setFilter(f)}
          >
            <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
            key="starred"
            style={[styles.filterButton, styles.filterButtonStar, filter === 'starred' && styles.filterButtonActive]}
            onPress={() => setFilter('starred' as Filter)}
        >
          <MaterialIcons name="star" size={16} color={filter === 'starred' ? Colors.surface : Colors.muted} />
        </TouchableOpacity>
      </View>
      <TodoList todos={filteredTodos} onToggle={toggleTodo} onDelete={deleteTodo} onStarredToggle={toggleStarred} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.primary,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  filterBar: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 8,
    marginBottom: 8,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    backgroundColor: Colors.surface,
  },
  filterButtonStar: {
    flex: 0, // Compresses the star section
    paddingHorizontal: 20,
  },
  filterButtonActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  filterText: {
    fontSize: 14,
    color: Colors.muted,
    fontWeight: '500',
  },
  filterTextActive: {
    color: Colors.surface,
  },
});
