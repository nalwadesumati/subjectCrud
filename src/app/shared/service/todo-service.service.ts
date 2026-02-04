import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Itodo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { SnackbarService } from './snackbar.service';
import { of } from 'rxjs/internal/observable/of';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root',
})
export class TodoServiceService {
  BASE_URL: string = environment.BASE_URL;
  TODOS_URL: string = `${this.BASE_URL}/todos`;

  constructor(private _snackbar: SnackbarService) {}

  todos: Array<Itodo> = [
    {
      todoItem: 'Css',
      id: '1',
    },
    {
      todoItem: 'Sass',
      id: '2',
    },
    {
      todoItem: 'node js',
      id: '3',
    },
  ];

  fetchTodos(): Observable<Itodo[]> {
    return of(this.todos);
  }

  createTodo(t: Itodo) {
    this._snackbar.openSnackBar(`TodoItem added successfully !!!`);
    return of(t);
  }
  removeTodo(id: string) {
    let getIndex = this.todos.findIndex((t) => t.id === id);
    this.todos.splice(getIndex, 1);
    this._snackbar.openSnackBar(`TodoItem is removed successfully !!!`);
    // return of(todos[])
    return of(this.todos[0]);
  }

  private editTodoSub$: Subject<Itodo> = new Subject<Itodo>();

  public editTodoSubObs$: Observable<Itodo> = this.editTodoSub$.asObservable();

  setEditTodo(t: Itodo) {
    this.editTodoSub$.next(t);
  }

  updateTodo(updateT: Itodo) {
    let getIndex = this.todos.findIndex((u) => u.id === updateT.id);

    this.todos[getIndex] = updateT;

    this._snackbar.openSnackBar(`TodoItem updated successfully !!!`);

    return of(this.todos);
  }
}
