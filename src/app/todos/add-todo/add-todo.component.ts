import { Component, OnInit } from '@angular/core';
import { SnackBarService } from 'src/app/snackbar/snack-bar.service';
import { Todo } from '../todo';
import { TodosService } from '../todos.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['../../app.component.css']
})
export class AddTodoComponent implements OnInit {

  constructor(private todoService: TodosService, private snackbarService : SnackBarService) { }


  ngOnInit(): void {
  }


  addTodo(title: string): void {
    if (title.length === 0) { return; }
      this.todoService.addTodo({ title } as Todo)
        .subscribe()
  }

  openSnackBar(message: string, duration : number, action? : string){
    this.snackbarService.openSnackBar(message,duration, action)
  }

  

}
