import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {

    frinedId: any;

  constructor(private activatedRoute: ActivatedRoute) {

    this.frinedId = this.activatedRoute.snapshot.params['uid'];

    console.log(this.frinedId);
    
   }

  ngOnInit(): void {
  }

}
