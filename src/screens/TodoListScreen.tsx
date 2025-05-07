import React, { useState, useCallback } from 'react';
import { 
  View, 
  FlatList, 
  StyleSheet, 
  Alert
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useFocusEffect } from '@react-navigation/native';
import TodoItem from '../components/TodoItem';
import EmptyList from '../components/EmptyList';
import FilterBar from '../components/FilterBar';
import AddButton from '../components/AddButton';
import { getAllTodos, deleteTodo, toggleTodoCompleted } from '../storage/todoStorage';
import { Todo, RootStackParamList, FilterType } from '../types';

type TodoListScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'TodoList'>;
};

const TodoListScreen: React.FC<TodoListScreenProps> = ({ navigation }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<FilterType>('all');

  const loadTodos = useCallback(async () => {
    try {
      setLoading(true);
      const allTodos = await getAllTodos();
      setTodos(allTodos);
    } catch (error) {
      console.error('Ошибка при загрузке задач:', error);
      Alert.alert('Ошибка', 'Не удалось загрузить список задач');
    } finally {
      setLoading(false);
    }
  }, []);


  useFocusEffect(
    useCallback(() => {
      loadTodos();
    }, [loadTodos])
  );


  const handleEditTodo = (todo: Todo) => {
    navigation.navigate('EditTodo', { todo });
  };

  const handleDeleteTodo = (id: string) => {
    Alert.alert(
      'Подтверждение',
      'Вы уверены, что хотите удалить эту задачу?',
      [
        { text: 'Отмена', style: 'cancel' },
        { 
          text: 'Удалить',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteTodo(id);
              loadTodos();
            } catch (error) {
              console.error('Ошибка при удалении задачи:', error);
              Alert.alert('Ошибка', 'Не удалось удалить задачу');
            }
          }
        }
      ]
    );
  };


  const handleToggleComplete = async (id: string) => {
    try {
      await toggleTodoCompleted(id);
      loadTodos();
    } catch (error) {
      console.error('Ошибка при обновлении статуса задачи:', error);
      Alert.alert('Ошибка', 'Не удалось обновить статус задачи');
    }
  };


  const handleAddTodo = () => {
    navigation.navigate('AddTodo');
  };


  const handleFilterChange = (newFilter: FilterType) => {
    setFilter(newFilter);
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true; // 'all'
  });

  return (
    <View style={styles.container}>
      <FilterBar 
        currentFilter={filter} 
        onFilterChange={handleFilterChange} 
      />
      
      <FlatList
        data={filteredTodos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TodoItem
            todo={item}
            onToggleComplete={handleToggleComplete}
            onEdit={handleEditTodo}
            onDelete={handleDeleteTodo}
          />
        )}
        contentContainerStyle={
          filteredTodos.length === 0 ? { flex: 1 } : styles.listContent
        }
        ListEmptyComponent={<EmptyList loading={loading} />}
      />
      
      <AddButton onPress={handleAddTodo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  listContent: {
    padding: 15,
    paddingBottom: 80,
  }
});

export default TodoListScreen;