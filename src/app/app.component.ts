import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable, of, withLatestFrom } from 'rxjs';
import * as TodoActions from './+todo/todo.actions';
import { CheckboxData } from 'src/commom/text-list/text-list.component';
import { TodoFacade } from './+todo/todo.facade';
import { TodoState } from './+todo/todo.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor (private readonly todoFacade: TodoFacade) {}
  
  title = 'Todo-frontend';
  $todoList: Observable<CheckboxData[]> = of([]);
  
  ngOnInit (): void {
    this.$todoList = this.todoFacade.todoList$
    .pipe(
      map(todoItemList => 
        todoItemList.map(todoItem => ({
          id: todoItem.id,
          label: todoItem.label,
          isChecked: todoItem.isDone
        } as CheckboxData))
      ),
    );    
  };
}
