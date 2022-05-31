import { Injectable } from '@angular/core';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
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

