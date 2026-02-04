import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Ibook } from '../models/book';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';

import { BehaviorSubject, Subject } from 'rxjs';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private _snackbar: SnackbarService) {}
  bookArr: Array<Ibook> = [
    {
      bname: 'Atomic Habits',
      id: '1',
    },
    {
      bname: 'The Alchemist',
      id: '2',
    },
    {
      bname: 'Rich Dad Poor Dad',
      id: '3',
    },
  ];
  private editBookSub$: Subject<Ibook> = new Subject<Ibook>();

  public editBookSubObs$: Observable<Ibook> = this.editBookSub$.asObservable();

  fetchAllData(): Observable<Ibook[]> {
    return of(this.bookArr);
  }

  createBook(book: Ibook) {
    this._snackbar.openSnackBar(`BookName added successfully !!!`);
    return of(book);
  }
  // book(book: any) {
  //   throw new Error('Method not implemented.');
  // }
  setEditBook(b: Ibook) {
    this.editBookSub$.next(b);
  }

  removeBook(id: string) {
    let getIndex = this.bookArr.findIndex((t) => t.id === id);
    this.bookArr.splice(getIndex, 1);
    this._snackbar.openSnackBar(`BookItem is removed successfully !!!`);
    // return of(todos[])
    return of(this.bookArr[0]);
  }

  updateBook(updateT: Ibook) {
    let getIndex = this.bookArr.findIndex((u) => u.id === updateT.id);

    this.bookArr[getIndex] = updateT;

    this._snackbar.openSnackBar(`Bookitem updated successfully !!!`);

    return of(this.bookArr);
  }
}
