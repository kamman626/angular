import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentlistService } from './studentlist.service';
import { HttpClientModule } from '@angular/common/http';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CourseListComponent } from './course-list/course-list.component';
import { HomePageComponent } from './home-page/home-page.component';
import { EnrollCartComponent } from './enroll-cart/enroll-cart.component';
import{CartSelectedCellComponent} from'./cart-selected-cell.component';
import{CartSelectedGridComponent} from'./cart-selected-grid.component';
import{CartSelectedListComponent} from './cart-selected-list.component';
//import { StudentDetailComponent } from './student-detail/student-detail.component';
//import { StudentListComponent } from './student-list/student-list.component';

@NgModule({
  declarations: [
    AppComponent,
   // StudentListComponent
   routingComponents,
   PageNotFoundComponent,
   CourseListComponent,
   HomePageComponent,
   EnrollCartComponent,
   CartSelectedCellComponent,
   CartSelectedGridComponent,
   CartSelectedListComponent
  // StudentDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
 
  ],
  providers: [StudentlistService],
  bootstrap: [AppComponent]
})
export class AppModule { }
