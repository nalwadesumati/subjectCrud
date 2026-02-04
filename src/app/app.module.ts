import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoDashboardComponent } from './shared/component/todoCrud/todo-dashboard/todo-dashboard.component';
import { TodoListComponent } from './shared/component/todoCrud/todo-dashboard/todo-list/todo-list.component';
import { TodoFormComponent } from './shared/component/todoCrud/todo-dashboard/todo-form/todo-form.component';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { BookDashboardComponent } from './shared/component/book-dashboard/book-dashboard.component';
import { BookListComponent } from './shared/component/book-dashboard/book-list/book-list.component';
import { BookFormComponent } from './shared/component/book-dashboard/book-form/book-form.component';
@NgModule({
  declarations: [
    AppComponent,
    TodoDashboardComponent,
    TodoListComponent,
    TodoFormComponent,
    BookDashboardComponent,
    BookListComponent,
    BookFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatSnackBarModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
