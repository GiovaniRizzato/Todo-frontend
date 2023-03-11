import { NgModule } from '@angular/core';
import { ComomModule } from '../commom/comom.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ComomModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
