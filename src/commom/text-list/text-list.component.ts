import { Component, Input } from '@angular/core';

export interface CheckboxData {
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
  @Input() textList: CheckboxData[] | null = [];

  removeItem (item: CheckboxData){
    this.textList?.splice(this.textList.indexOf(item), 1);
  }
}
