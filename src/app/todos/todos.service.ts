import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Todo } from './todo';
import { catchError, map, tap, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TodosService {

  todos : Todo[] = [];

  httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' }); 

  httpOptions = {
    headers : this.httpHeaders,
  } 

  private todosUrl = 'http://localhost:3000/todos';
  
  private todoUrl = 'http://localhost:3000/todo/';


  constructor(
    private http: HttpClient,
  ) { }



  getTodos(): Observable<Todo[]>{
    return this.http.get<Todo[]>(this.todosUrl);
  }

  

  addTodo(todo : Todo): Observable<Todo>{
    return this.http.post<Todo>(this.todoUrl, todo, this.httpOptions);
  }


  deleteTodo(id : number): Observable<Todo>{
    return this.http.delete<Todo>(this.todoUrl+`${id}`, this.httpOptions);
  }

}



