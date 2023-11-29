import { render, screen } from '@testing-library/angular'
import { AppComponent } from './app.component';
import { TodoService } from './services/todo.service';
import { Mock } from 'ts-mockery'
import { of } from 'rxjs'

describe('AppComponent', () => {
  beforeEach(async () => {
    const mockTodoService: TodoService = Mock.from<TodoService>({
      getAllTodos: () => of([])
    });

    await render (AppComponent, {
      providers: [
        { provide: TodoService, useFactory: () => mockTodoService }
      ],
    });
  });

  describe('When the page loads', () => {
    it('Should render the message', () => {
      expect (screen.getByText('Todo-frontend')).toBeInTheDocument ();
    });
  });
});
