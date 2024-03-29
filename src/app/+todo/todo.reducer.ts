import { HttpErrorResponse } from '@angular/common/http';
import { createReducer, on } from '@ngrx/store';
import * as TodoActions from './todo.actions';
import { Message, MessageType, TodoItem } from './todo.models';

export interface TodoState {
  todoList: TodoItem[],
  loading: boolean;
  message: Message;
  oldState: TodoState
}

export const initialState: TodoState = {
  todoList: [],
  loading: false,
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
  on(TodoActions.loadTodosFailure, (state, error: { response: HttpErrorResponse }) => ({
    ...state,
    message: {
      message: error.response.message,
      type: MessageType.ERROR
    }
  })),
  on(TodoActions.editTodo, (state, newState: TodoItem) => ({
      ...state,
      todoList: state.todoList.map(todoItem => todoItem.id === newState.id ? newState : todoItem),
      oldState: state,
  })),
  on(TodoActions.createTodo, (state, newTodo: {label: string}) => ({
    ...state,
    todoList: [...state.todoList, {
      id: (state.todoList.length + 1).toFixed(),
      label: newTodo.label,
      isDone: false
    }],
    oldState: state,
  })),
  on(TodoActions.removeTodo, (state, removedTodo: {id: string}) => ({
    ...state,
    todoList: state.todoList.filter(todoItem => todoItem.id !== removedTodo.id),
    oldState: state,
  })),
  on(TodoActions.todoManipulationSuccess, (state) => ({
    ...state,
    oldState: {} as TodoState //Clear the hitory once it's done
  })),
  on(TodoActions.todoManipulationFailure, (state, error: { response: HttpErrorResponse }) => ({
    ...state.oldState,
    message: {
      message: error.response.message,
      type: MessageType.ERROR
    }
  })),
  on(TodoActions.clearMessage, (state) => ({
    ...state,
    message: {} as Message,
  })),
);

