import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceapiService } from '../serviceapi.service';
@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {

  constructor(private serve:ServiceapiService,private route:Router) { }

  ngOnInit(): void {
    // This is intentional

  }

  // FOR LOGGING OUT FROM OUR PAGE
  logout(){
    this.serve.show =true;
    localStorage.removeItem('login');
    this.route.navigate(['..'])
  }
}
