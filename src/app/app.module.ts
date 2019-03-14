import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentlistService } from './studentlist.service';
//import { StudentListComponent } from './student-list/student-list.component';

@NgModule({
  declarations: [
    AppComponent,
   // StudentListComponent
   routingComponents
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    
  ],
  providers: [StudentlistService],
  bootstrap: [AppComponent]
})
export class AppModule { }
