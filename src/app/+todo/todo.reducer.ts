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
  on(TodoActions.loadTodosFailure, (state, error: any) => ({
    ...state,
    message: {
      message: error.message,
      type: MessageType.ERROR
    }
  })),
  on(TodoActions.editTodo, (state, newState: TodoItem) => ({
      ...state,
      todoList: state.todoList.map(todoItem => todoItem.id === newState.id ? newState : todoItem),
      oldState: state,
  })),
  on(TodoActions.editTodoSuccess, (state) => ({
    ...state,
    oldState: {} as TodoState //Clear the hitory once it's done
  })),
  on(TodoActions.editTodoFailure, (state, error: any) => ({
    ...state.oldState,
    message: {
      message: error.message,
      type: MessageType.ERROR
    }
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
  on(TodoActions.createTodoSuccess, (state) => ({
    ...state,
    oldState: {} as TodoState //Clear the hitory once it's done
  })),
  on(TodoActions.createTodoFailure, (state, error: any) => ({
    ...state.oldState,
    message: {
      message: error.message,
      type: MessageType.ERROR
    }
  })),
  on(TodoActions.clearMessage, (state) => ({
    ...state,
    message: {} as Message,
  })),
);

