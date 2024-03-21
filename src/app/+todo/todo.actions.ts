import { createAction, props } from '@ngrx/store';
import { TodoItem } from './todo.models';

export const loadTodos = createAction(
  '[Todo] Load Todos'
);

export const loadTodosSuccess = createAction(
  '[Todo] Load Todos Success',
  props<{ data: Array<TodoItem> }>()
);

export const loadTodosFailure = createAction(
  '[Todo] Load Todos Failure',
  props<{ error: any }>()
);

export const createTodo = createAction(
  '[Todo] Create Todo',
  props<TodoItem>()
);

export const createTodoSuccess = createAction(
  '[Todo] Create Todo Success'
);

export const createTodoFailure = createAction(
  '[Todo] Create Todo Failure',
  props<{ error: any }>()
);

export const editTodo = createAction(
  '[Todo] Edit Todo'
);

export const editTodoSuccess = createAction(
  '[Todo] Edit Todo Success'
);

export const editTodoFailure = createAction(
  '[Todo] Edit Todo Failure',
  props<{ error: any }>()
);