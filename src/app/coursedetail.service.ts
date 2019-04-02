import { Injectable } from '@angular/core';
import{ HttpClient,HttpHeaders } from '@angular/common/http';
import { ICourse } from './course';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CoursedetailService {


  private _url:string ="https://quiet-badlands-65457.herokuapp.com/api/courses"

  httpOptions={
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  constructor(private http:HttpClient) { }
  getCourses(): Observable<ICourse[]>{
    return this.http.get<ICourse[]>(this._url); 
  }
  getCourse(id:string): Observable<ICourse>{
    return this.http.get<ICourse>(this._url + "/" + id); 
  }
  saveCourses(icourse:ICourse): Observable<ICourse>{
    return this.http.put<ICourse>(this._url , icourse, this.httpOptions); 
  }
}

