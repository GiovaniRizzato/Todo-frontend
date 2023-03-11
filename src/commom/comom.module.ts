import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TextListModule } from './text-list/text-list.module';

@NgModule({
  imports: [
    BrowserModule
  ],
  exports: [
    TextListModule
  ],
  providers: [],
})
export class ComomModule { }
