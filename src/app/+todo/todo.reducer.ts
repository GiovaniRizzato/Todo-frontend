import { createReducer, on } from '@ngrx/store';
import * as TodoActions from './todo.actions';
import { TodoItem } from './todo.models';

export enum MessageType {
  SUCESS, ERROR
}

export interface Message {
  message: string;
  type: MessageType;
}

export interface TodoState {
  todoList: Array<TodoItem>,
  loading: boolean;
  message: Message
}

export const initialState: TodoState = {
  todoList: [],
  loading: true,
  message: {} as Message
};

export const reducer = createReducer (
  initialState,
  on(TodoActions.loadTodos, (state) => ({
      ...state,
      loading: true,
    })
  ),
  on(TodoActions.loadTodosSuccess, (state, data: { data: Array<TodoItem> }) => ({
    ...state,
    todoList: data.data,
    loading: false,
  })),
  on(TodoActions.loadTodosFailure, (state) => ({
    ...state,
    loading: false,
  })),
);

