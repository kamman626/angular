import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentDetailComponent } from './student-detail/student-detail.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CourseListComponent } from './course-list/course-list.component';
import { HomePageComponent } from './home-page/home-page.component';
import { EnrollCartComponent } from './enroll-cart/enroll-cart.component';

const routes: Routes = [
  {path: '', component:HomePageComponent},
  {path: 'studentlist', component:StudentListComponent},
  {path:'studentdetail/:id',component:StudentDetailComponent},
  {path: 'courselist',component:CourseListComponent  },
  {path:'enrollcart/:id',component:EnrollCartComponent},
  {path:'**',component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [HomePageComponent,StudentListComponent, StudentDetailComponent, CourseListComponent,EnrollCartComponent,PageNotFoundComponent] //put all the routing component inside a array