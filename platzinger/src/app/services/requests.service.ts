import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  constructor(private angularFireDatabase: AngularFireDatabase) { }

  createRequest(request) {

    const cleanEmail: string = request.receiverEmail.replace('.', ',');

    return this.angularFireDatabase.object('requests/' + cleanEmail + '/' + request.sender).set(request);

  }

  setRequestStatus(request, status) {

    const cleanEmail: string = request.receiverEmail.replace('.', ',');
    return this.angularFireDatabase.object('requests/' + cleanEmail + '/' + request.sender + '/status').set(status);


  }

  getRequestForEmail(email){

    const cleanEmail: string = email.replace('.', ',');

    return this.angularFireDatabase.list('requests/' + cleanEmail);

  }

}
