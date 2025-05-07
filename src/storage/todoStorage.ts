import AsyncStorage from '@react-native-async-storage/async-storage';
import { Todo, TodoInput } from '../types';


const TODOS_KEY = 'todos';
const STORAGE_VERSION_KEY = 'storage_version';
const CURRENT_STORAGE_VERSION = '1.0'; // Версия схемы данных

export const initStorage = async (): Promise<void> => {
  try {

    const storedVersion = await AsyncStorage.getItem(STORAGE_VERSION_KEY);
    if (!storedVersion) {
      await AsyncStorage.setItem(STORAGE_VERSION_KEY, CURRENT_STORAGE_VERSION);
      await AsyncStorage.setItem(TODOS_KEY, JSON.stringify([]));
    }
  } catch (error) {
    console.error('Ошибка при инициализации хранилища:', error);
  }
};

export const getAllTodos = async (): Promise<Todo[]> => {
  try {
    const todosString = await AsyncStorage.getItem(TODOS_KEY);
    return todosString ? JSON.parse(todosString) : [];
  } catch (error) {
    console.error('Ошибка при получении задач:', error);
    return [];
  }
};


export const addTodo = async (todoInput: TodoInput): Promise<Todo | null> => {
  try {
    const todos = await getAllTodos();
    const newTodo: Todo = {
      ...todoInput,
      id: Date.now().toString(),
      completed: todoInput.completed || false,
      priority: todoInput.priority || 'normal',
      createdAt: new Date().toISOString(),
    };

    todos.push(newTodo);
    await AsyncStorage.setItem(TODOS_KEY, JSON.stringify(todos));
    return newTodo;
  } catch (error) {
    console.error('Ошибка при добавлении задачи:', error);
    return null;
  }
};

export const updateTodo = async (id: string, todoInput: Partial<TodoInput>): Promise<Todo | null> => {
  try {
    const todos = await getAllTodos();
    const index = todos.findIndex(t => t.id === id);

    if (index !== -1) {
      todos[index] = {
        ...todos[index],
        ...todoInput,
        updatedAt: new Date().toISOString(),
      };

      await AsyncStorage.setItem(TODOS_KEY, JSON.stringify(todos));
      return todos[index];
    }
    return null;
  } catch (error) {
    console.error('Ошибка при обновлении задачи:', error);
    return null;
  }
};

export const deleteTodo = async (id: string): Promise<boolean> => {
  try {
    const todos = await getAllTodos();
    const filteredTodos = todos.filter(todo => todo.id !== id);
    await AsyncStorage.setItem(TODOS_KEY, JSON.stringify(filteredTodos));
    return true;
  } catch (error) {
    console.error('Ошибка при удалении задачи:', error);
    return false;
  }
};

export const getTodoById = async (id: string): Promise<Todo | null> => {
  try {
    const todos = await getAllTodos();
    return todos.find(todo => todo.id === id) || null;
  } catch (error) {
    console.error('Ошибка при получении задачи по ID:', error);
    return null;
  }
};

export const toggleTodoCompleted = async (id: string): Promise<Todo | null> => {
  try {
    const todos = await getAllTodos();
    const index = todos.findIndex(t => t.id === id);

    if (index !== -1) {
      todos[index] = {
        ...todos[index],
        completed: !todos[index].completed,
        updatedAt: new Date().toISOString(),
      };

      await AsyncStorage.setItem(TODOS_KEY, JSON.stringify(todos));
      return todos[index];
    }
    return null;
  } catch (error) {
    console.error('Ошибка при переключении статуса задачи:', error);
    return null;
  }
};