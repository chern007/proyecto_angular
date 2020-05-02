import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';
import { RESTserviceService } from '../services/restservice.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RequestsService } from '../services/requests.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: User;
  friends: User[];
  query: string = '';

  friendEmail: string = '';
  closeResult: string = '';

  constructor(private userService: UserService, private authenticationService: AuthenticationService, private router: Router, private restService: RESTserviceService, private modalService: NgbModal, private requestService: RequestsService) {

    // let us: UserService = new UserService();

    // console.log(us.getFriends());

    //OBTENEMOS EL ESTADO DE AUTENTIFICACION
    this.authenticationService.getStatus().subscribe((session) => {

      //OBTENEMOS EL USUARIO A TRAVES DEL ID DEL USUARIO AUTENTICADO
      this.userService.getUserById(session.uid).valueChanges().subscribe((data: User) => {

        console.log("TUUUUUUUUUUUUUUSAAAAAAA--->>>");
        this.user = data;
        console.log(this.user);

      }, (error) => {

        console.log(error);

      });


    }, (error) => {

      console.log(error);

    });

    this.userService.getUsers().valueChanges().subscribe((data: User[]) => {

      this.friends = data;

    }, (error) => {

      console.log(error);

    });

    //hacemos la llamada al rest de peliculas para probar que funcione correctamente el modulo HttpClient
    console.log(restService.getPelicula("589"));

  }

  ngOnInit(): void {
  }

  logOut() {

    this.authenticationService.logOut().then(() => {

      alert('Sesion cerrada!');
      this.router.navigate(['login']);

    }
    ).catch((error) => {

      console.log(error);

    });

  }

  open(content) {

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {

      this.closeResult = `Closed with: ${result}`;

    }, (reason) => {

      this.closeResult = 'Modal cerrado';

    });
  }

  sendRequest() {

    const request = {

      timestamp: Date.now(),
      receiverEmail: this.friendEmail,
      sender: this.user.uid,
      status: 'pending'

    };

    //CREAMOS UNA PETICION DE AMISTAD
    this.requestService.createRequest(request).then((data)=>{

        alert("Solicitud enviada!");

    }).catch((error)=>{

      console.log('Error al enviar la solicitud de amistad.');
      console.log(error);


    });

  }

}
