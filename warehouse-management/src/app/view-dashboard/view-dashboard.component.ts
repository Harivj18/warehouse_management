import { Component, OnInit } from '@angular/core';
import { ApiCallService } from '../api-call.service';

@Component({
  selector: 'app-view-dashboard',
  templateUrl: './view-dashboard.component.html',
  styleUrls: ['./view-dashboard.component.css']
})
export class ViewDashboardComponent implements OnInit {
  object:any=[];
  show:boolean=false;
  show3:boolean=false;
  search!:string;
  alldata:any;
  objsuppliers:any=[];
  constructor(private api:ApiCallService) { }

  ngOnInit(): void {
    this.getadmin();
  }
  // FOR DISPLAYING ADMIN DASHBOARD
  getadmin(){
    this.show=!this.show;
    this.api.getUser().subscribe(data=>{
      this.alldata=data;
      this.alldata=this.alldata.data.docs;
      for(const i of this.alldata){
            this.object.push(i);
      }   
    },rej=>{
      console.log('Error',rej);      
    })
  }
}
