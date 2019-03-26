import { Component, OnInit } from '@angular/core';
import{ActivatedRoute} from '@angular/router';
import { StudentlistService } from '../studentlist.service';

@Component({
  selector: 'app-student-detail',
  template: `
<div class="container">
  <div class="row">
  <div class="col">
<h3>Student detail - {{student.givenName}} {{student.familyName}}. {{student.studentId}}</h3>
  </div>
  </div>

  
<div class="row">
<div class="col-md-8 col-8">
<br>
<p><b>Student ID</b>  {{student.studentId}}</p>
<p><b>Name</b>  {{student.givenName}} {{student.familyName}}</p>
<p><b>Academic program</b>  {{student.academicProgram}}, level {{student.academicLevel}}</p>
<p><b>Grade point average</b>  {{student.gpa}}</p>
<hr>
<div class="col-md-3 col-3">
<b>Tentative course</b>
</div>
<div class="col-md-9 col-9">
<table style = "width:100%" >
<tr>
  <th>Term</th>
  <th>Course</th>
  <th>Day and time</th>
</tr>
</table>
</div>
<hr>

<div class="col-md-3 col-3">
<b>Confirmed course</b>
</div>
<div class="col-md-9 col-9">
<table style = "width:100%" >
<tr>
  <th>Term</th>
  <th>Course</th>
  <th>Day and time</th>
</tr>
</table>
</div>
<hr>

<div class="col-md-3 col-3">
<b>Course history</b>
</div>
<div class="col-md-9 col-9">
<table style = "width:100%" >
<tr>
  <th>Term</th>
  <th>Grade</th>
  <th>Course</th>
</tr>
<hr>
<tr *ngFor="let c of student.credits">
<td>{{c.termCompleted}}</td>
<td>{{c.gradeEarned}}</td>
<td>{{c.courseCode}}  {{c.courseName}}</td>
</tr>

</table>
</div>

 </div> 
<div class="col-md-4 col-4">
  col-sm-4


</div>


</div>


</div>

  `,
  styles: []
})
export class StudentDetailComponent implements OnInit {

  //public studentId;
  public student;
  constructor(private _studentService: StudentlistService, private route: ActivatedRoute) { }

  ngOnInit() {
    let id = (this.route.snapshot.paramMap.get('id'));
    //this.studentId = id; 
    this._studentService.getStudent(id)
    .subscribe(data => this.student= data);
  }

}
