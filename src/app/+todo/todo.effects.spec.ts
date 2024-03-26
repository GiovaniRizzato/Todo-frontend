import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';
import { Mock } from 'ts-mockery';
import { TodoEffects } from './todo.effects';
import { TodoService } from './todo.service';

describe('TodoEffects', () => {
  const enum TodoServiceName{
    editTodo = 'editTodo',
    createTodo = 'createTodo',
    removeTodo = 'removeTodo',
  }

  const enum TodoEffecteName{
    editTodo = 'editTodo$',
    createTodo = 'createTodo$',
    removeTodo = 'removeTodo$',
  }

  let actions$: Observable<Action>;
  let effects: TodoEffects = Mock.all<TodoEffects>();
  let testScheduler: TestScheduler;
  let mockTodoService: TodoService;

  beforeEach(() => {
    mockTodoService = Mock.from<TodoService>({
      getAllTodos: jest.fn(),
      createTodo: jest.fn(),
      editTodo: jest.fn(),
      removeTodo: jest.fn()
    });
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
    TestBed.configureTestingModule({
      providers: [
        TodoEffects,
        provideMockActions(() => actions$),
        { provide: TodoService, useFactory: () => mockTodoService }
      ]
    });

    effects = TestBed.inject(TodoEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('loadTodos$', () => {
    it('should map to a load sucess when it loads list sucessfuly', () => {
      testScheduler.run((helpers) => {
        const { cold, hot, expectObservable} = helpers;
        actions$ = hot('-a', {
          a: { type: '[Todo] Load Todos' },
        })

        const getTodoServiceSpy = jest.spyOn(mockTodoService, 'getAllTodos');
        getTodoServiceSpy.mockReturnValue(
          cold('s|', { s: [{
            id: "id1",
            textLabel: "label1",
            isChecked: false
          }]
        }));

        expectObservable(effects.loadTodos$({
          debounce: 20,
          scheduler: testScheduler
        })).toBe('19ms --a', {
          a: { type: '[Todo] Load Todos Success', todoList: [{
            id: "id1",
            label: "label1",
            isDone: false
          }]},
        });
      });
    });
  
    it('should map to a load error when it can\'t load the list', () => {
      testScheduler.run((helpers) => {
        const { cold, hot, expectObservable} = helpers;
        actions$ = hot('-a', {
          a: { type: '[Todo] Load Todos' },
        })

        const error = new HttpErrorResponse({
          status: 500,
          statusText: "Internal error",
          url: "url.test",
        });
        const getTodoServiceSpy = jest.spyOn(mockTodoService, 'getAllTodos');
        getTodoServiceSpy.mockReturnValue(
          cold('#|', {}, error)
        );

        expectObservable(effects.loadTodos$({
          debounce: 20,
          scheduler: testScheduler
        })).toBe('19ms --e', {
          e: { ...error, type: '[Todo] Load Todos Failure'},
        });
      });
    });
  });

  describe.each([
    [TodoEffecteName.editTodo, TodoServiceName.editTodo, '[Todo] Edit Todo'],
    [TodoEffecteName.createTodo, TodoServiceName.createTodo, '[Todo] Create Todo'],
    [TodoEffecteName.removeTodo, TodoServiceName.removeTodo, '[Todo] Remove Todo'],
  ])('%s', (effectTested: TodoEffecteName, serviceName: TodoServiceName, initialActionMessage: string) => {
    it(`${effectTested} successfully`, () => {
      testScheduler.run((helpers) => {
        const { cold, hot, expectObservable } = helpers;
        actions$ = hot('-a', {
          a: { type: initialActionMessage },
        });

        const getTodoServiceSpy = jest.spyOn(mockTodoService, serviceName);
        getTodoServiceSpy.mockReturnValue(
          cold('s|', {s: {} as any})
        );

        expectObservable(effects[effectTested]({
          debounce: 20,
          scheduler: testScheduler
        })).toBe('19ms --a', {
          a: { type: '[Todo] Todo Manipulation Success' },
        });
      });
    });

    it(`${effectTested} faliure`, () => {
      testScheduler.run((helpers) => {
        const { cold, hot, expectObservable } = helpers;
        actions$ = hot('-a', {
          a: { type: initialActionMessage },
        })

        const error = new HttpErrorResponse({
          status: 500,
          statusText: "Internal error",
          url: "url.test",
        });
        const getTodoServiceSpy = jest.spyOn(mockTodoService, serviceName);
        getTodoServiceSpy.mockReturnValue(
          cold('#|', {}, error)
        );

        expectObservable(effects[effectTested]({
          debounce: 20,
          scheduler: testScheduler
        })).toBe('19ms --e', {
          e: { type: '[Todo] Todo Manipulation Failure', response: error },
        });
      });
    });
  });
});
