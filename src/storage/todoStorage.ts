import AsyncStorage from '@react-native-async-storage/async-storage';

// Ключи для хранения данных
const TODOS_KEY = 'todos';
const STORAGE_VERSION_KEY = 'storage_version';
const CURRENT_STORAGE_VERSION = '1.0'; // Версия схемы данных

/**
 * Инициализация хранилища
 */
export const initStorage = async () => {
  try {
    // Проверяем существование хранилища
    const storedVersion = await AsyncStorage.getItem(STORAGE_VERSION_KEY);
    if (!storedVersion) {
      // Первая установка - устанавливаем версию
      await AsyncStorage.setItem(STORAGE_VERSION_KEY, CURRENT_STORAGE_VERSION);
      await AsyncStorage.setItem(TODOS_KEY, JSON.stringify([]));
    }
  } catch (error) {
    console.error('Ошибка при инициализации хранилища:', error);
  }
};

/**
 * Получить все задачи
 */
export const getAllTodos = async () => {
  try {
    const todosString = await AsyncStorage.getItem(TODOS_KEY);
    return todosString ? JSON.parse(todosString) : [];
  } catch (error) {
    console.error('Ошибка при получении задач:', error);
    return [];
  }
};

/**
 * Добавить задачу
 */
export const addTodo = async (todoInput) => {
  try {
    const todos = await getAllTodos();

    // Создаем новую задачу с уникальным id
    const newTodo = {
      ...todoInput,
      id: Date.now().toString(),
      completed: false,
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

/**
 * Обновить задачу
 */
export const updateTodo = async (id, todoInput) => {
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

/**
 * Удалить задачу
 */
export const deleteTodo = async (id) => {
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

/**
 * Получить задачу по id
 */
export const getTodoById = async (id) => {
  try {
    const todos = await getAllTodos();
    return todos.find(todo => todo.id === id) || null;
  } catch (error) {
    console.error('Ошибка при получении задачи по ID:', error);
    return null;
  }
};

/**
 * Переключить статус выполнения задачи
 */
export const toggleTodoCompleted = async (id) => {
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