import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';
import { RESTserviceService } from '../services/restservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  friends: User[];
  query:string = '';

  constructor(private userService: UserService, private authenticationService: AuthenticationService, private router: Router , private restService :RESTserviceService) {

    // let us: UserService = new UserService();

    // console.log(us.getFriends());

    this.userService.getUsers().valueChanges().subscribe((data: User[]) =>{

      this.friends = data;

    }, (error)=>{

      console.log(error);      

    });

    //hacemos la llamada al rest de peliculas para probar que funcione correctamente el modulo HttpClient
    console.log(restService.getPelicula("589"));

    // let myUser: User = {

    //   nick: 'Carlos',
    //   subnick: 'Charly',
    //   age: 32,
    //   email: 'carloshernandezcrespo@gmail.com',
    //   friend: true,
    //   uid: 1
    // }

    // let users: User[] = [myUser];

  }

  ngOnInit(): void {
  }

  logOut(){

    this.authenticationService.logOut().then(()=>{

      alert('Sesion cerrada!');
      this.router.navigate(['login']);

    }
    ).catch((error)=>{

      console.log(error);     

    });

  }

}
