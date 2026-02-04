import { Component, OnInit, TrackByFunction } from '@angular/core';
import { Itodo } from 'src/app/shared/models/todo';
import { TodoServiceService } from 'src/app/shared/service/todo-service.service';

@Component({
  selector: 'app-todo-dashboard',
  templateUrl: './todo-dashboard.component.html',
  styleUrls: ['./todo-dashboard.component.scss'],
})
export class TodoDashboardComponent implements OnInit {
  todosArr: Array<Itodo> = [];

  constructor(private _todoservice: TodoServiceService) {}

  ngOnInit(): void {
    this._todoservice.fetchTodos().subscribe({
      next: (data) => {
        this.todosArr = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getTodo(t: Itodo) {
    this.todosArr.push(t);
  }
}
