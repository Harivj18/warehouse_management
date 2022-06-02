import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ServiceapiService {
  credentials:any=[];
  validcheck:number=0;
  store:any=[];
  constructor(private http:HttpClient) { }
  show:any=true;
  logindata(formobject:any){
    return this.http.post('http://localhost:8000/getquery/',formobject);
  }

}

