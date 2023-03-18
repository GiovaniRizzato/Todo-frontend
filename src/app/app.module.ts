import { NgModule } from '@angular/core';
import { ComomModule } from '../commom/comom.module';
import { AppComponent } from './app.component';
import { MatIconModule } from '@angular/material/icon'
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ComomModule,
    MatIconModule,
    MatCheckboxModule,
    MatButtonModule,
    MatFormFieldModule
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
