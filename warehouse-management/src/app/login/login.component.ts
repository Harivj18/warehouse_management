import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators} from '@angular/forms';
import { ServiceapiService } from '../serviceapi.service';
import { ApiCallService } from '../api-call.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[ServiceapiService,ApiCallService]
})
export class LoginComponent implements OnInit {
  loginform!:FormGroup;
  value:boolean=true;
  object:any =[];
  search!:string;
  addsupplier!:FormGroup;
  alldata:any;
  check:any=0;
  store:any;
  constructor(private formbuilder:FormBuilder,public serve:ServiceapiService,private api:ApiCallService,private route:Router,private toastr:ToastrService) { }

  ngOnInit(): void {
  this.loginform=this.formbuilder.group(
    {
      'username':['',Validators.required],
      'password':['',Validators.required],
      _id:[''],
      _rev:['']
    }
  )
  }
  // FOR LOGGING INTO PAGE
  login(formvalue:any){
    this.api.getUser().subscribe(data=>{
      this.alldata=data;
      this.alldata=this.alldata.data.docs;
      for(const i of this.alldata){        
            this.object.push(i);
              if(i.username == formvalue.username && i.password == formvalue.password){
                this.check = 1;
                this.store = i;
              }
          }
             
      setTimeout(()=>{
        if(this.check ==1){
          localStorage.setItem('login',JSON.stringify(this.store));
          this.loginform.reset();
          this.serve.show = false;
          this.route.navigate(['menus']);
        }
        else{
          this.toastr.error('Invalid Credentials');
          this.route.navigate(['']);
          this.loginform.reset();
        }
      },1000)
    },rej=>{
      console.log('Error',rej);
    }
    )
  }  
}
