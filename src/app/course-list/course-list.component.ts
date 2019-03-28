import { Component, OnInit } from '@angular/core';
import { CoursedetailService } from '../coursedetail.service';
import {Router} from '@angular/router'
@Component({
  selector: 'app-course-list',
  template: `
   <h3>List of all available course</h3>
    <table style = "width:100%">
      <tr>
        <th>Course Id</th>
        <th>Code</th>
        <th>Section<br>and instance Id</th>
        <th>Enrolled</th>
        <th>Professor</th>
      </tr>  
      
      <tr *ngFor="let course of course" class ="bg-success">
        <td>{{course.courseId}}</td>
        <td>{{course.courseCode}}</td>
        <td>{{course.section}}-{{course.termSectionId}}</td>
        <td>{{course.enrolTotal}}</td>
        <td>{{course.professor}}</td>
        <hr>
      </tr>

     </table>


  `,
  styles: []
})
export class CourseListComponent implements OnInit {
  public course = [];
  constructor(private _courseService: CoursedetailService, private router: Router) { }

  ngOnInit() {
    this._courseService.getCourses()
    .subscribe(res => this.course= res);
  }

}
