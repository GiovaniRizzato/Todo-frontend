import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import * as TodoSelector from './todo.selectors';
import * as TodoActions from './todo.actions';
import { Observable } from "rxjs";
import { Message, TodoItem } from "./todo.models";
import { TodoState } from "./todo.reducer";

@Injectable()
export class TodoFacade {
  get todoList$(): Observable<TodoItem[]> {
    return this.store.pipe(select(TodoSelector.selectAllTodoList))
  }

  get isLoading$(): Observable<boolean> {
    return this.store.select(TodoSelector.selectLoadingState);
  }

  get message$(): Observable<Message> {
    return this.store.select(TodoSelector.selectMessage);
  }

  constructor (private store: Store<TodoState>) {
    this.store.dispatch(TodoActions.loadTodos());
  }

  editTodo (todoItem: TodoItem) {
    this.store.dispatch(TodoActions.editTodo(todoItem));
  }

  clearMessage () {
    this.store.dispatch(TodoActions.clearMessage());
  }
}