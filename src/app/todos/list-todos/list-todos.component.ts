import { Component, OnInit } from '@angular/core';
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
  nbrePages : number = 0;
  TODOPERPAGE : number = 10;
  checkboxState : boolean = false;

  constructor(private todoService: TodosService,
    private snackbarService : SnackBarService
    ) { }

  ngOnInit(): void {
    this.getTodos();
  }

  getTodos(): void {
  this.todoService.getTodos()
      .subscribe(
        (todos) => {
          this.todos = todos;
          if(todos.length === 0){
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

  openSnackBar(message: string, duration : number, action? : string){
    this.snackbarService.openSnackBar(message,duration, action)
  }

  isCheck(){

  }

  getPages() {
    this.nbrePages = Math.ceil(this.todos.length / 10);
    console.log(this.nbrePages);
  }

  nextTodos(){
  }


  previousTodos(){
  }
}
