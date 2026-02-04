import { Component, Input, OnInit } from '@angular/core';
import { Itodo } from 'src/app/shared/models/todo';
import { TodoServiceService } from 'src/app/shared/service/todo-service.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GetConfirmComponent } from '../../get-confirm/get-confirm.component';
import { Ito } from 'rxjsPractice/src/app/shared/todoCrud/models/todocrud';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  @Input() data!: Itodo[];

  constructor(
    private _todoService: TodoServiceService,
    private _matDialog: MatDialog,
  ) {}

  trackById(index: number, o: Itodo) {
    return o.id;
  }

  ngOnInit(): void {}

  onEditTodo(t: Itodo) {
    console.log(t);
    this._todoService.setEditTodo(t);
  }

  onRemoveTodo(id: string) {
    let matConfig = new MatDialogConfig();
    ((matConfig.width = '600px'),
      (matConfig.data = `Are you sure to remove this todoitem with id ${id}`));

    let matdialogRef = this._matDialog.open(GetConfirmComponent, matConfig);
    matdialogRef.afterClosed().subscribe((flag) => {
      if (flag) {
        console.log(id);
        this._todoService.removeTodo(id).subscribe((data) => {
          console.log(data);
        });
      }
    });
  }
}
