import { RequestsService } from './services/requests.service';
import { UserService } from './services/user.service';
import { AuthenticationService } from './services/authentication.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './interfaces/user';
import { RequestComponent } from 'src/app/modals/request/request.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'platzinger';

  user: User;
  requests: any[] = [];
  mailsShown: any[] = [];


  constructor(public router: Router, private authenticationService: AuthenticationService, private userService: UserService, private requestService: RequestsService, private requestComponent: RequestComponent, private modalService: NgbModal) {

    this.authenticationService.getStatus().subscribe(status => {

      this.userService.getUserById(status.uid).valueChanges().subscribe((data: User) => {

        this.user = data;




        this.requestService.getRequestForEmail(this.user.email).valueChanges().subscribe((requests: any) => {

          this.requests = requests.filter((r) => {

            return r.status != 'accepted' && r.status != 'rejected';

          });

          //recorremos los email filtrados
          this.requests.map((r) => {


            if (this.mailsShown.indexOf(r.sender) == -1) {
              this.mailsShown.push(r.sender);

              //creamos el modal y le pasamos los parametros
              const modalSolicitudes = this.modalService.open(RequestComponent);
              modalSolicitudes.componentInstance.scope = this;
              modalSolicitudes.componentInstance.currentRequest = r;

            }

          });

        }, (error) => {

          console.log(error);

        });

      });


    });

  };
}
