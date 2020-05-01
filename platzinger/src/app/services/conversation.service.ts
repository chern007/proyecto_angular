import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  constructor(private angularFireDatabase: AngularFireDatabase) { }

  //funcion que agrega un mensaje a una conversacion
  createConversation(conversation){

    return this.angularFireDatabase.object('conversations/' + conversation.uid + '/' + conversation.timestamp).set(conversation);

  }

  getConversation(uid){

    return this.angularFireDatabase.list('conversations/'+ uid);

  }

  //sobreescribimos la conversacion, es igual que el metodo de crear nueva conversacion
  editConversation(conversation){

    return this.angularFireDatabase.object('conversations/' + conversation.uid + '/' + conversation.timestamp).set(conversation);

  }

}
