import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {RequestsService} from '../../services/requests.service';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {

  scope: any;
  shouldAdd: string = 'yes';
  currentRequest: any;

  constructor(public ngActiveModal: NgbActiveModal, private requestsService :RequestsService, private userService: UserService) { }

  ngOnInit(): void {
  }


  accept() {
    if (this.shouldAdd == 'yes') {
      this.requestsService.setRequestStatus(this.currentRequest, 'accepted').then((data) => {
        console.log(data);
        this.userService.addFriend(this.scope.user.uid, this.currentRequest.sender).then(() => {
          alert('Solicitud aceptada con exito');
        });
      }).catch((error) => {
        console.log(error);
      });
    } else if (this.shouldAdd == 'no') {
      this.requestsService.setRequestStatus(this.currentRequest, 'rejected').then((data) => {
        console.log(data);
      }).catch((error) => {
        console.log(error);
      });
    } else if (this.shouldAdd == 'later') {
      this.requestsService.setRequestStatus(this.currentRequest, 'decide_later').then((data) => {
        console.log(data);
      }).catch((error) => {
        console.log(error);
      });
    }
  }

}
