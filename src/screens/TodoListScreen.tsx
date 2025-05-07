// src/screens/TodoListScreen.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { 
  View, 
  FlatList, 
  StyleSheet, 
  Alert
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import TodoItem from '../components/TodoItem';
import EmptyList from '../components/EmptyList';
import FilterBar from '../components/FilterBar';
import AddButton from '../components/AddButton';
import { getAllTodos, deleteTodo, toggleTodoCompleted } from '../storage/todoStorage';

const TodoListScreen = ({ navigation }) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  // Загрузка задач
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

  // Обновление при фокусе на экране (возврат с других экранов)
  useFocusEffect(
    useCallback(() => {
      loadTodos();
    }, [loadTodos])
  );

  // Редактирование задачи
  const handleEditTodo = (todo) => {
    navigation.navigate('EditTodo', { todo });
  };

  // Удаление задачи
  const handleDeleteTodo = (id) => {
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

  // Переключение статуса выполнения задачи
  const handleToggleComplete = async (id) => {
    try {
      await toggleTodoCompleted(id);
      loadTodos();
    } catch (error) {
      console.error('Ошибка при обновлении статуса задачи:', error);
      Alert.alert('Ошибка', 'Не удалось обновить статус задачи');
    }
  };

  // Добавление задачи
  const handleAddTodo = () => {
    navigation.navigate('AddTodo');
  };

  // Обработка изменения фильтра
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  // Фильтрация задач
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