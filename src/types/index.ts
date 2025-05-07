export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: Priority;
  createdAt: string;
  updatedAt?: string;
}

export type Priority = 'low' | 'normal' | 'high';

export interface TodoInput {
  title: string;
  description?: string;
  completed?: boolean;
  priority?: Priority;
}

export type RootStackParamList = {
  TodoList: undefined;
  AddTodo: undefined;
  EditTodo: {
    todo: Todo;
  };
};

export type FilterType = 'all' | 'active' | 'completed';