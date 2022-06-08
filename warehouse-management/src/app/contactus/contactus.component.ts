import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { ApiCallService } from '../api-call.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {
  contact!:FormGroup;
  alldata:any;
  objcompany:any=[];
  info:any=[];
  data:any;
  constructor(private formbuilder:FormBuilder,private api:ApiCallService,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.contact = this.formbuilder.group({
      email:['',Validators.required],
      company:['',Validators.required],
      companyemail:['',Validators.required],
      msg:['',Validators.required],
    })
    this.companydrop();
    this.getcompany();
    let object:any =localStorage.getItem('login') ;
    this.data = JSON.parse(object);
    this.contact.controls['email'].setValue(this.data.email);

  }

  // FOR SENDING MAIL
  mail(formvalue:any){
    this.api.contact(formvalue).subscribe(data=>{
      console.log(data);
      this.toastr.success('Your response send to the company!!');
      setTimeout(() => {
        location.reload();
      },5000);
    },rej=>{
      console.log('Error',rej);   
    })
  }

   // GETTING NO OF COMPANIES REGISTERED
   getcompany(){
    this.api.getcompany().subscribe(data=>{
      console.log(data);
      this.alldata=data;
      this.alldata=this.alldata.data.docs;
      for(const i of this.alldata){
            this.info.push(i);
  }
  },rej=>{
  console.log('Error',rej);      
  })       
  }

    // FOR COMPANY DROPDOWN
    companydrop(){
      this.api.getcompany().subscribe(data=>{
        this.alldata=data;
        this.alldata=this.alldata.data.docs;
        for(const i of this.alldata){
          this.objcompany.push(i);
        }
      },rej=>{
        console.log('Error',rej);
      })
    }

    
  // FOR SELECTING AND SETTING VALUE ON COMPANY
  select(event:any){
    for (const key in this.info) {
      if (Object.prototype.hasOwnProperty.call(this.info, key)) {
        const element = this.info[key];
        const data = element.company;
        if (data == event.target.value) {
          this.contact.controls['companyemail'].setValue(element.email);
        }
      }     
    }  
  }


}
