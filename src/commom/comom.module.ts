import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TextListModule } from './text-list/text-list.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    HttpClientModule,
    BrowserModule
  ],
  exports: [
    TextListModule
  ],
  providers: [],
})
export class ComomModule { }
