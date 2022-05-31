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
  url: any;
  check:any=0;
  maxdate:any;
  idobj:any;
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
        particulars:[''],
        _id:[''],
        _rev:['']
      }    
    )
    this.companydrop();
    this.getproductinfo();
    this.futuredate();
  }
  
//  getting company info 
  getproductinfo(){
    this.api.getinfo().subscribe(data=>{
      this.alldata=data;
      this.alldata=this.alldata.docs;
      for(const i of this.alldata){
            this.info.push(i);
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
        var data = element.category;
        if (data == event.target.value) {
          this.addproduct.controls['product_id'].setValue(element.product_id);
        }
      }     
    }  
  }
 
  // FOR COMPANY DROPDOWN
  companydrop(){
    this.api.getcompany().subscribe(data=>{
      this.alldata=data;
      this.alldata=this.alldata.docs;
      for(const i of this.alldata){
        this.objcompany.push(i);
      }
    },rej=>{
      console.log('Error',rej);
    })
  }

 // FOR ADDING PRODUCTS
  add(Formvalue:any){
    this.show=!this.show;
    this.api.getcompany().subscribe(data=>{
      this.alldata=data;
      this.alldata=this.alldata.docs;
      for(const i of this.alldata){
        this.idobj = i;
        if(i.company == Formvalue.company){
          this.check=1;
          var obj ={
            company:Formvalue.company,
            category:Formvalue.category,
            product_id:Formvalue.product_id,
            brand:Formvalue.brand,
            quantity:Formvalue.quantity,
            price:Formvalue.price,
            manufacture:Formvalue.manufacture,
            particulars:this.idobj._id
          }
          
          this.api.addproduct(obj).subscribe(data=>{
            alert('Your Data added successfully')
            location.reload();
            },rej=>{
              console.log('Error',rej);        
            });
        }
      }
    },rej=>{
      console.log('Error',rej);      
    })
  }

//  FOR GETTING REGISTERED PRODUCTS
  getproduct(){
    this.show=!this.show;
    this.api.getproduct().subscribe(data=>{
      this.alldata=data;
      this.alldata=this.alldata.docs;
      for(const i of this.alldata){
        this.object.push(i)
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
    this.api.changeproduct(formvalue).subscribe(res=>{
     alert("Your data was updated successfully!");
     location.reload();
    },rej=>{
      console.log('Error',rej);
    })
    }

    futuredate(){
      var date = new Date();
      var currentdate:any = date.getDate();
      var currentmonth:any = date.getMonth() + 1;
      var currentyear:any = date.getFullYear();
      if (currentdate < 10){
        currentdate = "0" + currentdate;
      }
      if(currentmonth < 10){
        currentmonth = "0" + currentmonth;
      }
      this.maxdate = currentyear + "-" + currentmonth + "-" + currentdate;
      console.log(this.maxdate);
      
    }
}

