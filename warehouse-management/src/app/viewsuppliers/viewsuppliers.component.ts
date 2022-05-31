import { Component, OnInit } from '@angular/core';
import { ApiCallService } from '../api-call.service';
@Component({
  selector: 'app-viewsuppliers',
  templateUrl: './viewsuppliers.component.html',
  styleUrls: ['./viewsuppliers.component.css']
})
export class ViewsuppliersComponent implements OnInit {
  show:boolean=false;
  objsuppliers:any=[];
  search!:string;
  alldata:any;
  constructor(private api:ApiCallService) { }

  ngOnInit(): void {
    this.getsupplier();
  }
 
  // FOR DISPLAYING SUPPLIER DASHBOARD
  getsupplier(){
    this.show=!this.show;
    this.api.getsupplier().subscribe(data=>{
      this.alldata=data;
      this.alldata=this.alldata.docs;
      for(const i of this.alldata){
        this.objsuppliers.push(i);
      }
    },rej=>{
      console.log('Error',rej);
    })
  }
}
