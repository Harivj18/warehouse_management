import { Component, OnInit } from '@angular/core';
import { ApiCallService } from '../api-call.service';
import { FormGroup,FormBuilder,Validators, NgForm } from '@angular/forms';
import { ServiceapiService } from '../serviceapi.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  value:boolean=true;
  object:any =[];
  search!:string;
  adduser!:FormGroup;
  alldata:any;
  show:boolean=false;
  update:boolean=false;
  submit:boolean=true;
  msg=this.object.user_name;
  count:any = 0;
  check=0;
  objectuser:any=[];
  constructor(private formbuilder:FormBuilder,private api:ApiCallService,private serve:ServiceapiService,private toastr:ToastrService) {
   }

  ngOnInit(): void {
    this.adduser = this.formbuilder.group(
      {
        'user_name':['',Validators.required],
        'first_name':['',Validators.required],
        'last_name':['',Validators.required],
        'email':['',Validators.required],
        'contact':['',Validators.required],
        'password':['',Validators.required],
        'confirm_password':['',Validators.required],
        _id:[''],
        _rev:[''],
      }
    )
  }

  // FOR ADMIN FORM
  addform(Formvalue:any){
      this.api.adduser(Formvalue).subscribe(data=>{
        console.log(data);
        this.toastr.success('Admin Data successfully Registered!!');
            setTimeout(() => {
            location.reload();
            }, 10000);
        },rej=>{
          console.log('Error',rej);        
        });
  }

  // FOR GETTING USER
  getuser(){
    this.show=!this.show;
    this.api.getUser().subscribe(data=>{
      console.log(data);
      this.alldata=data;
      this.alldata=this.alldata.data.docs;
      for(const i of this.alldata){
            this.object.push(i);
      }   
    this.toastr.info('Admin Data`s Fetched Successfully.Please check Below!!');

    },rej=>{
      console.log('Error',rej);      
    })
  }

  // FOR DELETING USER
 deluser(data:any,data1:any){
  this.api.remove(data._id,data1._rev).subscribe(res=>{
    console.log(res);
    this.toastr.warning('Admin Data was deleted successfully!!');
    setTimeout(() => {
      location.reload();
    }, 10000);
  },rej=>{
    console.log('Error',rej);    
  })     
}

   // FOR EDITING USER
   edituser(row:any){
    this.update= true;
    this.submit= false;
    this.adduser.controls['user_name'].setValue(row.user_name);
    this.adduser.controls['first_name'].setValue(row.first_name);
    this.adduser.controls['last_name'].setValue(row.last_name);
    this.adduser.controls['email'].setValue(row.email);
    this.adduser.controls['contact'].setValue(row.contact);
    this.adduser.controls['_id'].setValue(row._id);
    this.adduser.controls['_rev'].setValue(row._rev);
   }

   // UPDATING USER 
   updateForm(formvalue:NgForm){
    this.api.changedata(formvalue).subscribe(res=>{
      console.log(res);
      this.toastr.success('Admin Data successfully updated!!');
      setTimeout(() => {
        location.reload();
      }, 10000);
    },rej=>{
      console.log('Error',rej);      
    })
    }  

    // FOR DB VALIDATION
    uservalidation(formvalue:any){
      this.api.getUser().subscribe(data=>{
        console.log(data);
        this.alldata=data;
        this.alldata=this.alldata.data.docs;
        for(const i of this.alldata){
              this.objectuser.push(i);
                if(i.user_name == formvalue.user_name){
                  this.check = 1;
                }
                else if(formvalue.password != formvalue.confirm_password){
                  this.check = 2;
                }
        }       
        setTimeout(()=>{
          if(this.check == 1){
            this.toastr.error('Username already exists!!');
            setTimeout(() => {
            location.reload();
            }, 10000);
          }
          else if(this.check == 2){
            this.toastr.error('Password does not match!!');
            setTimeout(() => {
            location.reload();
            }, 10000);
          }
          else{
              this.addform(formvalue);
          }
        },1000)
      },rej=>{
        console.log('Error',rej);
      }
      )
    }
   }
 


