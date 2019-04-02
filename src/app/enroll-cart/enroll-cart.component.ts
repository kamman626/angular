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


<h3>Student detail - {{student.givenName}} {{student.familyName}}. {{student.studentId}}        <button type="button" class="btn btn-light" (click) ="goDetail(student)">Back to detail</button></h3>
  </div>

  <div class="col-md-5 col-5">
  <p>Select courses, then save, or confirm your selections</p> 
  <button style="margin:3px" type="button" class="btn btn-light" (click)="clearButton()" >Clear</button>
  <button style="margin:3px" type="button" class="btn btn-info" (click) ="saveLater() ">Save for later</button>
  <button style="margin:3px"type="button" class="btn btn-primary" (click)="confirmSave()" >Confirm as your time table</button>
  </div>
  </div>
<hr>
<div class="row">
  <div class="col-md-7 col-7" >
  
  <table style = "width:100%, height: 100px, overflow-y: scroll">
  <tr >
  <th style="padding: 8px"><b>Course </b></th>
  <th style="padding: 8px"><b>Days and times</b></th>
  <th style="padding: 8px"><b>Enrolled</b></th>
  <th style="padding: 8px"><b>Professor</b></th>
  <th style="padding: 8px"><b>Add/Remove</b></th>
  </tr>
  <tr *ngFor="let ableCourse of ableCourse" >
    <td style="padding: 8px">{{ableCourse.courseCode}}</td>

    <td style="padding: 8px">
      <span *ngIf="ableCourse.classMon == 'Y'">Monday</span>
      <span *ngIf="ableCourse.classTue == 'Y'">Tuesday</span>
      <span *ngIf="ableCourse.classWed == 'Y'">Wednesday</span>
      <span *ngIf="ableCourse.classThu == 'Y'">Thursday</span>
      <span *ngIf="ableCourse.classFri == 'Y'">Friday</span>
      <br>{{ableCourse.classStart}} to {{ableCourse.classEnd}}    </td>


    <td style="padding: 8px">{{ableCourse.enrolTotal}}</td>
    <td style="padding: 8px">{{ableCourse.professor}}</td>
    <td style="padding: 8px"><button style="padding:10px" type="button" [ngClass]="['btn', isCourseSelected(ableCourse) ? 'btn-danger' : 'btn-success']"   (click) ="courseSelected(ableCourse)" >   +/-   </button></td>
  </tr>
  
  </table>
  
  </div>

  <div class="col-md-5 col-5">
  <div class="row" >
  <app-cart-selected-grid [coursesSelected]="selectedCourse"></app-cart-selected-grid>
  <app-cart-selected-list [coursesSelected]="selectedCourse"></app-cart-selected-list>
  </div>
<div class="row" >
<table style = "width:100%">
  <thead>
    <tr>
      <th style="padding: 8px">Course</th>
      <th style="padding: 8px">Day</th>
      <th style="padding: 8px">Start</th>
      <th style="padding: 8px">End</th>
    </tr>
  </thead>
  <tbody>
    <tr *ngFor="let c of selectedCourse">
      <td>{{ c.courseCode }} - {{ c.section }} ({{ c.termSectionId }})</td>
      <td>
        <span *ngIf="c.classMon == 'Y'">Monday</span>
        <span *ngIf="c.classTue == 'Y'">Tuesday</span>
        <span *ngIf="c.classWed == 'Y'">Wednesday</span>
        <span *ngIf="c.classThu == 'Y'">Thursday</span>
        <span *ngIf="c.classFri == 'Y'">Friday</span>
      </td>
      <td>{{ c.classStart }}</td>
      <td>{{ c.classEnd }}</td>
    </tr>
  </tbody>
  </table>
</div>
  </div>

</div>
</div>  
  `,
  styles: []
})
export class EnrollCartComponent implements OnInit {

  public student = [];
  public courses;
  public courseTaken;
  public ableCourse=[];
  public selectedCourse=[];
  
  constructor(private _studentService: StudentlistService, private _courseService: CoursedetailService,private route: ActivatedRoute,private router: Router) { }

  ngOnInit() {
    let id = (this.route.snapshot.paramMap.get('id'));
    //this.studentId = id; 
    this._studentService.get1Student(id)
    
    .subscribe(res=>{
                      this.student[0]=res
                      this.courseTaken=res['credits'].map(res=>res.courseCode)
                      if(this.student[0].tentativeCourses){
                        this.selectedCourse = this.student[0].tentativeCourses
                      }
                      else if (this.student[0].confirmedCourses){
                        this.selectedCourse = this.student[0].confirmedCourses}
                    
                    console.log(this.student)
                  })
                 
    
    this._courseService.getCourses()
    .subscribe(res =>{
                      this.courses = res;
                      this.ableCourse = res.filter(r => {
                        if (this.courseTaken.indexOf(r.courseCode) == -1){
                          if(r.enrolTotal < 4){
                           if(r.academicProgram == this.student[0].academicProgram){
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
                      this.ableCourse.forEach(
                        c => {
                          c.classStart= c.classStart.slice(0, c.classStart.length - 3);
                          c.classEnd = c.classEnd.slice(0, c.classEnd.length - 3);
                        }
                      );
                  //    console.log(this.ableCourse) 
              });

  }
  goDetail(student){
    this.router.navigate(['/studentdetail',student._id])
  }

  courseSelected(aableCourse){
    //search for the array that is the user select the course already
    // if the user already select the course in the timetable, it will delete it.
    //if the user haven't select the course in the time table, it will 
    let index = this.selectedCourse.indexOf(aableCourse)
   if(index>-1){
      this.selectedCourse.splice(index,1)
    }else{
    this.selectedCourse.push(aableCourse);
    }
  //  console.log(this.selectedCourse)
  }
   
  isCourseSelected(aableCourse){
    let index = this.selectedCourse.indexOf(aableCourse)
   if(index>-1){
     return true
    }else{
    return false
    }
  }
             
  saveLater(){
    
    this.student[0].tentativeCourses=this.selectedCourse;
   // console.log(this.student.tentativeCourses)

    let id = (this.route.snapshot.paramMap.get('id'));
    this.router.navigate(['/studentdetail',this.student[0]._id])
    return this._studentService.saveStudent(this.student[0],id).subscribe()
  }

  confirmSave(){
    
    //  this.student.confirmedCourses = [];
     this.student[0].confirmedCourses=this.selectedCourse;
     this.student[0].tentativeCourses=[];
   // console.log(this.student.tentativeCourses)

    let id = (this.route.snapshot.paramMap.get('id'));
    this.router.navigate(['/studentdetail',this.student[0]._id])
//--------------
    
    //   if(this.student.confirmedCourses.find(this.courses)){
    //     this.courses.enrolTotal++
    //     console.log(this.courses.courseCode + this.courses.enrolTotal)
    //   }
      
    //  this._courseService.saveCourses(this.courses).subscribe
//---------------data=>this.student.push(data)
    return this._studentService.saveStudent(this.student[0],id).subscribe()
  }




  clearButton(){
    
    this.student[0].tentativeCourses = [];
    this.student[0].selectedCourse=[];
    
    this.router.navigate(['/studentdetail',this.student[0]._id])
    return this._studentService.saveStudent(this.student[0],this.student[0]._id).subscribe()
  }


// onSaveLater(){
//   let id = (this.route.snapshot.paramMap.get('id'));
//   this._studentService.storeServers(this.student,id)
//   .subscribe(
//     (response)=>console.log(response),
//     (error)=>console.log(error)
//   );
// }


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
