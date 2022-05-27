import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators, NgForm } from '@angular/forms';
import { ServiceapiService } from '../serviceapi.service';
import { ApiCallService } from '../api-call.service';
import { Router } from '@angular/router';


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
  constructor(private formbuilder:FormBuilder,public serve:ServiceapiService,private api:ApiCallService,private route:Router) { }

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

  login(formvalue:any){
    this.api.getUser().subscribe(data=>{
      console.log('hello fetched');
      
      console.log(data);
      console.log('Data was fetching');
      this.alldata=data;
      this.alldata=this.alldata.docs;
      console.log(this.alldata);
      for(const i of this.alldata){
        console.log(i);
        
            this.object.push(i);
            console.log('Fetched successfuly in add component');
            console.log('iterate',i);
              if(i.username == formvalue.username && i.password == formvalue.password){
                console.log('hello',i.username);
                this.check = 1;
                this.store = i;
              }
            // for ( of this.object) {
            //   console.log('inside for',iterator.username);
            //   if(iterator.username == formvalue.username && i.password == formvalue.password){
            //     console.log('hello',i.username);
            //     this.check = 1;
            //     this.store = i;
            //   }
            // }            
            console.log(this.check);
          }
             
      setTimeout(()=>{
        if(this.check ==1){
          console.log('getting');
          localStorage.setItem('login',JSON.stringify(this.store));
          this.loginform.reset();
          this.serve.show = false;
          this.route.navigate(['menus']);
          console.log('hello menu');          
        }
        else{
          alert('Invalid Credentials');
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
