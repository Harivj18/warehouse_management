import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { ApiCallService } from '../api-call.service';
@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {
  contact!:FormGroup;
  constructor(private formbuilder:FormBuilder,private api:ApiCallService) { }

  ngOnInit(): void {
    this.contact = this.formbuilder.group({
      username:['',Validators.required],
      email:['',Validators.required],
      msg:['',Validators.required]
    })
  }
  mail(formvalue:any){
    this.api.contact(formvalue).subscribe(res=>{
      alert('Mail Sent Successfully!!!')
      console.log(res);      
    },rej=>{
      console.log('Error',rej);   
    })
  }
}
