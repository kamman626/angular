import { Injectable } from '@angular/core';
import{ HttpClient } from '@angular/common/http';
import { ICourse } from './course';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CoursedetailService {

  private _url:string ="http://localhost:8080/api/courses"

  constructor(private http:HttpClient) { }
  getCourses(): Observable<ICourse[]>{
    return this.http.get<ICourse[]>(this._url); 
  }
  getCourse(id:string): Observable<ICourse>{
    return this.http.get<ICourse>(this._url + "/" + id); 
  }
}
