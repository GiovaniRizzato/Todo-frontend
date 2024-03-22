import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoFacade } from './+todo/todo.facade';
import { TodoItem } from './+todo/todo.models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor (private readonly todoFacade: TodoFacade) {}
  
  title = 'Todo-frontend';
  $todoList: Observable<TodoItem[]> = this.todoFacade.todoList$;
  
  ngOnInit (): void {
  };

  onEdit($event: any, todoItem: TodoItem) {
    const modified = JSON.parse(JSON.stringify(todoItem)) as TodoItem;
    modified.isDone = typeof $event.checked !== 'undefined' ? $event.checked : modified.isDone;
    modified.label = typeof $event.newLabel !== 'undefined' ? $event.newLabel : modified.label;    
    this.todoFacade.editTodo(modified);
  };

  onRemove(id: string) {
    console.log(id)
  }
}
