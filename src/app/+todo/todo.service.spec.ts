
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from './../../environments/environment';
import { Todo, TodoService } from "./todo.service";

describe('TodoService', () => {
  let service: TodoService;
  let httpController: HttpTestingController;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TodoService]
    });

    service = TestBed.inject(TodoService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('Should be able to get all list of todos', () => {
    service.getAllTodos ().subscribe ();

    const request = httpController.expectOne (`${environment.apiUrl}/api/todo`);
    expect(request.request.method).toEqual ('GET');
  });

  it('Should be able to create new Todo', () => {
    service.createTodo ({
      textLabel: "new todo item",
      isChecked: true
    } as Todo).subscribe ();

    const request = httpController.expectOne (`${environment.apiUrl}/api/todo`);
    expect(request.request.method).toEqual ('POST');
    expect(request.request.body).toEqual ({
      textLabel: "new todo item",
      isChecked: true
    } as Todo);
  });

  it('Should be able to edit a Todo', () => {
    service.editTodo ('2', {
      textLabel: "edited todo item",
      isChecked: false
    }).subscribe ();

    const request = httpController.expectOne (`${environment.apiUrl}/api/todo/2`);
    expect(request.request.method).toEqual ('PUT');
    expect(request.request.body).toEqual ({
      textLabel: "edited todo item",
      isChecked: false
    });
  });

  it('Should be able to edit a Todo', () => {
    service.removeTodo('2').subscribe ();

    const request = httpController.expectOne (`${environment.apiUrl}/api/todo/2`);
    expect(request.request.method).toEqual ('DELETE');
  });
});
