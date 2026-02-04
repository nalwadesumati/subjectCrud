import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';

import { Ibook } from 'src/app/shared/models/book';

import { BookService } from 'src/app/shared/service/book.service';
import { UuidService } from 'src/app/shared/service/uuid.service';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss'],
})
export class BookFormComponent implements OnInit {
  @ViewChild('bookForm') bookForm!: NgForm;

  @Output() emitAddBook: EventEmitter<Ibook> = new EventEmitter<Ibook>();

  isInEditMode: boolean = false;
  editId!: string;

  constructor(
    private _bookService: BookService,
    private _uuid: UuidService,
  ) {}

  ngOnInit(): void {
    this.patchValue();
  }

  onSubmit() {
    console.log('Form Value =>', this.bookForm.value);

    if (this.bookForm.valid) {
      const obj: Ibook = {
        ...this.bookForm.value,
        id: this._uuid.uuid(),
      };

      console.log(obj);

      this._bookService.createBook(obj).subscribe({
        next: (data) => {
          console.log('API Response =>', data);
          this.emitAddBook.emit(data);
          this.bookForm.reset();
        },
        error: (err) => console.log(err),
      });
    }
  }
  patchValue() {
    this._bookService.editBookSubObs$.subscribe((res) => {
      if (res) {
        this.bookForm.form.patchValue(res);
        this.isInEditMode = true;
        this.editId = res.id;
      }
    });
  }
  onUpdateBook() {
    if (this.bookForm.valid) {
      let obj: Ibook = {
        ...this.bookForm.value,
        id: this.editId,
      };
      console.log(obj);

      this._bookService.updateBook(obj).subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
    this.isInEditMode = false;
    this.bookForm.reset();
  }
}
