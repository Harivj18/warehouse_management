import { Component, OnInit } from '@angular/core';
import { ApiCallService } from '../api-call.service';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

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
  update:boolean=false;
  submit:boolean=true;
  objcompany:any=[];
  info:any=[];
  url: any;
  check:any=0;
  maxdate:any;
  idobj:any;
  stock:any;
  price:any;
  constructor(private formbuilder:FormBuilder,private api:ApiCallService,private toastr:ToastrService) {
   }

  ngOnInit(): void {
    this.addproduct = this.formbuilder.group(
      {
        'company':['',Validators.required],
        'category':['',Validators.required],
        'productid':['',Validators.required],
        'brand':['',Validators.required],
        'quantity':['',Validators.required],
        'price':['',Validators.required],
        'total':[''],
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
      this.alldata=this.alldata.data.docs;
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
        const data = element.category;
        if (data == event.target.value) {
          this.addproduct.controls['productid'].setValue(element.productid);
        }
      }     
    }  
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

 // FOR ADDING PRODUCTS
  add(Formvalue:any){
    this.show=!this.show;
    this.api.getcompany().subscribe(data=>{
      console.log(data);
      this.alldata=data;
      this.alldata=this.alldata.data.docs;
      for(const i of this.alldata){
        this.idobj = i;
        if(i.company == Formvalue.company){
          this.check=1;
          const obj ={
            company:Formvalue.company,
            category:Formvalue.category,
            productid:Formvalue.productid,
            brand:Formvalue.brand,
            quantity:Formvalue.quantity,
            price:Formvalue.price,
            total:Formvalue.price * Formvalue.quantity,
            manufacture:Formvalue.manufacture,
            particulars:this.idobj._id
          }
            console.log('total:',Formvalue.price * Formvalue.quantity,);
        
          this.api.addproduct(obj).subscribe(data1=>{
            console.log(data1);
            this.toastr.success('Your Product added successfully')
            setTimeout(() => {
              location.reload();
            },5000);
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
      console.log(data);
      this.alldata=data;
      this.alldata=this.alldata.data.docs;
      for(const i of this.alldata){
        this.object.push(i)
    }    
    this.toastr.info('All Product Data`s Fetched Successfully.Please check Below!!');
    },rej=>{
  console.log('Error',rej);      
    })
  }

  // FOR DELETE PRODUCTS
 delproduct(data:any,data1:any){
  this.api.removeproduct(data._id,data1._rev).subscribe(_res=>{
    this.toastr.warning('Product Data was deleted successfully!!');
    setTimeout(() => {
      location.reload();
    },5000);
  },rej=>{
    console.log('Error',rej);    
  })     
   }

  //  FOR SETTING VALUE ON FIELD
   editproduct(row:any){
     this.update= true;
     this.submit=false;
    this.addproduct.controls['company'].setValue(row.company);
    this.addproduct.controls['category'].setValue(row.category);
    this.addproduct.controls['productid'].setValue(row.productid);
    this.addproduct.controls['brand'].setValue(row.brand);
    this.addproduct.controls['quantity'].setValue(row.quantity);
    this.addproduct.controls['price'].setValue(row.price);
    this.addproduct.controls['manufacture'].setValue(row.manufacture);
    this.addproduct.controls['_id'].setValue(row._id);
    this.addproduct.controls['_rev'].setValue(row._rev);
   }
   

// FOR UPDATING PRODUCTS
   updateproduct(Formvalue:any){
    const obj ={
      company:Formvalue.company,
      category:Formvalue.category,
      productid:Formvalue.productid,
      brand:Formvalue.brand,
      quantity:Formvalue.quantity,
      price:Formvalue.price,
      total:Formvalue.price * Formvalue.quantity,
      manufacture:Formvalue.manufacture,
      _id:Formvalue._id,
      _rev:Formvalue._rev
    }
  
    this.api.changeproduct(obj).subscribe(data1=>{
      console.log(data1);
      this.toastr.success('Product Data successfully Updated!!');
      setTimeout(() => {
        location.reload();
      },5000);
      },rej=>{
        console.log('Error',rej);        
      });
  }
    
    // FOR CALENDAR VALIDATION
    futuredate(){
      const date = new Date();
      let currentdate:any = date.getDate();
      let currentmonth:any = date.getMonth() + 1;
      const currentyear:any = date.getFullYear();
      if (currentdate < 10){
        currentdate = "0" + currentdate;
      }
      if(currentmonth < 10){
        currentmonth = "0" + currentmonth;
      }
      this.maxdate = currentyear + "-" + currentmonth + "-" + currentdate;
    }
    // FOR PRODUCT VALIDATION
    productvalidation(formvalue:any){
      this.api.getproduct().subscribe(data=>{
        this.alldata=data;
        this.alldata=this.alldata.data.docs;
        for(const i of this.alldata){
          this.object.push(i)
          if(i.productid == formvalue.productid)
           if(i.brand == formvalue.brand){
             if(i.company == formvalue.company){
                this.check=1;  
                 this.stock = i.quantity;
                 this.price = i.price;
             }
           }   
        }   
        setTimeout(()=>{
          if(this.check == 1){
            this.toastr.error('Product Id and Product already exists!! Please update those products');
            setTimeout(() => {
              location.reload();
            },5000);
            let quantity = parseInt(this.stock) + parseInt(formvalue.quantity);
            let cost = parseInt(this.price) + parseInt(formvalue.price)
            console.log('total quantity',quantity);
            console.log('total cost',cost);
          }
          else{
            this.add(formvalue)
          }
        }) 
      },rej=>{
    console.log('Error',rej);      
      })
    }
}

