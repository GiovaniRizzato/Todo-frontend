import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { asyncScheduler, of } from 'rxjs';
import { map, catchError, concatMap, debounceTime } from 'rxjs/operators';
import { Todo, TodoService } from './todo.service';
import * as TodoAction from './todo.actions';
import { TodoItem } from './todo.models';

@Injectable()
export class TodoEffects {

  loadTodos$ = createEffect(() => ({
    debounce = 300,
    scheduler = asyncScheduler
  } = {}) => this.actions$.pipe(
    ofType(TodoAction.loadTodos),
    debounceTime(debounce, scheduler),
    concatMap(() => this.todoService.getAllTodos()
      .pipe(
        map(todoList => TodoAction.loadTodosSuccess({todoList: todoList.map(todo => TodoEffects.todoFromDataToModel(todo))})),
        catchError(error => of(TodoAction.loadTodosFailure(error)))
      )),
  ));

  editTodo$ = createEffect(() => ({
    debounce = 300,
    scheduler = asyncScheduler
  } = {}) => this.actions$.pipe(
    ofType(TodoAction.editTodo),
    debounceTime(debounce, scheduler),
    concatMap(modifiedTodo => this.todoService.editTodo(modifiedTodo.id, TodoEffects.todoFromModelToData(modifiedTodo))
      .pipe(
        map(() => TodoAction.todoManipulationSuccess()),
        catchError(error => of(TodoAction.todoManipulationFailure({ response: error })))
      )),
  ));

  createTodo$ = createEffect(() => ({
    debounce = 300,
    scheduler = asyncScheduler
  } = {}) => this.actions$.pipe(
    ofType(TodoAction.createTodo),
    debounceTime(debounce, scheduler),
    concatMap(newTodoLabel => this.todoService.createTodo({
      textLabel: newTodoLabel.label,
      isChecked: false
    }).pipe(
        map(() => TodoAction.todoManipulationSuccess()),
        catchError(error => of(TodoAction.todoManipulationFailure({ response: error })))
      )),
  ));

  removeTodo$ = createEffect(() => ({
    debounce = 300,
    scheduler = asyncScheduler
  } = {}) => this.actions$.pipe(
    ofType(TodoAction.removeTodo),
    debounceTime(debounce, scheduler),
    concatMap(removedTodoId => this.todoService.removeTodo(removedTodoId.id)
    .pipe(
        map(() => TodoAction.todoManipulationSuccess()),
        catchError(error => of(TodoAction.todoManipulationFailure({ response: error })))
      )),
  ));

  constructor(
    private readonly actions$: Actions,
    private readonly todoService: TodoService
  ) {}

  private static todoFromDataToModel(todo: Todo): TodoItem {
    return {
      id: todo.id,
      label: todo.textLabel,
      isDone: todo.isChecked
    } as TodoItem
  }

  private static todoFromModelToData(todo: TodoItem): Todo {
    return {
      id: todo.id,
      textLabel: todo.label,
      isChecked: todo.isDone
    } as Todo
  }
}
