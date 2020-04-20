import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  operation: string = 'login';
  email: string = null;
  password: string = null;
  nick: string = null;

  constructor(private authenticationService: AuthenticationService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  //funcion de logado de usuario
  login() {

    this.authenticationService.loginWithEmail(this.email, this.password).then(

      (data) => {

        alert('logado correctamen5te');

        //cambiamos de pagina
        this.router.navigate(['home']);
        
        console.log(data);

      }

    ).catch(error => {

      console.log(error);

    });

  }

  //funcion de registro de nuevo usuario
  register() {

    // llamamos a la funcion de registrar nuevo usuario
    this.authenticationService.registerWithEmail(this.email, this.password).then(

      (data) => {

        const user = {
          uid: data.user.uid,
          email: this.email,
          nick: this.nick
        };

        // creamos el usuario
        this.userService.createUser(user).then((data2) => {

          alert('registrado correctamente');
          console.log(data2);

        }).catch((error) => {

          console.log(error);

        });

        alert('registrado correctamente');
        console.log(data);

      }

    ).catch(error => {

      console.log(error);

    });

  }

}
