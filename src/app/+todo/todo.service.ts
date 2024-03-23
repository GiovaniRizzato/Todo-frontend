import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

export interface Todo {
  id?: string;
  textLabel: string;
  isChecked: boolean
};

@Injectable()
export class TodoService {
  constructor (private readonly http: HttpClient) {}

  getAllTodos (): Observable<Array<Todo>> {
    return this.http.get<Array<Todo>> ('/api/todo');
  }
  createTodo (newTodo: Todo): Observable<void> {
    return this.http.post<void> (`/api/todo`, newTodo);
  }
  editTodo (id: string, newFields: Todo): Observable<void> {
    return this.http.put<void> (`/api/todo/${id}`, newFields);
  }
  removeTodo (id: string): Observable<void> {
    return this.http.delete<void> (`/api/todo/${id}`);
  }
}