import { Component, OnInit } from '@angular/core';

import { Ibook } from '../../models/book';
import { BookService } from '../../service/book.service';

@Component({
  selector: 'app-book-dashboard',
  templateUrl: './book-dashboard.component.html',
  styleUrls: ['./book-dashboard.component.scss'],
})
export class BookDashboardComponent implements OnInit {
  bookArr: Array<Ibook> = [];

  constructor(private _bookservice: BookService) {}

  trackById(index: number, o: Ibook) {
    return o.id;
  }
  ngOnInit(): void {
    this._bookservice.fetchAllData().subscribe((data) => {
      this.bookArr = data;
    });
  }
  getNewBook(b: Ibook) {
    this.bookArr = [...this.bookArr, b];
  }
}
