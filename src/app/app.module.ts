import { NgModule, isDevMode } from '@angular/core';
import { ComomModule } from '../commom/comom.module';
import { AppComponent } from './app.component';
import { MatIconModule } from '@angular/material/icon'
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TodoStoreModule } from './+todo/todo-store.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ComomModule,
    MatCardModule,
    MatIconModule,
    MatCheckboxModule,
    MatButtonModule,
    MatFormFieldModule,
    TodoStoreModule,
    BrowserAnimationsModule
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
