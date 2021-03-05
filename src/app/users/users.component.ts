import { User } from './../models/user.model';
import { UsersService } from './../service/users.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[]

  constructor(private userService: UsersService) { }

  ngOnInit(): void {
    this.users = this.userService.users
  }

}
