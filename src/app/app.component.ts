import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Event, NavigationEnd, Params, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  showLogin = false;
  
  constructor(private route: ActivatedRoute, private router: Router) {}
  
  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        if (params.id == 1) {
          this.showLogin = true;
        } else {
          this.showLogin = false;
        }
      }
    )
  }
}
