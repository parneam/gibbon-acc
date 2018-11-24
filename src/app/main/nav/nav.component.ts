import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private userService:UserService,
              private router : Router) { }

  ngOnInit() {
  }

  onLogOut(){
    this.userService.logout();
    this.router.navigate(['login'])
    console.log('nav component talk : LogOUt !!')
  }
}
