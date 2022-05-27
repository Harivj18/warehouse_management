import { Component, OnInit } from '@angular/core';
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
  count1:any =0
  count2:any =0
  count3:any =0
  objectsup:any =[];
  objectcompany:any =[];
  objectpro:any =[];
  
  constructor(private api:ApiCallService) { }

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
      console.log(data);
      console.log('Data was fetching');
      this.alldata=data;
      this.alldata=this.alldata.docs;
      console.log(this.alldata);
      for(const i of this.alldata){
            console.log(i);
            this.object.push(i);
           if(this.object){
             this.count = this.count+1;
            console.log('Admin Total count:',this.count); 
           }    
            console.log('Fetched successfuly in add component');
      }
    },rej=>{
      console.log('Error',rej);      
    })
  }

  // FOR DASHBOARD SUPPLIER
  getsupplier(){
    this.show=!this.show;
    this.api.getsupplier().subscribe(data=>{
      console.log(data);
      console.log('Data was fetching');
      this.alldata=data;
      this.alldata=this.alldata.docs;
      for(const i in this.alldata){
            console.log(i);
            this.objectsup.push(i);
            console.log('Fetched successfuly in add component');
            if(this.objectsup){
              this.count1 = this.count1+1;
             console.log('Supplier Total count:',this.count1);            
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
      console.log(data);
      console.log('Data was fetching');
      this.alldata=data;
      this.alldata=this.alldata.docs;
      for(const i of this.alldata){
        // if(Object.prototype.hasOwnProperty.call(this.alldata,i)){
          // const elt = this.alldata[i];
          // console.log(elt.id);
          // this.api.getcompanyId(elt.id).subscribe(res=>{
          //   console.log(res);
            this.objectcompany.push(i);
            console.log('Fetched successfuly in add component');
            console.log(this.objectcompany);
            if(this.objectcompany){
              this.count3 = this.count3+1;
             console.log('Company Total count:',this.count3);             
            }
          
        // }
      }    
    },rej=>{
      console.log('Error',rej);      
    })
  }

  // FOR PRODUCT DASHBOARD
getproduct(){
    this.api.getproduct().subscribe(data=>{
      console.log(data);
      console.log('Data was fetching');
      this.alldata=data;
      this.alldata=this.alldata.docs;
      console.log(this.alldata);
      for(const i of this.alldata){
            console.log(i);
            this.objectpro.push(i);
            console.log('Fetched successfuly in add component');
            if(this.objectpro){
              this.count2 = this.count2+1;
             console.log('Product Total count:',this.count2);             
            }
        }
    },rej=>{
      console.log('Error',rej);    
    })
  }
}
