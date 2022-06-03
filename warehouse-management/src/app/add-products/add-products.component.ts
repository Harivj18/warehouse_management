import { Component, OnInit } from '@angular/core';
import { ApiCallService } from '../api-call.service';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
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
  stock:any;
  price:any;
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
          this.addproduct.controls['product_id'].setValue(element.product_id);
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
            product_id:Formvalue.product_id,
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
      console.log(data);
      this.alldata=data;
      this.alldata=this.alldata.data.docs;
      for(const i of this.alldata){
        this.object.push(i)
    }    
    },rej=>{
  console.log('Error',rej);      
    })
  }

  // FOR DELETE PRODUCTS
 delproduct(data:any,data1:any){
  this.api.removeproduct(data._id,data1._rev).subscribe(_res=>{
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
   updateproduct(Formvalue:any){
    const obj ={
      company:Formvalue.company,
      category:Formvalue.category,
      product_id:Formvalue.product_id,
      brand:Formvalue.brand,
      quantity:Formvalue.quantity,
      price:Formvalue.price,
      total:Formvalue.price * Formvalue.quantity,
      manufacture:Formvalue.manufacture,
    }
  
    this.api.changeproduct(obj).subscribe(data1=>{
      console.log(data1);
      alert('Your Data was updated successfully')
      location.reload();
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
          if(i.product_id == formvalue.product_id)
           if(i.brand == formvalue.brand){
             if(i.company == formvalue.company){
                this.check=1;  
                 this.stock = i.quantity;
                 this.price = i.price;
                console.log('quantity',this.stock);
                console.log('Price',this.price);
             }
           }   
        }   
        setTimeout(()=>{
          if(this.check == 1){
            alert('Product Id and Product already exists!! PLease update those products');
            
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

