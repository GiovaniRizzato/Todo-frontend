import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'text-item',
  templateUrl: './text-item.component.html',
  styleUrls: ['./text-item.component.css']
})
export class TextItemComponent {
  @Input() label!: string;
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
    this.label = this.form.newLabel;
    this.labelChanged.emit ({newLabel: this.label, source: this});
    this.disableEditing ();
  };

  toggleChangeEvent (event: any){
    this.toggleChange.emit ({...event, source: this});
  }
}
