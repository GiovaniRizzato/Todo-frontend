import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

export interface Todo {
  id: String;
  label: String;
  isDone: Boolean
};

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor (private readonly http: HttpClient) {}

  getAllTodos (): Observable<Array<Todo>> {
    return this.http.get<Array<Todo>> ('/api/todo');
  }
  getTodoById (id: string): Observable<Todo> {
    return this.http.get<Todo> (`/api/todo/${id}`);
  }
  createTodo (newTodo: {label: string, isDone: boolean}): Observable<void> {
    return this.http.post<void> (`/api/todo`, newTodo);
  }
  editTodo (id: string, newFields: {label: string, isDone: boolean}): Observable<void> {
    return this.http.put<void> (`/api/todo/${id}`, newFields);
  }
}