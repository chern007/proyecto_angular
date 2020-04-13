import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  friends: User[];

  constructor() {

    let usuario1: User = { nick: 'Eduardo', subnick: 'Mi mensaje personal', age: 28, email: 'eduardo@platzi.com', friend: true, uid: 1 };

    let usuario2: User = { nick: 'Yuliana', subnick: 'Mi mensaje personal', age: 25, email: 'yuliana@platzi.com', friend: true, uid: 2 };

    let usuario3: User = { nick: 'Freddy', subnick: 'Mi mensaje personal', age: 28, email: 'freddy@platzi.com', friend: false, uid: 3 };

    let usuario4: User = { nick: 'Carlos', subnick: 'Mi mensaje personal', age: 32, email: 'carloshernandezcrespo@gmail.com', friend: true, uid: 4 };

    this.friends = [usuario1, usuario2, usuario3, usuario4]

  }


  getFriends(){

    return this.friends;
  }

}