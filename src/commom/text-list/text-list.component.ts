import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface CheckboxData {
  id?: string;
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
  @Output() change = new EventEmitter<any>();

  onLabelChanged ($event: any, id?: string){
    this.change.emit({...$event, id});
  }

  onToggleChange ($event: any, id?: string){
    this.change.emit({...$event, id});
  }

  removeItem (item: CheckboxData){
    this.textList?.splice(this.textList.indexOf(item), 1);
    this.change.emit();
  }
}
