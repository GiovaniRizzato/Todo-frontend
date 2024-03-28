import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'text-item',
  templateUrl: './text-item.component.html',
  styleUrls: ['./text-item.component.css']
})
export class TextItemComponent {
  @Input() isChecked? = false;

  @Output() toggleChange = new EventEmitter<{checked: string, source: TextItemComponent}>();
  @Output() labelChanged = new EventEmitter<{newLabel: string, source: TextItemComponent}>();

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
    this.labelChanged.emit ({newLabel: this.form.newLabel, source: this});
    this.disableEditing ();
  };

  toggleChangeEvent (event: any){
    this.toggleChange.emit ({...event, source: this});
  }
}
