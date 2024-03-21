import { inject, Injectable, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import * as TodoSelector from './todo.selectors';
import * as TodoActions from './todo.actions';
import { Observable } from "rxjs";
import { TodoItem } from "./todo.models";
import { TodoState } from "./todo.reducer";

@Injectable()
export class TodoFacade {
  get todoList$(): Observable<TodoItem[]> {
    return this.store.pipe(select(TodoSelector.selectAllTodoList))
  }

  get isLoading$(): Observable<boolean> {
    return this.store.select(TodoSelector.selectLoadingState);
  }

  constructor (private store: Store<TodoState>) {
    this.store.dispatch(TodoActions.loadTodos());
  }

  createTodo (todoItem: TodoItem) {
    this.store.dispatch(TodoActions.createTodo(todoItem));
  }
}