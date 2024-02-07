import { NgModule } from '@angular/core';
import { ComomModule } from '../commom/comom.module';
import { AppComponent } from './app.component';
import { MatIconModule } from '@angular/material/icon'
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ComomModule,
    MatIconModule,
    MatCheckboxModule,
    MatButtonModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({}, {})
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
