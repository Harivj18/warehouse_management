import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators} from '@angular/forms';
import { ApiCallService } from '../api-call.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  value:boolean=true;
  object = [];
  signup!:FormGroup;
  constructor(private formbuilder:FormBuilder,private api:ApiCallService) {
   }

  ngOnInit(): void {
    this.signup = this.formbuilder.group(
      {
        'username':['',Validators.required],
        'first_name':['',Validators.required],
        'last_name':['',Validators.required],
        'email':['',Validators.required],
        'password':['',Validators.required],
        'confirm_password':['',Validators.required],
      }
    )
  }

  // FOR SIGNUP ADMIN
  storeform(Formvalue:any){
    this.api.admindata(Formvalue).subscribe(data=>{
      console.log(data);
      alert('Your Data added successfully');
      location.reload();
    },rej=>{
      console.log('Error',rej);        
    });
  }
 
}

