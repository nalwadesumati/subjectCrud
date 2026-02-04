import { Component, Input } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Ibook } from 'src/app/shared/models/book';
import { BookService } from 'src/app/shared/service/book.service';
import { GetConfirmComponent } from '../../todoCrud/get-confirm/get-confirm.component';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent {
  @Input() data: Ibook[] = [];

  constructor(
    private _bookService: BookService,
    private _matDialog: MatDialog,
  ) {}

  trackById(index: number, book: Ibook): string {
    return book.id;
  }

  onEditBook(book: Ibook) {
    console.log('Edit Book:', book);
    this._bookService.setEditBook(book);
  }

  onRemoveBook(id: string) {
    let matConfig = new MatDialogConfig();
    ((matConfig.width = '600px'),
      (matConfig.data = `Are you sure to remove this bookItem with id ${id}`));

    let matdialogRef = this._matDialog.open(GetConfirmComponent, matConfig);
    matdialogRef.afterClosed().subscribe((flag) => {
      if (flag) {
        console.log(id);
        this._bookService.removeBook(id).subscribe((data) => {
          console.log(data);
        });
      }
    });
  }
}
