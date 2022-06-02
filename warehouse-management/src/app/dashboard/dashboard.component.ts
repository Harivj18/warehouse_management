import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCallService } from '../api-call.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  value:boolean=true;
  object:any =[];
  search!:string;
  alldata:any;
  show:boolean=false;
  msg=this.object.username;
  count:any = 0;
  count1:any = 0;
  count2:any = 0;
  count3:any = 0;
  objectsup:any =[];
  objectcompany:any =[];
  objectpro:any =[];
  
  constructor(private api:ApiCallService,private router:Router) { }

  ngOnInit(): void {
    this.getuser();
    this.getsupplier();
    this.getproduct();
    this.getcompany();
  }

  // FOR DASHBOARD ADMIN USER
  getuser(){
    this.show=!this.show;
    this.api.getUser().subscribe(data=>{
      this.alldata=data;
      this.alldata=this.alldata.data.docs;
      for(const i of this.alldata){
            this.object.push(i);
           if(this.object){
             this.count = this.count+1;
           }    
      }
    },rej=>{
      console.log('Error',rej);      
    })
  }

  // FOR DASHBOARD SUPPLIER
  getsupplier(){
    this.show=!this.show;
    this.api.getsupplier().subscribe(data=>{
      this.alldata=data;
      this.alldata=this.alldata.data.docs;
      for(const i in this.alldata){
            this.objectsup.push(i);
            if(this.objectsup){
              this.count1 = this.count1+1;
            }
      }    
    },rej=>{
      console.log('Error',rej);      
    })
  }

  // FOR COMPANY DASHBOARD
  getcompany(){
    this.show=!this.show;
    this.api.getcompany().subscribe(data=>{
      this.alldata=data;
      this.alldata=this.alldata.data.docs;
      for(const i of this.alldata){
            this.objectcompany.push(i);
            if(this.objectcompany){
              this.count3 = this.count3+1;
            }
      }    
    },rej=>{
      console.log('Error',rej);      
    })
  }

  // FOR PRODUCT DASHBOARD
getproduct(){
    this.api.getproduct().subscribe(data=>{
      this.alldata=data;
      this.alldata=this.alldata.data.docs;
      for(const i of this.alldata){
            this.objectpro.push(i);
            if(this.objectpro){
              this.count2 = this.count2+1;
            }
        }
    },rej=>{
      console.log('Error',rej);    
    })
  }

  // FOR NAVIGATING TO ADMIN DASHBOARD
  admin(){
    this.router.navigate(['/menus/viewadmin'])
  }

  // FOR NAVIGATING TO COMPANY DASHBOARD
  company(){
    this.router.navigate(['/menus/viewcompany'])
  }

  // FOR NAVIGATING TO PRODUCTS DASHBOARD
  products(){
    this.router.navigate(['/menus/viewproducts'])
  }
  
  // FOR NAVIGATING TO SUPPLIERS DASHBOARD
  suppliers(){
    this.router.navigate(['/menus/viewsuppliers'])
  }
}
