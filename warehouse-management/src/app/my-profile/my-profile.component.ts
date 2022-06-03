import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  data:any;
  constructor() { 
    // This is intentional

  }

  ngOnInit(): void {
    // FOR GETTING LOGGED IN SESSION ID
    let object:any =localStorage.getItem('login') ;
    this.data = JSON.parse(object);
  }

}
