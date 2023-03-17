import { NgModule } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TextItemComponent } from './text-item/text-item.component';
import { TextListComponent } from './text-list.component';

@NgModule({
  declarations: [
    TextItemComponent,
    TextListComponent
  ],
  imports: [
    MatCheckboxModule
  ],
  exports: [
    TextListComponent
  ],
  providers: [],
})
export class TextListModule { }
