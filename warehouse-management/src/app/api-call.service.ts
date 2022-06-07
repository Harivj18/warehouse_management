import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiCallService {

  constructor(private http:HttpClient) { }
  // FOR SIGNUP
  admindata(formobject:any){
    return this.http.post('http://localhost:8000/Register/',formobject);
  }
  // FOR ADDING ADMIN
  adduser(formobject:any){
    return this.http.post('http://localhost:8000/addUser/',formobject);
  }
  // FOR FETCHING ADMIN
  getUser(){
    return this.http.get('http://localhost:8000/getUser/');
  }
  // FOR DELETING ADMIN 
  remove(id:any,id1:any){
    return this.http.delete(`http://localhost:8000/delete/${id}/${id1}`);
  }
  // FOR UPDATING DATA
  changedata(value:any){
    return this.http.put('http://localhost:8000/putquery/',value);
  }
  // FOR ADDING COMPANY
  addcompany(formobject:any){
    return this.http.post('http://localhost:8000/addcompany/',formobject)
  }
  // FOR FETCHING COMPANY
  getcompany(){
    return this.http.get('http://localhost:8000/getcompany/');
  }
  // FOR DELETING
  removecompany(id:any,id1:any){
    return this.http.delete(`http://localhost:8000/delcompany/${id}/${id1}`)
  }

  // FOR UPDATING COMPANY
  changecompany(formobject:any){
    return this.http.put('http://localhost:8000/updatecompany/',formobject)
  }
   // FOR ADDING PRODUCTS
   addproduct(formobject:any){
    return this.http.post('http://localhost:8000/addproduct/',formobject)
  }
   // FOR FETCHING PRODUCTS
  getproduct(){
    return this.http.get('http://localhost:8000/getproduct/');
  }
  // FOR DELETING PRODUCTS
  removeproduct(id:any,id1:any){
    return this.http.delete(`http://localhost:8000/delproduct/${id}/${id1}`)
  }
  // FOR UPDATING PRODUCTS
  changeproduct(formobject:any){
    return this.http.put('http://localhost:8000/updateproduct/',formobject)
  }

  // FOR ADDING SUPPLIERS
    addsupplier(formobject:any){
      return this.http.post('http://localhost:8000/addsupplier/',formobject);
    }

  // FOR FETCHING SUPPLIER
    getsupplier(){
      return this.http.get('http://localhost:8000/getsupplier/');
    }
    // FOR DELETING SUPPLIER
    removesupplier(id:any,id1:any){
      return this.http.delete(`http://localhost:8000/delsupplier/${id}/${id1}`)
    }
    // FOR UPDATING SUPPLIER
    changesupplier(formobject:any){
      return this.http.put('http://localhost:8000/updatesupplier/',formobject)
    }
    //FOR CONTACT FORM
    contact(formobject:any){
      return this.http.post('http://localhost:8000/contact/',formobject)
    }

    // FOR GETTING PRODUCT CATEGORY
    getinfo(){
      return this.http.get('http://localhost:8000/getinfo/')
    }

    // FOR GETTING ADMIN IN DASHBOARD
    getadmin(){
      return this.http.get('http://localhost:8000/getUser/');
  }

  //FOR ADDING CATEGORY
  addcategory(formobject:any){
    return this.http.post('http://localhost:8000/addcategory/',formobject);
  }

  //FOR GETTING CATEGORY FROM FORM
  getcategory(){
    return this.http.get('http://localhost:8000/getcategory/');
  }

  // FOR DELETING CATEGORY
  removecategory(id:any,id1:any){
    return this.http.delete(`http://localhost:8000/delcategory/${id}/${id1}`);
  }

  // FOR UPDATING CATEGORY
  changecategory(formobject:any){
    return this.http.put('http://localhost:8000/updatecategory/',formobject)
  }

}
