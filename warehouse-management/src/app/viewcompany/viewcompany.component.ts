import { Component, OnInit } from '@angular/core';
import { ApiCallService } from '../api-call.service';
@Component({
  selector: 'app-viewcompany',
  templateUrl: './viewcompany.component.html',
  styleUrls: ['./viewcompany.component.css']
})
export class ViewcompanyComponent implements OnInit {
  alldata:any;
  objcompany:any=[];
  search!:string;
  show:boolean=false;

  constructor(private api:ApiCallService) { }

  ngOnInit(): void {
    this.getcompany();
  }

  // FOR DISPLAYING COMPANY DASHBOARD
  getcompany(){
    this.show=!this.show;
    this.api.getcompany().subscribe(data=>{
      this.alldata=data;
      this.alldata=this.alldata.docs;
      for(const i of this.alldata){
            this.objcompany.push(i);
  }
  },rej=>{
  console.log('Error',rej);      
  }) 
  }
 
}
