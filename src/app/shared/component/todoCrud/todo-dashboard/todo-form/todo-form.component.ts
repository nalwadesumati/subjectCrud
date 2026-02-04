import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Itodo } from 'src/app/shared/models/todo';
import { TodoServiceService } from 'src/app/shared/service/todo-service.service';
import { UuidService } from 'src/app/shared/service/uuid.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss'],
})
export class TodoFormComponent implements OnInit {
  @ViewChild('todoform') todoform!: NgForm;
  @Output() emitAddTodo: EventEmitter<Itodo> = new EventEmitter<Itodo>();
  isInEditMode: boolean = false;
  editId!: string;
  constructor(
    private _todoservice: TodoServiceService,
    private _uuid: UuidService,
  ) {}

  ngOnInit(): void {
    this.patchValue();
  }

  onSubmit() {
    if (this.todoform.valid) {
      let obj: Itodo = {
        ...this.todoform.value,
        id: this._uuid.uuid(),
      };
      console.log(obj);
      this._todoservice.createTodo(obj).subscribe({
        next: (data) => {
          console.log(data);
          this.emitAddTodo.emit(data);
        },
        error: (err) => {
          console.log(err);
        },
      });

      this.todoform.reset();
    }
  }
  patchValue() {
    this._todoservice.editTodoSubObs$.subscribe((res) => {
      if (res) {
        this.todoform.form.patchValue(res);
        this.isInEditMode = true;
        this.editId = res.id;
      }
    });
  }
  onUpdateTodo() {
    if (this.todoform.valid) {
      let obj: Itodo = {
        ...this.todoform.value,
        id: this.editId,
      };
      console.log(obj);

      this._todoservice.updateTodo(obj).subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
    this.isInEditMode = false;
    this.todoform.reset();
  }
}
