import { Injectable } from '@angular/core';
import{ HttpClient, HttpHeaders } from '@angular/common/http';
import { IStudent } from './student';
import { Observable } from 'rxjs';
//mongodb+srv://phoenixpokemongo626:<password>@cluster0-v9v3c.mongodb.net/test?retryWrites=true
@Injectable(
//   {
//   providedIn: 'root'
// }
)
export class StudentlistService {

  private _url:string ="https://quiet-badlands-65457.herokuapp.com/api/students"

   httpOptions={
     headers: new HttpHeaders({'Content-Type': 'application/json'})
   };

  constructor(private http:HttpClient) { }
  getStudents(): Observable<IStudent[]>{
    return this.http.get<IStudent[]>(this._url); 
  }
  getStudent(id:string): Observable<IStudent[]>{
    return this.http.get<IStudent[]>(this._url + "/" + id); 
  }

  get1Student(id:string): Observable<IStudent>{
    return this.http.get<IStudent>(this._url + "/" + id); 
  }

  saveStudent(istudent:IStudent, id:string): Observable<IStudent>{
    return this.http.put<IStudent>(this._url + "/" + id, istudent, this.httpOptions); 
  }

  // storeServers(istudent:IStudent, id:string){
    
  //   return this.http.put(this._url + "/" + id,
  //   istudent, this.httpOptions); 
  // }


}


