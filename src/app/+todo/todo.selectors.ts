import { createSelector } from '@ngrx/store';
import { TodoState } from './todo.reducer';

const todoState = (AllStates: any) => AllStates.todo;

export const selectAllTodoList = createSelector (
    todoState,
    (state: TodoState) => state.todoList
);

export const selectLoadingState = createSelector (
    todoState,
    (state: TodoState) => state.loading
);

export const selectMessage = createSelector (
    todoState,
    (state: TodoState) => state.message
);