import { Component, OnInit } from '@angular/core';
import{ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router'

import { StudentlistService } from '../studentlist.service';
import { CoursedetailService } from '../coursedetail.service';
import { empty } from 'rxjs';
@Component({
  selector: 'app-enroll-cart',
  template: `
<div class="container">
<div class = "row">
<div class = "col-md-7 col-7">
<h3>Student detail - {{student.givenName}} {{student.familyName}}. {{student.studentId}}        <button type="button" class="btn btn-light" (click) ="onSelect(student)">Back to detail</button></h3>
  </div>

  <div class="col-md-5 col-5">
  <p>Select courses, then save, or confirm your selections</p> 
  <button type="button" class="btn btn-light">Clear</button>
  <button type="button" class="btn btn-info">Save for later</button>
  <button type="button" class="btn btn-primary">Confirm as your time table</button>
  </div>
  </div>
<hr>
<div class="row">
  <div class="col-md-7 col-7" >
  <table style = "width:100%">
  <tr>
  <th><b>Course</b></th>
  <th><b>Days and times</b></th>
  <th><b>Enrolled</b></th>
  <th><b>Professor</b></th>
  <th><b>Add/Remove</b></th>
  </tr>
  <tr *ngFor="let ableCourse of ableCourse" >
    <td>{{ableCourse.courseCode}}</td>

    <td>
      <span *ngIf="ableCourse.classMon == 'Y'">Monday</span>
      <span *ngIf="ableCourse.classTue == 'Y'">Tuesday</span>
      <span *ngIf="ableCourse.classWed == 'Y'">Wednesday</span>
      <span *ngIf="ableCourse.classThu == 'Y'">Thursday</span>
      <span *ngIf="ableCourse.classFri == 'Y'">Friday</span>
{{ableCourse.classStart}} to {{ableCourse.classEnd}}    </td>


    <td>{{ableCourse.enrolTotal}}</td>
    <td>{{ableCourse.professor}}</td>
    <td></td>
  </tr>
  
  </table>
  </div>

  <div class="col-md-5 col-5">
  </div>

</div>
</div>  
  `,
  styles: []
})
export class EnrollCartComponent implements OnInit {

  public student;
  public courses;
  public courseTaken;
  public ableCourse=[];
  constructor(private _studentService: StudentlistService, private _courseService: CoursedetailService,private route: ActivatedRoute,private router: Router) { }

  ngOnInit() {
    let id = (this.route.snapshot.paramMap.get('id'));
    //this.studentId = id; 
    this._studentService.getStudent(id)
    .subscribe(res=>{
                      this.student=res
                      this.courseTaken=res['credits'].map(res=>res.courseCode)
     //               console.log(this.courseTaken)
                  })

    
    this._courseService.getCourses()
    .subscribe(res =>{
                      this.courses = res;
                      this.ableCourse = res.filter(r => {
                        if (this.courseTaken.indexOf(r.courseCode) == -1){
                          if(r.enrolTotal < 4){
                           if(r.academicProgram == this.student.academicProgram){
                             if(r.term == "2019 Winter"){
                        if(r.prerequisite.length > 0)
                            //filter will loop the prerequisite, c is the prerequisits course, to check is the courseTaken have c, if have c, do not return -1, and filter will increment by it self.
                          return r.prerequisite.filter(c => this.courseTaken.indexOf(c) !== -1).length == r.prerequisite.length;
                        else{
                          return true;
                           }
                          }
                         }
                        }
                      }
                      });
                    
                      console.log(this.ableCourse) 
              });

  }
  onSelect(student){
    this.router.navigate(['/studentdetail',student._id])
  }



}



  /*
                      this.ableCourse = res.map(r=>{
                    //    for(let i = 0; i < 1; i++){
                        //  console.log(res.prerequisite.length)
                         // console.log(res.prerequisite)
                     //    console.log(res) 
                     console.log("--------------------------------")
                         let count = 0;
                          for(let a = 0 ; a < r.prerequisite.length ; a++){
                            //console.log(res.prerequisite[a])
                            
                            if(this.courseTaken.includes(r.prerequisite[a])){
                              console.log(r.courseCode+" request " +r.prerequisite[a])
                              count++;
                            }
                            if(count === r.prerequisite.length){
                              console.log(count)
                              this.ableCourse.push(r)}
                            
                          }
                      //   }

                        // if(res.prerequisite.forEach(function(element){this.courseTaken.find(element)}) ){
                        //   //this.ableCourse=res;
                        //   console.log(this.courseTaken)
                          
                        
                        // }
 

 /*                       if(res.prerequisite.length<1 || res.prerequisite == undefined  ){
                          // res.prerequisite['0'] == this.courseTaken.map(function(item){})


                      //    this.ableCourse=res;
                         
                        }
                      }); 
                      */
