import { Injectable } from '@angular/core';
import{ HttpClient } from '@angular/common/http';
import { IStudent } from './student';
import { Observable } from 'rxjs';
//mongodb+srv://phoenixpokemongo626:<password>@cluster0-v9v3c.mongodb.net/test?retryWrites=true
@Injectable(
//   {
//   providedIn: 'root'
// }
)
export class StudentlistService {

  private _url:string ="http://localhost:8080/api/students"

  constructor(private http:HttpClient) { }
  getStudents(): Observable<IStudent[]>{
    return this.http.get<IStudent[]>(this._url); 
  }
  getStudent(id:string): Observable<IStudent>{
    return this.http.get<IStudent>(this._url + "/" + id); 
  }
}


