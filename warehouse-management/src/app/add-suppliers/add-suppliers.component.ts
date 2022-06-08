import { Component, OnInit } from '@angular/core';
import { ApiCallService } from '../api-call.service';
import { FormGroup,FormBuilder,Validators, NgForm } from '@angular/forms';
import { ServiceapiService } from '../serviceapi.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-suppliers',
  templateUrl: './add-suppliers.component.html',
  styleUrls: ['./add-suppliers.component.css']
})
export class AddSuppliersComponent implements OnInit {
  value:boolean=true;
  object:any =[];
  info:any=[]
  search!:string;
  addsuppliers!:FormGroup;
  alldata:any;
  show:boolean=false;
  update:boolean=false;
  submit:boolean=true;
  check=0;
  objectsupplier:any=[];
  objcompany:any=[];
  idobj:any;

  constructor(private formbuilder:FormBuilder,private api:ApiCallService,public serve:ServiceapiService,private toastr:ToastrService) {
   }
  ngOnInit(): void {
    this.addsuppliers = this.formbuilder.group(
      {
        'company':['',Validators.required],
        'supplier':['',Validators.required],
        'supplierid':['',Validators.required],
        'aadhar':['',Validators.required],
        'email':[''],
        'contact':['',Validators.required],
        'state':['',Validators.required],
        'city':['',Validators.required],
        'particulars':[''],
        _id:[''],
        _rev:[''],
      }
    )
    this.companydrop();
  }

  // FOR SUPPLIER FORM
  add(Formvalue:any){
    this.show=!this.show;
    this.api.getcompany().subscribe(data=>{
      this.alldata=data;
      this.alldata=this.alldata.data.docs;
      for(const i of this.alldata){
        this.idobj = i;
        if(i.company == Formvalue.company){
          this.check=1;
          const obj ={
            company:Formvalue.company,
            supplier:Formvalue.supplier,
            supplierid:Formvalue.supplierid,
            aadhar:Formvalue.aadhar,
            email:Formvalue.email,
            contact:Formvalue.contact,
            manufacture:Formvalue.manufacture,
            state:Formvalue.state,
            city:Formvalue.city,
            particulars:this.idobj._id
          }
          this.api.addsupplier(obj).subscribe(data1=>{
            console.log(data1);
            this.toastr.success('Supplier Data successfully Registered!!');
            setTimeout(() => {
            location.reload();
            }, 10000);
            this.serve.store=[];
            },rej=>{
              console.log('Error',rej);        
            });
        }
      }
    },rej=>{
      console.log('Error',rej);      
    })
   }

  // FOR GETTING SUPPLIER
  getsupplier(){
    this.show=!this.show;
    this.api.getsupplier().subscribe(data=>{
      console.log(data);
      this.alldata=data;
      this.alldata=this.alldata.data.docs;
      for(const i of this.alldata){
        this.object.push(i);
      }
    this.toastr.info('Supplier Data`s Fetched Successfully.Please check Below!!');
    },rej=>{
      console.log('Error',rej);
    })
  }

  // FOR DELETING SUPPLIER
 delsupplier(data:any,data1:any){
  this.api.removesupplier(data._id,data1._rev).subscribe(_res=>{
    this.toastr.warning('Supplier Data was deleted successfully!!');
    setTimeout(() => {
      location.reload();
    }, 10000);
  },rej=>{
    console.log('Error',rej);
  })
   }

   // FOR EDITING SUPPLIER
   editsupplier(row:any){
    this.update= true;
    this.submit=false;
    this.addsuppliers.controls['company'].setValue(row.company);
    this.addsuppliers.controls['supplier'].setValue(row.supplier);
    this.addsuppliers.controls['supplierid'].setValue(row.supplierid);
    this.addsuppliers.controls['aadhar'].setValue(row.aadhar);
    this.addsuppliers.controls['email'].setValue(row.email);
    this.addsuppliers.controls['contact'].setValue(row.contact);
    this.addsuppliers.controls['state'].setValue(row.state);
    this.addsuppliers.controls['city'].setValue(row.city);
    this.addsuppliers.controls['_id'].setValue(row._id);
    this.addsuppliers.controls['_rev'].setValue(row._rev);
   }

// FOR UPDATING SUPPLIER
   updateForm(formvalue:NgForm){
    this.api.changesupplier(formvalue).subscribe(_res=>{
      this.toastr.success('Supplier Data successfully updated!!');
      setTimeout(() => {
        location.reload();
      }, 10000);
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

    suppliervalidation(formvalue:any){
      this.api.getsupplier().subscribe(data=>{
        this.alldata=data;
        this.alldata=this.alldata.data.docs;
        for(const i of this.alldata){
              this.objectsupplier.push(i);   
                if(i.supplierid == formvalue.supplierid){
                  this.check = 1;
                }
        }       
        setTimeout(()=>{
          if(this.check ==1){
            this.toastr.error('Supplier Id already exists!!');
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
