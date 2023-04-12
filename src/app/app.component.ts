import { Component } from '@angular/core';
import { checkboxData } from 'src/commom/text-list/text-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Todo-frontend';
  todoList = [
    {
      id: "1",
      label: "Test label 1",
    } as checkboxData,
    {
      id: "2",
      label: "Test label 2",
      isChecked: true
    } as checkboxData,
    {
      id: "3",
      label: "Deletable",
      isChecked: false
    } as checkboxData
  ]
}
