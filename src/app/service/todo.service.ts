import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Todo } from './../models/todo.model';


@Injectable()
export class TodoService {
    today = new Date();
    todos: Todo[];
    todosSubject = new Subject<any[]>()

    constructor(private httpClient: HttpClient){
       this.getTodosFromServer()
    }
    addTodo(todo: Todo): void {
        this.todos.unshift(todo);
        this.emitTodos()
        this.saveTodosFromServer()
    }

    emitTodos(){
        this.todosSubject.next(this.todos);
    }

    onChangeStatus(i: number){
        this.todos[i].todoStatus = !this.todos[i].todoStatus;
        this.emitTodos
        this.saveTodosFromServer()
    }
    onChangeIsModif(i){
        this.todos[i].isModif = !this.todos[i].isModif;
        this.emitTodos
        this.saveTodosFromServer()
    }
    getTodo(index: number){
        if(this.todos[index]) {
            return this.todos[index];
        }
        return false    
    }
    saveTodosFromServer():void {
        this.httpClient.put('https://todo-list-app-b8883-default-rtdb.firebaseio.com/todos.json',this.todos).subscribe(() => {
            console.log("données enregistrées");
        },
        (error) => {
            console.log("erreur de sauvegarde:"+error);
            
        })
    }

    getTodosFromServer():void{
        this.httpClient.get<Todo[]>('https://todo-list-app-b8883-default-rtdb.firebaseio.com/todos.json').subscribe((getTodo: Todo[]) => {
            this.todos = getTodo
            this.emitTodos()
        }),
        (error) => {
            console.log('erreir de recuperation des données'+error);
        },
        () => {
            console.log("recuperation terminé");
            
        }
    }

}