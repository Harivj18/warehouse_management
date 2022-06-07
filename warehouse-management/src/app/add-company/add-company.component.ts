import { Component, OnInit } from '@angular/core';
import { ApiCallService } from '../api-call.service';
import { FormGroup,FormBuilder,Validators, NgForm } from '@angular/forms';
import { ServiceapiService } from '../serviceapi.service';
import { ToastrService } from 'ngx-toastr';
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
  constructor(private formbuilder:FormBuilder,private api:ApiCallService,private serve:ServiceapiService,private toastr:ToastrService) { 
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
      this.toastr.success('Company Data successfully Registered!!');
      setTimeout(() => {
        location.reload();
      }, 10000);
      },rej=>{
        console.log('Error',rej);        
      });
    
  }
  // GETTING NO OF COMPANIES REGISTERED
  getcompany(){
    this.show=!this.show;
    this.api.getcompany().subscribe(data=>{
      console.log(data);
      this.alldata=data;
      this.alldata=this.alldata.data.docs;
      for(const i of this.alldata){
            this.object.push(i);
  }
  this.toastr.info('All Company Data`s Fetched Successfully.Please check Below!!');
},rej=>{
  console.log('Error',rej);      
})       
  }
  // FOR DELETING REGISTERED COMPANY
 delcompany(data:any,data1:any){
  this.api.removecompany(data._id,data1._rev).subscribe(_res=>{
    this.toastr.warning('Company Data was deleted successfully!!');
    setTimeout(() => {
      location.reload();
    }, 10000);
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
    this.api.changecompany(formvalue).subscribe(_res=>{
      this.toastr.success('Company Data successfully Updated!!');
      setTimeout(() => {
        location.reload();
      }, 10000);
    },rej=>{
      console.log('Error',rej);      
    })
    }

    // FOR VALIDATING EXISTENCE OF COMPANY ID
    companycheck(formvalue:any){
      this.api.getcompany().subscribe(data=>{
        console.log(data);
        this.alldata=data;
        this.alldata=this.alldata.data.docs;
        for(const i of this.alldata){
              this.objectcompany.push(i);
                if(i.company_id == formvalue.company_id){
                  this.check = 1;
                }
        }       
        setTimeout(()=>{
          if(this.check ==1){
            this.toastr.error('Company Id already exists!!');
            setTimeout(() => {
              location.reload();
            }, 10000);
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