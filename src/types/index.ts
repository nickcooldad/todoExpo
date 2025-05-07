export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'low' | 'normal' | 'high';
  dueDate?: string | null;
  createdAt: string;
  updatedAt?: string;
}

export interface TodoInput {
  title: string;
  description?: string;
  completed?: boolean;
  priority?: 'low' | 'normal' | 'high';
  dueDate?: string | null;
}

export type RootStackParamList = {
  TodoList: undefined;
  AddTodo: undefined;
  EditTodo: {
    todo: Todo;
  };
};