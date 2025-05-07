import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TodoListScreen from '../screens/TodoListScreen';
import AddTodoScreen from '../screens/AddTodoScreen';
import EditTodoScreen from '../screens/EditTodoScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="TodoList" 
          component={TodoListScreen} 
          options={{ title: 'Список задач' }}
        />
        <Stack.Screen 
          name="AddTodo" 
          component={AddTodoScreen} 
          options={{ title: 'Новая задача' }}
        />
        <Stack.Screen 
          name="EditTodo" 
          component={EditTodoScreen} 
          options={{ title: 'Редактирование задачи' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;