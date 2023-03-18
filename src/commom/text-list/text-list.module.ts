import { NgModule } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { TextItemComponent } from './text-item/text-item.component';
import { TextListComponent } from './text-list.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    TextItemComponent,
    TextListComponent
  ],
  imports: [
    BrowserModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule
  ],
  exports: [
    TextListComponent
  ]
})
export class TextListModule { }
