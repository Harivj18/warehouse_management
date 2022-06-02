import { Component, OnInit } from '@angular/core';
import { ApiCallService } from '../api-call.service';
@Component({
  selector: 'app-viewproducts',
  templateUrl: './viewproducts.component.html',
  styleUrls: ['./viewproducts.component.css']
})
export class ViewproductsComponent implements OnInit {
  show:boolean=false;
  objproducts:any=[];
  search!:string;
  alldata:any;
  constructor(private api:ApiCallService) { }

  ngOnInit(): void {
    this.getproduct();
  }

  // FOR DISPLAYING PRODUCTS DASHBOARD
  getproduct(){
    this.show=!this.show;
    this.api.getproduct().subscribe(data=>{
      this.alldata=data;
      this.alldata=this.alldata.data.docs;
      for(const i of this.alldata){
        this.objproducts.push(i)
    }
},rej=>{
  console.log('Error',rej);      
})
  }
}
