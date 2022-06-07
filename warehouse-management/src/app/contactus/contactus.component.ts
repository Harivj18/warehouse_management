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
  constructor(private formbuilder:FormBuilder,private api:ApiCallService,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.contact = this.formbuilder.group({
      username:['',Validators.required],
      email:['',Validators.required],
      msg:['',Validators.required]
    })
  }

  // FOR SENDING MAIL
  mail(formvalue:any){
    this.api.contact(formvalue).subscribe(_res=>{
      this.toastr.success('Admin Data successfully Registered!!');
    },rej=>{
      console.log('Error',rej);   
    })
  }
}
