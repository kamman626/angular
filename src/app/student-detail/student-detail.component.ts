import { Component, OnInit } from '@angular/core';
import{ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router'
import { StudentlistService } from '../studentlist.service';


@Component({
  selector: 'app-student-detail',
  template: `
<div class="container">
  <div class="row">
  <div class="col">
<h3>Student detail - {{student.givenName}} {{student.familyName}}. {{student.studentId}} <a class="btn btn-info" href="studentlist" role="button">Back to list</a></h3>
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
<hr>
<tr *ngFor="let t of student.tentativeCourses">
<td>{{t.term}}</td>
<td>{{t.courseCode}}</td>
<td> <span *ngIf="t.classMon == 'Y'">Monday</span>
<span *ngIf="t.classTue == 'Y'">Tuesday</span>
<span *ngIf="t.classWed == 'Y'">Wednesday</span>
<span *ngIf="t.classThu == 'Y'">Thursday</span>
<span *ngIf="t.classFri == 'Y'">Friday</span>
<br>{{t.classStart}}  {{t.classEnd}}    </td>
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
<hr>
<tr *ngFor="let f of student.confirmedCourses">
<td>{{f.term}}</td>
<td>{{f.courseCode}}</td>
<td> <span *ngIf="f.classMon == 'Y'">Monday</span>
<span *ngIf="f.classTue == 'Y'">Tuesday</span>
<span *ngIf="f.classWed == 'Y'">Wednesday</span>
<span *ngIf="f.classThu == 'Y'">Thursday</span>
<span *ngIf="f.classFri == 'Y'">Friday</span>
<br>{{f.classStart}}  {{f.classEnd}}    </td>
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
  <h6><b>Select courses for next term</b></h6> 
  <a class="btn btn-primary" (click) ="onSelect(student)" role="button">Select courses</a>

</div>


</div>


</div>

  `,
  styles: []
})
export class StudentDetailComponent implements OnInit {

  //public studentId;
  public student ;
 
  constructor(private _studentService: StudentlistService,private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    let id = (this.route.snapshot.paramMap.get('id'));
    //this.studentId = id; 
    this._studentService.getStudent(id)
    .subscribe(data => this.student= data);
   // console.log(this.student)
   
  };
 
  onSelect(student){
    this.router.navigate(['/enrollcart',student._id])
  }

}


// <tr *ngFor="let t of student">
// <td>{{t.tentativeCourses.term}}</td>
// <td>{{t.tentativeCourses.courseCode}}</td>
// <td> <span *ngIf="t.tentativeCourses.classMon == 'Y'">Monday</span>
// <span *ngIf="t.tentativeCourses.classTue == 'Y'">Tuesday</span>
// <span *ngIf="t.tentativeCourses.classWed == 'Y'">Wednesday</span>
// <span *ngIf="t.tentativeCourses.classThu == 'Y'">Thursday</span>
// <span *ngIf="t.tentativeCourses.classFri == 'Y'">Friday</span>
// <br>{{t.tentativeCourses.classStart}}  {{t.tentativeCourses.classEnd}}    </td>
// </tr>

// <tr *ngFor="let t of student.tentativeCourses">
// <td>{{t.term}}</td>
// <td>{{t.courseCode}}</td>
// <td> <span *ngIf="t.classMon == 'Y'">Monday</span>
// <span *ngIf="t.classTue == 'Y'">Tuesday</span>
// <span *ngIf="t.classWed == 'Y'">Wednesday</span>
// <span *ngIf="t.classThu == 'Y'">Thursday</span>
// <span *ngIf="t.classFri == 'Y'">Friday</span>
// <br>{{t.classStart}}  {{t.classEnd}}    </td>
// </tr>



// <tr *ngFor="let f of student.confirmedCourses">
// <td>{{f.term}}</td>
// <td>{{f.courseCode}}</td>
// <td> <span *ngIf="f.classMon == 'Y'">Monday</span>
// <span *ngIf="f.classTue == 'Y'">Tuesday</span>
// <span *ngIf="f.classWed == 'Y'">Wednesday</span>
// <span *ngIf="f.classThu == 'Y'">Thursday</span>
// <span *ngIf="f.classFri == 'Y'">Friday</span>
// <br>{{f.classStart}}  {{f.classEnd}}    </td>
// </tr>