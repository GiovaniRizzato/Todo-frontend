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
  todoList: TodoItem[],
  loading: boolean;
  message: Message;
  oldState: TodoState
}

export const initialState: TodoState = {
  todoList: [],
  loading: true,
  message: {} as Message,
  oldState: {} as TodoState
};

export const reducer = createReducer (
  initialState,
  on(TodoActions.loadTodos, (state) => ({
      ...state,
      loading: true,
    })
  ),
  on(TodoActions.loadTodosSuccess, (state, props: { todoList: Array<TodoItem> }) => ({
    ...state,
    todoList: props.todoList,
    loading: false,
  })),
  on(TodoActions.loadTodosFailure, (state) => ({
    ...state,
    loading: false,
  })),
  on(TodoActions.editTodo, (state, newState: TodoItem) => ({
      ...state,
      todoList: state.todoList.map(todoItem => todoItem.id === newState.id ? newState : todoItem),
      oldState: state
  })),
  on(TodoActions.editTodoSuccess, (state) => ({
    ...state,
  })),
  on(TodoActions.editTodoFailure, (state) => ({
    ...state.oldState,
  })),
);

