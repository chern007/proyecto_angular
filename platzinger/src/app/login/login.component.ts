import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  operation: string = 'login';
  email: string = null;
  password: string = null;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }

  //funcion de logado de usuario
  login() {

    this.authenticationService.loginWithEmail(this.email, this.password).then(

      (data) => {

        alert('logado correctamen5te');
        console.log(data);

      }

    ).catch(error => {

      console.log(error);

    });

  }

  //funcion de registro de nuevo usuario
  register() {

    this.authenticationService.registerWithEmail(this.email, this.password).then(

      (data) => {

        alert('registrado correctamente');
        console.log(data);

      }

    ).catch(error => {

      console.log(error);

    });

  }

}
