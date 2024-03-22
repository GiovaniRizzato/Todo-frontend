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

export const createTodo = createAction(
  '[Todo] Create Todo',
  props<{label: string}>()
);

export const removeTodo = createAction(
  '[Todo] Remove Todo',
  props<{id: string}>()
);

export const todoManipulationSuccess = createAction(
  '[Todo] Todo Manipulation Success'
);

export const todoManipulationFailure = createAction(
  '[Todo] Todo Manipulation Failure',
  props<any>()
);

export const clearMessage = createAction(
  '[Todo] Clear message'
);

