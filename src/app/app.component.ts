import { Component, OnInit } from '@angular/core';
import { checkboxData } from 'src/commom/text-list/text-list.component';
import { TodoService } from './services/todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor (private readonly todoService: TodoService) {}
  
  title = 'Todo-frontend';
  todoList: Array<checkboxData> = [];

  ngOnInit (): void {
    this.todoService.getAllTodos ().subscribe ((todoDataArray) => {
      this.todoList = todoDataArray.map ((todoData) => ({
        id: todoData.id,
        label: todoData.label,
        isChecked: todoData.isDone
      } as checkboxData))
    });
  };
}
