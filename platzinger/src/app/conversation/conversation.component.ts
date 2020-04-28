import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';
import { ConversationService } from '../services/conversation.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {

  friendId: any;
  friends: User[];
  friend: User;
  user: User;
  conversation_id : string;
  textMessage: string;

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService, private conversationService: ConversationService, private authenticationService: AuthenticationService) {

    this.friendId = this.activatedRoute.snapshot.params['uid'];

    this.authenticationService.getStatus().subscribe((session) => {

      //OBTENEMOS EL USUARIO
      //nos subscribimos al observable de cambio de valor del objeto User
      this.userService.getUserById(session.uid).valueChanges().subscribe((user: User) => {
        this.user = user;

        //OBTENEMOS EL AMIGO
        this.userService.getUserById(this.friendId).valueChanges().subscribe((data: User) => {

          this.friend = data;
          console.log(this.friend);

          //aqui tenemos el USER y el FRIEND
          const ids :any[] = [this.user.uid, this.friend.uid].sort();

          this.conversation_id= ids.join('|');//asignamos finalmente el ID de la conversacion

        }, (error) => {

          console.log(error);

        });
        
      });

    });

  }

  ngOnInit(): void {
  }

  sendMessage() {

    const message = {
      uid: this.conversation_id,
      timestamp: Date.now(),
      text: this.textMessage,
      sender: this.user.uid,
      receiver: this.friend.uid
    };

    this.conversationService.createConversation(message).then(()=>{

      this.textMessage = '';
    });

  }

}
