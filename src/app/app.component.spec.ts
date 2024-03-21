import { render, RenderResult, screen } from '@testing-library/angular'
import { AppComponent } from './app.component';
import { Mock } from 'ts-mockery'
import { of } from 'rxjs'
import { TodoFacade } from './+todo/todo.facade';

describe('AppComponent', () => {
  let component: RenderResult<AppComponent, AppComponent>;

  beforeEach(async () => {
    const mockTodoFacade: TodoFacade = Mock.from<TodoFacade>({
      todoList$: of([])
    });

    component = await render (AppComponent, {
      providers: [
        { provide: TodoFacade, useFactory: () => mockTodoFacade }
      ],
    });
  });

  describe('When the page loads', () => {
    it('Should render the message', () => {
      expect (component.getByText('Todo-frontend')).toBeVisible ();
    });
  });
});
