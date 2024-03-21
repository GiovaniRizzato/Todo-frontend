import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, concatMap, mergeMap } from 'rxjs/operators';
import { Todo, TodoService } from './todo.service';
import * as TodoAction from './todo.actions';
import { TodoItem } from './todo.models';

@Injectable()
export class TodoEffects {

  loadTodos$ = createEffect(() => this.actions$.pipe(
    ofType(TodoAction.loadTodos),
    concatMap(() => this.todoService.getAllTodos()
      .pipe(
        map(todoList => TodoAction.loadTodosSuccess({data: todoList.map(todo => TodoEffects.todoFromDataToModel(todo))})),
        catchError(error => of(TodoAction.loadTodosFailure(error)))
      ))
    )
  );

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
}
