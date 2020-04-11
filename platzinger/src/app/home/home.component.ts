import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() {

    let myUser: User = {

      nick: 'Carlos',
      subnick: 'Charly',
      age: 32,
      email: 'carloshernandezcrespo@gmail.com',
      friend: true,
      uid: 1
    }

    let users: User[] = [

      myUser

    ];




  }

  ngOnInit(): void {
  }

}
