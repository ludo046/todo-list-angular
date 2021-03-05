import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TodoService } from '../service/todo.service';

@Component({
  selector: 'app-single-todo',
  templateUrl: './single-todo.component.html',
  styleUrls: ['./single-todo.component.css']
})
export class SingleTodoComponent implements OnInit {
  todo;
  error
  constructor(private route: ActivatedRoute,
              private TodoService: TodoService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.todo = this.TodoService.getTodo(+id);
    if(!this.todo){
      this.error = "Id incorrect"
    }
  }

}
