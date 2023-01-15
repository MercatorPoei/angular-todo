import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { EventType } from '@angular/router';
import { timeout } from 'rxjs';
import { SnackBarService } from 'src/app/snackbar/snack-bar.service';

import { Todo } from '../todo';
import { TodosService } from '../todos.service';

@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['../../app.component.css']
})
export class ListTodosComponent implements OnInit {
  todos: Todo[] = [];
  tabTodos: Todo[] = [];
  todosPerPage: number = 5;
  indexFirstTodo: number = 0;
  indexLastTodo: number = 4;

  constructor(private todoService: TodosService,
    private snackbarService: SnackBarService
  ) { }

  ngOnInit(): void {
    this.getTodos();
  }

  getTodos(): void {
    this.todoService.getTodos()
      .subscribe(
        (todos) => {
          this.todos = todos;
          this.displayTodos();

          if (todos.length === 0) {
            this.snackbarService.openSnackBar("Aucun Todo", 4000)
          }
        }
      )
  }


  deleteTodo(todo: Todo): void {
    // filter => affiche seulement les elements differents de todo
    //  on part du principe que le delete va être ok
    this.todos = this.todos.filter(t => t !== todo);
    this.todoService.deleteTodo(todo.id)
      .subscribe();
  }


  openSnackBar(message: string, duration: number, action?: string) {
    this.snackbarService.openSnackBar(message, duration, action)
  }



  isCompleted($event: Event, todo: number) {
    console.log("selected" + todo);
  }


  disableNext(): boolean {
    if (this.indexLastTodo >= this.todos.length - 1) {
      return true;
    } else {
      return false;
    }
  }


  disablePrevious(): boolean {
    if (this.indexFirstTodo === 0) {
      return true;
    } else {
      return false;
    }
  }

  nextPage() {
    this.indexFirstTodo = this.indexFirstTodo + this.todosPerPage;
    this.indexLastTodo = this.indexLastTodo + this.todosPerPage;

    if (this.indexFirstTodo > this.todos.length - 1) {
      this.indexLastTodo = this.todos.length - 1;
      this.indexFirstTodo = this.todos.length - this.todosPerPage;
    }

    console.log(this.indexFirstTodo, this.indexLastTodo, this.todos.length)

    this.displayTodos();
  }

  previousPage() {
    this.indexFirstTodo = this.indexFirstTodo - this.todosPerPage;
    this.indexLastTodo = this.indexLastTodo - this.todosPerPage;

    if (this.indexFirstTodo < 0) {
      this.indexFirstTodo = 0;
      this.indexLastTodo = this.todosPerPage - 1;
    }
    console.log(this.indexFirstTodo, this.indexLastTodo, this.todosPerPage)
    this.displayTodos();
  }


  displayTodos(): Todo[] {
    this.tabTodos = this.todos.slice(this.indexFirstTodo,this.indexLastTodo+1);
    console.log(this.tabTodos);
    console.log(this.todos);
    return this.tabTodos;
  }

}
