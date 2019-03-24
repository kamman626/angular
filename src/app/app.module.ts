import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentlistService } from './studentlist.service';
import { HttpClientModule } from '@angular/common/http';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
//import { StudentDetailComponent } from './student-detail/student-detail.component';
//import { StudentListComponent } from './student-list/student-list.component';

@NgModule({
  declarations: [
    AppComponent,
   // StudentListComponent
   routingComponents,
   PageNotFoundComponent,
  // StudentDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
    
  ],
  providers: [StudentlistService],
  bootstrap: [AppComponent]
})
export class AppModule { }
