import * as TodoReducer from './todo.reducer';
import { TodoState } from './todo.reducer';
import * as TodoActions from './todo.actions';
import { TodoItem, Message, MessageType } from './todo.models';
import { HttpErrorResponse } from '@angular/common/http';

describe('Todo Reducer', () => {
  describe('loadTodos action', () => {

    it('should retrieve all todo list', () => {
      const { initialState } = TodoReducer;
      const action = TodoActions.loadTodos();
      const state = TodoReducer.reducer(initialState, action);

      expect(state).toEqual({
        todoList: [],
        loading: true,
        message: {} as Message,
        oldState: {} as TodoState,
      });
    });

    it('should sucessfully retrive all', () => {
      const listTodoArray = [{
        id: "1",
        label: "label1",
        isDone: true
      }, {
        id: "2",
        label: "label2",
        isDone: false
      }];
      const { initialState } = TodoReducer;
      const action = TodoActions.loadTodosSuccess({ todoList: listTodoArray});
      const state = TodoReducer.reducer(initialState, action);

      expect(state).toEqual({
        todoList: listTodoArray,
        loading: false,
        message: {} as Message,
        oldState: {} as TodoState,
      });
    });

    it('should sucessfully retrive all', () => {
      const errorResponse = new HttpErrorResponse({
        status: 500,
        statusText: "Internal error",
        url: "url.test",
      });
      const { initialState } = TodoReducer;
      const action = TodoActions.loadTodosFailure({ response: errorResponse});
      const state = TodoReducer.reducer(initialState, action);

      expect(state).toEqual({
        todoList: [],
        loading: false,
        message: {
          message: "Http failure response for url.test: 500 Internal error",
          type: MessageType.ERROR
        } as Message,
        oldState: {} as TodoState,
      });
    });
  });

  describe('editTodo/createTodo/removeTodo actions', () => {
    const currentState = {
      todoList: [{
        id: "1",
        label: "label1",
        isDone: true,
      }, {
        id: "2",
        label: "label2",
        isDone: false
      }],
      loading: false,
      message: {} as Message,
      oldState: {} as TodoState
    } as TodoState;

    it('should be able to edit a todo item', () => {
      const action = TodoActions.editTodo({
        id: "1",
        label: "label1",
        isDone: false
      });
      const newState = TodoReducer.reducer(currentState, action);
      expect(newState).toEqual({
        todoList: [{
          id: "1",
          label: "label1",
          isDone: false,
          type: "[Todo] Edit Todo",
        }, {
          id: "2",
          label: "label2",
          isDone: false
        }],
        loading: false,
        message: {} as Message,
        oldState: currentState,
      });
    });

    it('should be able to add a new todo item', () => {
      const action = TodoActions.createTodo({
        label: "label3"
      });
      const newState = TodoReducer.reducer(currentState, action);
      expect(newState).toEqual({
        todoList: [{
          id: "1",
          label: "label1",
          isDone: true,
        }, {
          id: "2",
          label: "label2",
          isDone: false
        }, {
          id: "3",
          label: "label3",
          isDone: false
        }],
        loading: false,
        message: {} as Message,
        oldState: currentState,
      });
    });

    it('should be able to remove todo item', () => {
      const action = TodoActions.removeTodo({
        id: "1"
      });
      const newState = TodoReducer.reducer(currentState, action);
      expect(newState).toEqual({
        todoList: [{
          id: "2",
          label: "label2",
          isDone: false
        }],
        loading: false,
        message: {} as Message,
        oldState: currentState,
      });
    });

    describe('manipulation actions', () => {
      const nextState = {
        todoList: [{
          id: "3",
          label: "label3",
          isDone: false,
        }, {
          id: "4",
          label: "label4",
          isDone: true
        }],
        loading: false,
        message: {} as Message,
        oldState: currentState
      } as TodoState;

      it('clear history when the manipulation is successfull', () => {
        const action = TodoActions.todoManipulationSuccess();
        const newState = TodoReducer.reducer(nextState, action);
        expect(newState).toEqual({
          todoList: [{
            id: "3",
            label: "label3",
            isDone: false,
          }, {
            id: "4",
            label: "label4",
            isDone: true
          }],
          loading: false,
          message: {} as Message,
          oldState: {} as TodoState
        } as TodoState);
      });

      it('should rollback when the manipulation is a faliure', () => {
        const errorResponse = new HttpErrorResponse({
          status: 500,
          statusText: "Internal error",
          url: "url.test",
        });

        const action = TodoActions.todoManipulationFailure({response: errorResponse});
        const newState = TodoReducer.reducer(nextState, action);
        expect(newState).toEqual({
          todoList: [{
            id: "1",
            label: "label1",
            isDone: true,
          }, {
            id: "2",
            label: "label2",
            isDone: false
          }],
          loading: false,
          message: {
            message: "Http failure response for url.test: 500 Internal error",
            type: MessageType.ERROR
          } as Message,
          oldState: {} as TodoState
        } as TodoState);
      });
    });
  });

  describe('clear message action', () => {
    const currentState = {
      todoList: [],
      loading: false,
      message: {
        message: "Test Message",
        type: MessageType.SUCCESS
      } as Message,
      oldState: {} as TodoState
    } as TodoState;

    it('should clear the message shown to the user', () => {
      const action = TodoActions.clearMessage();
      const newState = TodoReducer.reducer(currentState, action);
      expect(newState).toEqual({
        todoList: [],
        loading: false,
        message: {} as Message,
        oldState: {} as TodoState
      } as TodoState);
    });
  });
});
