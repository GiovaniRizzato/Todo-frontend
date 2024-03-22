import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { TextItemModule } from './text-item/text-item.module';

@NgModule({
  imports: [
    HttpClientModule,
    BrowserModule
  ],
  exports: [
    TextItemModule
  ],
  providers: [],
})
export class ComomModule { }
