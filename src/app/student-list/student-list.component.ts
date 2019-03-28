import { Component, OnInit } from '@angular/core';
import { StudentlistService } from '../studentlist.service';
import {Router} from '@angular/router'


@Component({
  selector: 'app-student-list',
  template: `
    <p>
      student-list worksg!
    </p>
    <table style = "width:100%">
      <tr>
        <th>StudentId and<br>Academic Program</th>
        <th>Name</th>
        <th>Birth Date</th>
        <th>Email</th>
        <th>Academic Level</th>
        <th>GPA</th>
        <th>Course History</th>
        <th></th>
      </tr>  
      
      <tr *ngFor="let student of student" class ="bg-success">
        <td>{{student.studentId}}<br>{{student.academicProgram}}</td>
        <td>{{student.familyName}}<br>{{student.givenName}}</td>
        <td>{{student.birthDate}}</td>
        <td>{{student.email}}</td>
        <td>{{student.academicLevel}}</td>
        <td>{{student.gpa}}</td>
        <td>
        {{student.credits.length}}
        </td>
        <td>
        <button type="button" class="btn btn-light" (click) ="onSelect(student)">Detail</button>
        </td>
        <hr>
      </tr>

     </table>
  `,
  styles: [],
  
})
export class StudentListComponent implements OnInit {
  public student = [];
  constructor(private _studentService: StudentlistService, private router: Router) { }
  //use to display the array object
  //<p *ngFor="let c of student.credits"> {{c.termCompleted}} {{c.courseCode}} {{gradeEarned}}</p>
  ngOnInit() {
    this._studentService.getStudents()
    .subscribe(data => this.student= data);
  }

  onSelect(student){
    this.router.navigate(['/studentdetail',student._id])
  }

}
