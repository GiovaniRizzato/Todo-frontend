import { Component, Input } from '@angular/core';

export interface checkboxData {
  id: string;
  label: string;
  isChecked?: boolean;
}

@Component({
  selector: 'text-list',
  templateUrl: './text-list.component.html',
  styleUrls: ['./text-list.component.css']
})
export class TextListComponent {
  @Input() textList: checkboxData[] = [];

  removeItem (item: checkboxData){
    this.textList.splice(this.textList.indexOf(item), 1);
  }
}
