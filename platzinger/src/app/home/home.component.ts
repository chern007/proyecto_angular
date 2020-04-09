import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { 

    let a: any[];
    let b: number = 2;
    let c : boolean;
    let d : string = 'caspita';


    c= true;

    a =[b,c,c,d];

    console.log(a);

  }

  ngOnInit(): void {
  }

}
