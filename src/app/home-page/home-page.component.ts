import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
@Component({
  selector: 'app-home-page',
  template: `
  <div class="container">
    <div class="row">
      <div class="col">
      <h3>Welcome</h3>
         <p>This is Kam Man Chan Angular app for BTI425 assignment</p>
      </div>
    </div>

    <div class="row">
      <div class="col">
         <p>This current version of the app enables the user to work with ALL students</p>
         <a class="btn btn-primary" href="studentlist" role="button">Student list</a>
      </div>
    </div>

  </div>
  `,
  styles: []
})
export class HomePageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
/*
<div class="container">
    <div class="row">
      <div class="col">
      <h3>Welcome</h3>
         <p>This is Kam Man Chan Angular app for BTI425 assignment</p>
      </div>
    </div>

    <div class="row">
      <div class="col">
         <p>This current version of the app enables the user to work with ALL students</p>
         <a class="btn btn-primary"  role="button">Link</a>
      </div>
    </div>

  </div>
  */