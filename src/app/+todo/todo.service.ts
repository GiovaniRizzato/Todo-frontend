import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from './../../environments/environment';

export interface Todo {
  id?: string;
  textLabel: string;
  isChecked: boolean
};

@Injectable()
export class TodoService {
  constructor (private readonly http: HttpClient) {}

  getAllTodos (): Observable<Array<Todo>> {
    return this.http.get<Array<Todo>> (`${environment.apiUrl}/api/todo`);
  }
  createTodo (newTodo: Todo): Observable<void> {
    return this.http.post<void> (`${environment.apiUrl}/api/todo`, newTodo);
  }
  editTodo (id: string, newFields: Todo): Observable<void> {
    return this.http.put<void> (`${environment.apiUrl}/api/todo/${id}`, newFields);
  }
  removeTodo (id: string): Observable<void> {
    return this.http.delete<void> (`${environment.apiUrl}/api/todo/${id}`);
  }
}