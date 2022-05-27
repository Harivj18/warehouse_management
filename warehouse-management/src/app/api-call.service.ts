import { Injectable } from '@angular/core';
import { HttpClient,HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiCallService {

  constructor(private http:HttpClient) { }

  admindata(formobject:any){
    return this.http.post('http://localhost:8000/postuser/',formobject);
  }
  
  adduser(formobject:any){
    return this.http.post('http://localhost:8000/addUser/',formobject);
  }

  getUser(){
    return this.http.get('http://localhost:8000/getUser/');
  }

  getUserId(id:any){
    return this.http.get(`http://localhost:8000/getUserId/${id}`);
  }

  remove(id:any,id1:any){
    return this.http.delete(`http://localhost:8000/delete/${id}/${id1}`);
  }

  changedata(value:any){
    return this.http.put('http://localhost:8000/putquery/',value);
  }

  addcompany(formobject:any){
    return this.http.post('http://localhost:8000/addcompany/',formobject)
  }

  getcompany(){
    return this.http.get('http://localhost:8000/getcompany/');
  }

  getcompanyId(id:any){
    return this.http.get(`http://localhost:8000/getcompanyId/${id}`);
  }

  removecompany(id:any,id1:any){
    return this.http.delete(`http://localhost:8000/delcompany/${id}/${id1}`)
  }

  changecompany(formobject:any){
    return this.http.put('http://localhost:8000/updatecompany/',formobject)
  }
   // product
   addproduct(formobject:any){
    return this.http.post('http://localhost:8000/addproduct/',formobject)
  }

  getproduct(){
    return this.http.get('http://localhost:8000/getproduct/');
  }

  removeproduct(id:any,id1:any){
    return this.http.delete(`http://localhost:8000/delproduct/${id}/${id1}`)
  }

  changeproduct(formobject:any){
    return this.http.put('http://localhost:8000/updateproduct/',formobject)
  }

    // supplier apis
    addsupplier(formobject:any){
      return this.http.post('http://localhost:8000/addsupplier/',formobject);
    }
  
    getsupplier(){
      return this.http.get('http://localhost:8000/getsupplier/');
    }
  
    getsupplierId(id:any){
      return this.http.get(`http://localhost:8000/getsupplierId/${id}`);
    }
  
    removesupplier(id:any,id1:any){
      return this.http.delete(`http://localhost:8000/delsupplier/${id}/${id1}`)
    }
  
    changesupplier(formobject:any){
      return this.http.put('http://localhost:8000/updatesupplier/',formobject)
    }
    
    contact(formobject:any){
      return this.http.post('http://localhost:8000/contact/',formobject)
    }

    // get product category
    getinfo(){
      console.log('calling caalling');    
      return this.http.get('http://localhost:8000/getinfo/')
    }
}
