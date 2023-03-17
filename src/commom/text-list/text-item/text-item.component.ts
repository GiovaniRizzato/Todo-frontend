import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'text-item',
  templateUrl: './text-item.component.html',
  styleUrls: ['./text-item.component.css']
})
export class TextItemComponent {
  @Input() label!: String;
  @Input() isChecked? = false;

  @Output() toggleChange = new EventEmitter();
  @Output() labelChanged = new EventEmitter<string>();
  
  private isLabelBeenEdited = false;

  constructor() {};
}
