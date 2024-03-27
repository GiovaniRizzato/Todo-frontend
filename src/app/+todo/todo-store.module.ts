import { isDevMode, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TodoEffects } from './todo.effects';
import { TodoService } from './todo.service';
import * as TodoReducer from './todo.reducer';
import { TodoFacade } from './todo.facade';
import { environment } from 'src/environments/environment';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot({todo: TodoReducer.reducer}),
    EffectsModule.forRoot([TodoEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
  ],
  providers: [
    TodoFacade,
    TodoService
  ]
})
export class TodoStoreModule {}
