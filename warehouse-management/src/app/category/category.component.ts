import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators,FormBuilder,NgForm} from '@angular/forms';
import { ApiCallService } from '../api-call.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  value:boolean=true;
  object:any =[];
  search!:string;
  category!:FormGroup;
  alldata:any;
  show:boolean=false;
  message='hello';
  check=0;
  objectcategory:any=[];
  constructor(private formbuilder:FormBuilder,private api:ApiCallService,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.category = this.formbuilder.group(
      {
        'category':['',Validators.required],
        'productid':['',Validators.required],
        _id:[''],
        _rev:['']
      }
    )
  }
  
    // FOR ADDING COMPANY
    add(Formvalue:any){
      this.api.addcategory(Formvalue).subscribe(data=>{
        console.log(data);
        this.toastr.success('Category successfully added!!');
        setTimeout(() => {
          location.reload();
        }, 10000);
        },rej=>{
          console.log('Error',rej);        
        });
    }

    //FOR GETTING CATEGORY DATA
    getcategory(){
      this.show=!this.show;
      this.api.getcategory().subscribe(data1=>{
        console.log(data1);
        this.alldata=data1;
        this.alldata=this.alldata.data.docs;
        for(const i of this.alldata){
              this.object.push(i);
    }
    this.toastr.info('All Categories for products fetched successfully.Please check Below!!');
  },rej=>{
    console.log('Error',rej);      
  })       
    }
    // FOR DELETING CATEGORY DATA
   delcategory(data:any,data1:any){
    this.api.removecategory(data._id,data1._rev).subscribe(_res=>{
      this.toastr.warning('Category Data was deleted successfully!!');
      setTimeout(() => {
        location.reload();
      }, 10000);
    },rej=>{
      console.log('Error',rej);    
    })     
     }
  
     // FOR EDITING FIELDS
     editcategory(row:any){
      this.category.controls['category'].setValue(row.category);
      this.category.controls['productid'].setValue(row.productid);
     }
  
    // UPDATING REGISTERED CATEGORY
     updatecategory(formvalue:NgForm){
      this.api.changecategory(formvalue).subscribe(_res=>{
        this.toastr.success('Category Data successfully Updated!!');
        setTimeout(() => {
          location.reload();
        }, 10000);
      },rej=>{
        console.log('Error',rej);      
      })
      }
  
      // FOR VALIDATING EXISTENCE OF CATEGORY ID
      categorycheck(formvalue:any){
        this.api.getcategory().subscribe(data=>{
          console.log(data);
          this.alldata=data;
          this.alldata=this.alldata.data.docs;
          for(const i of this.alldata){
                this.objectcategory.push(i);
                  if(i.category == formvalue.category){
                    this.check = 1;
                  }
          }       
          setTimeout(()=>{
            if(this.check ==1){
              this.toastr.error('Category already exists!!');
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
