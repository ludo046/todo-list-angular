import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { TodoService } from "../service/todo.service";



@Component({
    selector: 'my-todo',
    templateUrl: './todo.component.html',
    styleUrls:['./todo.component.css']
})

export class TodoComponent implements OnInit, OnDestroy{
    today;
    todos;
    todosSub: Subscription

    constructor(private todoService: TodoService,
                private router: Router){

    }
    ngOnInit(){
        this.today = this.todoService.today;
        this.todoService.todos
        this.todosSub = this.todoService.todosSubject.subscribe(
           (value: any[]) => {
               this.todos = value
           },
           (error) => {
               console.log("erreur"+ error);
           },
           () => {
               console.log(("Observable completé"));
               
           }
        )
        this.todoService.emitTodos();
    }

    onChangeStatus(i: number){
        this.todoService.onChangeStatus(i);
    }
    onChangeIsModif(i){
        this.todoService.onChangeIsModif(i);
    }
    onView(id: number){
        this.router.navigate(["single-todo",id])
    }

    ngOnDestroy(){
        this.todosSub.unsubscribe()
    }
    
}
