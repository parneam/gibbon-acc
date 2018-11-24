import { Component, OnInit } from '@angular/core';
import {UserService} from '../service/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  navigator:boolean=false
  login:boolean=false

  constructor(private userService : UserService) { }

  ngOnInit() {

  }

  isLogIn(){
    // console.log('isLogin work :'+this.userService.isLogin());
    return this.userService.isLogin();
  }

}
