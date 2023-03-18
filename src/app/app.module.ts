import { NgModule } from '@angular/core';
import { ComomModule } from '../commom/comom.module';
import { AppComponent } from './app.component';
import { MatIconModule } from '@angular/material/icon'
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ComomModule,
    MatIconModule,
    MatCheckboxModule
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
