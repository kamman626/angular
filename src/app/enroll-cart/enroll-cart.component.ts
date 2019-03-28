import { Component, OnInit } from '@angular/core';
import{ActivatedRoute} from '@angular/router';

import { StudentlistService } from '../studentlist.service';
import { CoursedetailService } from '../coursedetail.service';
import { empty } from 'rxjs';
@Component({
  selector: 'app-enroll-cart',
  template: `
    <p>
      enroll-cart works!
    </p>
  `,
  styles: []
})
export class EnrollCartComponent implements OnInit {

  public student;
  public courses;
  public courseTaken;
  public ableCourse=[];
  constructor(private _studentService: StudentlistService, private _courseService: CoursedetailService,private route: ActivatedRoute) { }

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
