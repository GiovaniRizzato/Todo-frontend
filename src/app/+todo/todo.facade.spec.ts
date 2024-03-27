import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Mock } from 'ts-mockery';
import { TodoFacade } from './todo.facade';
import { TodoState } from './todo.reducer';
import * as TodoSelector from './todo.selectors';
import * as TodoActions from './todo.actions';

describe('TodoFacade', () => {

  let mockStore: Store<TodoState>;
  let actions$: Observable<Action>;
  let facade: TodoFacade;

  beforeEach(() => {
    mockStore = Mock.from<Store<TodoState>>({
      dispatch: jest.fn(),
      select: jest.fn(),
    });
    TestBed.configureTestingModule({
      providers: [
        TodoFacade,
        provideMockActions(() => actions$),
        { provide: Store, useFactory: () => mockStore }
      ]
    });

    facade = TestBed.inject(TodoFacade);
  });

  it('should be created', () => {
    expect(facade).toBeTruthy();
  });

  it('should be able to get the todo list', () => {
    facade.todoList$;
    expect(mockStore.select).toBeCalledWith(TodoSelector.selectAllTodoList);
  });

  it('should be able to the loading state', () => {
    facade.isLoading$;
    expect(mockStore.select).toBeCalledWith(TodoSelector.selectLoadingState);
  });

  it('should be able to the message that should be shown to the user', () => {
    facade.message$;
    expect(mockStore.select).toBeCalledWith(TodoSelector.selectMessage);
  });

  it('should be able to edit a todo item', () => {
    const editedTodo = {
      id: "id1",
      label: "label",
      isDone: true
    };
    facade.editTodo(editedTodo);
    expect(mockStore.dispatch).toBeCalledWith(TodoActions.editTodo(editedTodo));
  });

  it('should be able to create a new todo item', () => {
    facade.createTodo("label");
    expect(mockStore.dispatch).toBeCalledWith(TodoActions.createTodo({label: "label"}));
  });

  it('should be able to remove a todo item', () => {
    facade.removeTodo("id");
    expect(mockStore.dispatch).toBeCalledWith(TodoActions.removeTodo({id: "id"}));
  });

  it('should be able to clear message that had been shown to the user', () => {
    facade.clearMessage();
    expect(mockStore.dispatch).toBeCalledWith(TodoActions.clearMessage());
  });
});
