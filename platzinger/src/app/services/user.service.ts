import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  friends: User[];

  constructor(private angulaFireDatabase: AngularFireDatabase) {

  }

  getUsers() {

    return this.angulaFireDatabase.list('/users');
  }

  getUserById(uid) {

    return this.angulaFireDatabase.object('/users/' + uid);

  };

  createUser(user){

    return this.angulaFireDatabase.object('/users/' + user.uid).set(user);
  }

  editeUser(user){

    return this.angulaFireDatabase.object('/users/' + user.uid).set(user);
  }

}
