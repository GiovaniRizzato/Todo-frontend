import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, concatMap, mergeMap, tap } from 'rxjs/operators';
import { Todo, TodoService } from './todo.service';
import * as TodoAction from './todo.actions';
import { TodoItem } from './todo.models';

@Injectable()
export class TodoEffects {

  loadTodos$ = createEffect(() => this.actions$.pipe(
    ofType(TodoAction.loadTodos),
    concatMap(() => this.todoService.getAllTodos()
      .pipe(
        map(todoList => TodoAction.loadTodosSuccess({todoList: todoList.map(todo => TodoEffects.todoFromDataToModel(todo))})),
        catchError(error => of(TodoAction.loadTodosFailure(error)))
      )),
  ));

  editTodo$ = createEffect(() => this.actions$.pipe(
    ofType(TodoAction.editTodo),
    concatMap(modifiedTodo => this.todoService.editTodo(modifiedTodo.id, TodoEffects.todoFromModelToData(modifiedTodo))
      .pipe(
        map(() => TodoAction.editTodoSuccess()),
        catchError(error => of(TodoAction.editTodoFailure(error)))
      )),
  ));

  createTodo$ = createEffect(() => this.actions$.pipe(
    ofType(TodoAction.createTodo),
    concatMap(newTodoLabel => this.todoService.createTodo({
      textLabel: newTodoLabel.label,
      isChecked: false
    }).pipe(
        map(() => TodoAction.createTodoSuccess()),
        catchError(error => of(TodoAction.createTodoFailure(error)))
      )),
  ));

  removeTodo$ = createEffect(() => this.actions$.pipe(
    ofType(TodoAction.removeTodo),
    concatMap(removedTodoId => this.todoService.removeTodo(removedTodoId.id)
    .pipe(
        map(() => TodoAction.removeTodoSuccess()),
        catchError(error => of(TodoAction.removeTodoFailure(error)))
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
