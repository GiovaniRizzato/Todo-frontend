import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { TodoFacade } from './+todo/todo.facade';
import { TodoItem } from './+todo/todo.models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor (
    private readonly todoFacade: TodoFacade,
    private readonly popUpBar: MatSnackBar
  ) {}
  
  title = 'Todo Frontend';
  $todoList: Observable<TodoItem[]> = this.todoFacade.todoList$;
  $isLoading: Observable<boolean> = this.todoFacade.isLoading$;
  form = {
    label: ''
  };
  
  ngOnInit (): void {
    this.todoFacade.message$.subscribe(message => {
      if (message.message) {
        this.popUpBar.open(`${message.type}: ${message.message}`, 'Close', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
        }).afterDismissed().subscribe(() => {
          this.todoFacade.clearMessage();
        });
      }
    })
  };

  onEdit($event: any, todoItem: TodoItem) {
    this.todoFacade.editTodo({
      id: todoItem.id,
      isDone: typeof $event.checked !== 'undefined' ? $event.checked : todoItem.isDone,
      label: typeof $event.newLabel !== 'undefined' ? $event.newLabel : todoItem.label
    } as TodoItem);
  };

  onCreation() {
    this.todoFacade.createTodo(this.form.label);
    this.form = {
      label: ''
    };
  }

  onRemove(id: string) {
    console.log(id)
  }
}
