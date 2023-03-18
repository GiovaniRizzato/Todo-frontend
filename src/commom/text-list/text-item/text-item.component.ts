import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'text-item',
  templateUrl: './text-item.component.html',
  styleUrls: ['./text-item.component.css']
})
export class TextItemComponent {
  @Input() label!: String;
  @Input() isChecked? = false;

  @Output() toggleChange = new EventEmitter<Boolean>();
  @Output() labelChanged = new EventEmitter<String>();

  isLabelBeenEdited = false;
  form = {
    newLabel: ''
  };

  constructor() {};

  enableEditing () {
    this.isLabelBeenEdited = true;
  };

  disableEditing () {
    this.isLabelBeenEdited = false;
    this.form.newLabel = '';
  };

  confirmEditing() {
    this.label = this.form.newLabel;
    this.labelChanged.emit (this.label);
    this.disableEditing ();
  };

  toggleChangeEvent (event: any){
    this.toggleChange.emit (event);
  }
}
