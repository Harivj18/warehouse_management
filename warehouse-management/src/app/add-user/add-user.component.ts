import { Component, OnInit } from '@angular/core';
import { ApiCallService } from '../api-call.service';
import { FormGroup,FormBuilder,Validators, NgForm } from '@angular/forms';
import { ServiceapiService } from '../serviceapi.service';
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
  msg=this.object.username;
  count:any = 0;
  check=0;
  objectuser:any=[];
  constructor(private formbuilder:FormBuilder,private api:ApiCallService,private serve:ServiceapiService) {
   }

  ngOnInit(): void {
    this.adduser = this.formbuilder.group(
      {
        'username':['',Validators.required],
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
        alert('Your Data added successfully')
        location.reload()
        },rej=>{
          console.log('Error',rej);        
        });
  }
//   // FOR GETTING USER
  getuser(){
    this.show=!this.show;
    this.api.getUser().subscribe(data=>{
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
  // FOR DELETING USER
 deluser(data:any,data1:any){
  this.api.remove(data._id,data1._rev).subscribe(res=>{
    location.reload();
    alert('Your data was Deleted from the database');
  },rej=>{
    console.log('Error',rej);    
  })     
   }
   // FOR EDITING USER
   edituser(row:any){
    this.adduser.controls['username'].setValue(row.username);
    this.adduser.controls['first_name'].setValue(row.first_name);
    this.adduser.controls['last_name'].setValue(row.last_name);
    this.adduser.controls['email'].setValue(row.email);
    this.adduser.controls['contact'].setValue(row.contact);
    this.adduser.controls['_id'].setValue(row._id);
    this.adduser.controls['_rev'].setValue(row._rev);
   }
   // UPDATING USER 
   updateForm(formvalue:NgForm){
    console.log(formvalue);
    this.api.changedata(formvalue).subscribe(res=>{
     alert("Your data was updated successfully!");
     location.reload()
    },rej=>{
      console.log('Error',rej);      
    })
    }  
    // FOR DB VALIDATION
    uservalidation(formvalue:any){
      this.api.getUser().subscribe(data=>{
        console.log(data);
        console.log('Data was fetching');
        this.alldata=data;
        this.alldata=this.alldata.rows;
        console.log(this.alldata);
        for(const i in this.alldata){
          if(Object.prototype.hasOwnProperty.call(this.alldata,i)){
            const elt = this.alldata[i];
            console.log(elt.id);
            this.api.getUserId(elt.id).subscribe(res=>{
              console.log(res);
              this.objectuser.push(res);
              console.log('Fetched successfuly in add component');
              for (const iterator of this.objectuser) {
                if(iterator.username == formvalue.username){
                  console.log('hello',iterator.username);
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
            alert('Username exists');
            location.reload();
            console.log('hello menu');          
          }
          else{
        this.addform(formvalue)
          }
        },1000)
      },rej=>{
        console.log('Error',rej);
      }
      )
    }
   }
 


