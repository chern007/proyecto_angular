import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';
import { ConversationService } from '../services/conversation.service';
import { AngularFireStorage } from 'angularfire2/storage';

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
  conversation_id: string;
  textMessage: string;
  conversation: any[];
  shake: boolean = false;
  fileToUpload: any;

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService, private conversationService: ConversationService, private authenticationService: AuthenticationService, private firebaseStorage: AngularFireStorage) {

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
          const ids: any[] = [this.user.uid, this.friend.uid].sort();

          this.conversation_id = ids.join('|');//asignamos finalmente el ID de la conversacion

          this.getConversation();//obtenemos la conversacion

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
      receiver: this.friend.uid,
      type: 'text'
    };

    this.conversationService.createConversation(message).then(() => {

      this.textMessage = '';
    });

  }

  sendZumbido() {

    const message = {
      uid: this.conversation_id,
      timestamp: Date.now(),
      text: null,
      sender: this.user.uid,
      receiver: this.friend.uid,
      type: 'zumbido'
    };

    this.conversationService.createConversation(message).then(() => {

      this.doZumbido();
    });

  }

  //metodo que se encarga de reproducir el zumbido
  doZumbido() {

    const audio = new Audio('assets/sound/zumbido.m4a');
    audio.play();
    this.shake = true;
    window.setTimeout(() => {
      this.shake = false;
    }, 1000);

  }


  getConversation() {

    this.conversationService.getConversation(this.conversation_id).valueChanges().subscribe((conv) => {

      console.log(conv);

      this.conversation = conv;

      this.conversation.map(message => {

        if (!message.seen) {

          //modificamos la propiedad de visto
          message.seen = true;
          //guardamos la propiedad de visto en el mensaje
          this.conversationService.editConversation(message);

          if (message.type == 'text') {

            //reproducimos el sonido de mensaje recibido
            const audio = new Audio('assets/sound/new_message.m4a');
            audio.play();

          } else if (message.type == 'zumbido') {

            this.doZumbido();

          }

        }

      });


    }, (error) => {

      console.log(error);

    });

  }


  getUserNickById(id) {

    if (id == this.friend.uid) {

      return this.friend.nick;

    } else {

      return this.user.nick;

    }

  }

  //metodo para subir la imagen
  uploadImage(evento: any) {

    const now = Date.now();

    this.fileToUpload = evento.target.files[0];

    
    console.log("Fichero a subir:");
    console.log(this.fileToUpload);

    this.firebaseStorage.ref('filesConversation/' + this.conversation_id + '_' + now + '_' + this.fileToUpload.name).put(this.fileToUpload).then((data)=>{

      this.firebaseStorage.ref('filesConversation/' + this.conversation_id + '_' + now + '_' + this.fileToUpload.name).getDownloadURL().subscribe((url)=>{

        alert("Imagen subida correctamente.");
        console.log(url);

      }, (error)=>{

          console.log("No se ha podido obtener la URL de la imagen subida.");
          console.log(error);
          

      })


    }).catch((error)=>{

      console.log(error);
      


    });

  }

  // metodo para introducir la imagen en una conversacion y restituirla en el panel :TODO
  

}
