import { Component, Input, OnInit } from '@angular/core';
import { ApiCallService } from '../api-call.service';
import { FormGroup,FormBuilder,Validators, NgForm } from '@angular/forms';
import { ServiceapiService } from '../serviceapi.service';
@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent implements OnInit {
  value:boolean=true;
  object:any =[];
  search!:string;
  addcompany!:FormGroup;
  alldata:any;
  show:boolean=false;
  message='hello';
  check=0;
  objectcompany:any=[];
  constructor(private formbuilder:FormBuilder,private api:ApiCallService,private serve:ServiceapiService) { 
   }

  ngOnInit(): void {
    this.addcompany = this.formbuilder.group(
      {
        'company':['',Validators.required],
        'company_id':['',Validators.required],
        'email':['',Validators.required],
        'website':['',Validators.required],
        'location':['',Validators.required],
        _id:[''],
        _rev:['']
      }
    )
  }
  // FOR ADDING COMPANY
  add(Formvalue:any){
    this.api.addcompany(Formvalue).subscribe(data=>{
      console.log(data);
      alert('Your Data added successfully')
      location.reload()
      },rej=>{
        console.log('Error',rej);        
      });
    
  }
  // GETTING NO OF COMPANIES REGISTERED
  getcompany(){
    this.show=!this.show;
    this.api.getcompany().subscribe(data=>{
      console.log(data);
      console.log('Data was fetching');
      this.alldata=data;
      this.alldata=this.alldata.docs;
      console.log(this.alldata);
      for(const i of this.alldata){
            this.object.push(i);
            console.log(i);
  }
},rej=>{
  console.log('Error',rej);      
})       
  }
  // FOR DELETING REGISTERED COMPANY
 delcompany(data:any,data1:any){
  this.api.removecompany(data._id,data1._rev).subscribe(res=>{
    location.reload();
    alert('Your data was Deleted from the database');
  },rej=>{
    console.log('Error',rej);    
  })     
   }

   // FOR EDITING FIELDS
   editcompany(row:any){
    this.addcompany.controls['company'].setValue(row.company);
    this.addcompany.controls['company_id'].setValue(row.company_id);
    this.addcompany.controls['email'].setValue(row.email);
    this.addcompany.controls['website'].setValue(row.website);
    this.addcompany.controls['location'].setValue(row.location);
    this.addcompany.controls['_id'].setValue(row._id);
    this.addcompany.controls['_rev'].setValue(row._rev);
   }

  // UPDATING REGISTERED COMPANY
   updatecompany(formvalue:NgForm){
    console.log(formvalue);
    this.api.changecompany(formvalue).subscribe(res=>{
     alert("Your data was updated successfully!");
     location.reload();
    },rej=>{
      console.log('Error',rej);      
    })
    }
    companycheck(formvalue:any){
      this.api.getcompany().subscribe(data=>{
        console.log(data);
        console.log('Data was fetching');
        this.alldata=data;
        this.alldata=this.alldata.rows;
        console.log(this.alldata);
        for(const i in this.alldata){
          if(Object.prototype.hasOwnProperty.call(this.alldata,i)){
            const elt = this.alldata[i];
            console.log(elt.id);
            this.api.getcompanyId(elt.id).subscribe(res=>{
              console.log(res);
              this.objectcompany.push(res);
              console.log('Fetched successfuly in add component');
              for (const iterator of this.objectcompany) {
                if(iterator.company_id == formvalue.company_id){
                  console.log('hello',iterator.company_id);
                  this.check = 1;
                }
              }            
              console.log(this.check);
            },rej=>{
              console.log('Error',rej);
            })
          }
        }       
        setTimeout(()=>{
          if(this.check ==1){
            console.log('getting');        
            alert('Company Id already exists');
            location.reload();
            console.log('hello menu');          
          }
          else{
        this.add(formvalue)
          }
        },1000)
      },rej=>{
        console.log('Error',rej);
      }
      )
    }  
    }