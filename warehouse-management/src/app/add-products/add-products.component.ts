import { Component, OnInit } from '@angular/core';
import { ApiCallService } from '../api-call.service';
import { FormGroup,FormBuilder,Validators, NgForm } from '@angular/forms';
@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent implements OnInit {
  value:boolean=true;
  object:any =[];
  search!:string;
  addproduct!:FormGroup;
  alldata:any;
  show:boolean=false;
  objcompany:any=[];
  info:any=[];
  supplier:any=[]
  url: any;
  
  constructor(private formbuilder:FormBuilder,private api:ApiCallService) {
   }

  ngOnInit(): void {
    this.addproduct = this.formbuilder.group(
      {
        'company':['',Validators.required],
        'category':['',Validators.required],
        'product_id':['',Validators.required],
        'brand':['',Validators.required],
        'quantity':['',Validators.required],
        'price':['',Validators.required],
        'manufacture':['',Validators.required],
        _id:[''],
        _rev:['']
      }    
    )
    this.companydrop();
    this.getproductinfo();
    this.getsupplier();
  }
//  getting company info 
  getproductinfo(){
    this.api.getinfo().subscribe(data=>{
      console.log(data);
      console.log('Data was fetching from info');
      this.alldata=data;
      console.log(this.alldata);     
      this.alldata=this.alldata.docs;
      console.log(this.alldata);
      for(const i of this.alldata){
            console.log(i);
            this.info.push(i);
            console.log('Fetched successfuly from info');
      }
    },rej=>{
      console.log('Error',rej);      
    })
  }

  // FOR SELECTING AND SETTING VALUE ON PRODUCT ID FIELD 
  select(event:any){
    for (const key in this.info) {
      if (Object.prototype.hasOwnProperty.call(this.info, key)) {
        const element = this.info[key];
        console.log('okiees',element);
        var data = element.category;
        console.log(data);
        if (data == event.target.value) {
          console.log('hello');
          this.addproduct.controls['product_id'].setValue(element.product_id);
        }
      }     
    }  
  }
 
  // FOR COMPANY DROPDOWN
  companydrop(){
    this.api.getcompany().subscribe(data=>{
      console.log(data);
      console.log('Data was fetching');
      this.alldata=data;
      this.alldata=this.alldata.docs;
      console.log(this.alldata);
      for(const i of this.alldata){
        this.objcompany.push(i);
        console.log('hmm',this.objcompany);
      }
    },rej=>{
      console.log('Error',rej);
    })
  }

  // FOR FETCHING RELATION OF REGISTERED SUPPLIER
  getsupplier(){
    this.api.getsupplier().subscribe(data=>{
      console.log(data);
      console.log('Data was fetching');
      this.alldata=data;
      this.alldata=this.alldata.rows;
      console.log(this.alldata);
      for(const i in this.alldata){
        if(Object.prototype.hasOwnProperty.call(this.alldata,i)){
          const elt = this.alldata[i];
          console.log(elt.id);
          this.api.getsupplierId(elt.id).subscribe(res=>{
            console.log(res);
            this.supplier.push(res);
            console.log('######################');          
          },rej=>{
            console.log('Error',rej);            
          })
        }
      }    
    },rej=>{
      console.log('Error',rej);      
    })
  }
  // FOR SELECTING SUPPLIER VALUE AND SET ON SUPPLIER ID FIELD $RELATION
  change(event:any){
    for (const key in this.supplier) {
      if (Object.prototype.hasOwnProperty.call(this.supplier, key)) {
        const element = this.supplier[key];
        console.log('okiees',element);
        var data = element.supplier;
        console.log(data);
        if (data == event.target.value) {
          console.log('hello');
          this.addproduct.controls['supplier_id'].setValue(element.supplier_id);
        }
      }     
    }  
  }
 // FOR ADDING PRODUCTS
  add(Formvalue:any){
    console.log(Formvalue);    
    this.api.addproduct(Formvalue).subscribe(data=>{
      console.log(data);
      alert('Your Data added successfully')
      location.reload();
      },rej=>{
        console.log('Error',rej);        
      });
  }
//  FOR GETTING REGISTERED PRODUCTS
  getproduct(){
    this.show=!this.show;
    this.api.getproduct().subscribe(data=>{
      console.log(data);
      console.log('Data was fetching');
      this.alldata=data;
      this.alldata=this.alldata.docs;
      console.log(this.alldata);
      for(const i of this.alldata){
        this.object.push(i)
        console.log(i);
        
    }
},rej=>{
  console.log('Error',rej);      
})
  }

  // FOR DELETE PRODUCTS
 delproduct(data:any,data1:any){
  this.api.removeproduct(data._id,data1._rev).subscribe(res=>{
    location.reload();
    alert('Your data was Deleted from the database');
  },rej=>{
    console.log('Error',rej);    
  })     
   }

  //  FOR SETTING VALUE ON FIELD
   editproduct(row:any){
    this.addproduct.controls['company'].setValue(row.company);
    this.addproduct.controls['category'].setValue(row.category);
    this.addproduct.controls['product_id'].setValue(row.product_id);
    this.addproduct.controls['brand'].setValue(row.brand);
    this.addproduct.controls['quantity'].setValue(row.quantity);
    this.addproduct.controls['price'].setValue(row.price);
    this.addproduct.controls['manufacture'].setValue(row.manufacture);
    this.addproduct.controls['_id'].setValue(row._id);
    this.addproduct.controls['_rev'].setValue(row._rev);
   }

// FOR UPDATING PRODUCTS
   updateproduct(formvalue:NgForm){
    console.log(formvalue);
    this.api.changeproduct(formvalue).subscribe(res=>{
     alert("Your data was updated successfully!");
     location.reload();
    },rej=>{
      console.log('Error',rej);
    })
    }
}

