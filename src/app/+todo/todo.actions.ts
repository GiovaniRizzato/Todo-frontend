import { createAction, props } from '@ngrx/store';
import { TodoItem } from './todo.models';

export const loadTodos = createAction(
  '[Todo] Load Todos'
);

export const loadTodosSuccess = createAction(
  '[Todo] Load Todos Success',
  props<{ todoList: Array<TodoItem> }>()
);

export const loadTodosFailure = createAction(
  '[Todo] Load Todos Failure',
  props<any>()
);

export const editTodo = createAction(
  '[Todo] Edit Todo',
  props<TodoItem>()
);

export const editTodoSuccess = createAction(
  '[Todo] Edit Todo Success'
);

export const editTodoFailure = createAction(
  '[Todo] Edit Todo Failure',
  props<any>()
);

export const createTodo = createAction(
  '[Todo] Create Todo',
  props<{label: string}>()
);

export const createTodoSuccess = createAction(
  '[Todo] Create Todo Success'
);

export const createTodoFailure = createAction(
  '[Todo] Create Todo Failure',
  props<any>()
);

export const clearMessage = createAction(
  '[Todo] Clear message'
);

