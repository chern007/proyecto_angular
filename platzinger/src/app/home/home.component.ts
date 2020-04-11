import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  friends: User[];


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

    let usuario1: User = { nick: 'Eduardo', subnick: 'Mi mensaje personal', age: 28, email: 'eduardo@platzi.com', friend: true, uid: 2 };

    let usuario2: User = { nick: 'Yuliana', subnick: 'Mi mensaje personal', age: 25, email: 'yuliana@platzi.com', friend: true, uid: 2 };

    let usuario3: User = { nick: 'Freddy', subnick: 'Mi mensaje personal', age: 28, email: 'freddy@platzi.com', friend: false, uid: 2 };


    this.friends = [usuario1, usuario2, usuario3]


  }

  ngOnInit(): void {
  }

}
