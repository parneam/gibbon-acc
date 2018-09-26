import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import 'firebase/auth';
import {UserService} from "../../../service/user.service";
import {App} from '../../model/app';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  app:App={name:'Wanlaya App'};
  loginForm: FormGroup;
  loginFormErrors: any;

  //Start  ใช้สำหรับทำ login กับ register ในหน้าเดียว

  // registerForm: FormGroup;
  // registerFormErrors: any;

  //End

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
  private router : Router
  ) {

    this.loginFormErrors = {
      email   : {},
      password: {}
    };

    // this.registerFormErrors = {
    //   email   : {},
    //   password: {},
    //   rePassword: {}
    // };
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email   : ['soemsakplus@gmail.com', [Validators.required, Validators.email]],
      password: ['qwerty', Validators.required]
    });


    this.loginForm.valueChanges.subscribe(() => {
      this.onLoginFormValuesChanged();
    });

    //------------------ Start  ใช้สำหรับทำ login กับ register ในหน้าเดียว -------------

    // this.registerForm = this.formBuilder.group({
    //   email   : ['', [Validators.required, Validators.email]],
    //   password: ['', Validators.required],
    //   rePassword:['', Validators.required]
    // });
    //
    // this.registerForm.valueChanges.subscribe(() => {
    //   this.onRegisterFormValuesChanged();
    // });
    // document.getElementById("login").click();

    //--------------------------- End -------------------------------------

  }

  onLoginFormValuesChanged()
  {
    for ( const field in this.loginFormErrors )
    {
      if ( !this.loginFormErrors.hasOwnProperty(field) )
      {
        continue;
      }

      // Clear previous errors
      this.loginFormErrors[field] = {};

      // Get the control
      const control = this.loginForm.get(field);

      if ( control && control.dirty && !control.valid )
      {
        this.loginFormErrors[field] = control.errors;
      }
    }
  }

  // onRegisterFormValuesChanged()
  // {
  //   for ( const field in this.registerFormErrors )
  //   {
  //     if ( !this.registerFormErrors.hasOwnProperty(field) )
  //     {
  //       continue;
  //     }
  //
  //     // Clear previous errors
  //     this.registerFormErrors[field] = {};
  //
  //     // Get the control
  //     const control = this.registerForm.get(field);
  //
  //     if ( control && control.dirty && !control.valid )
  //     {
  //       this.registerFormErrors[field] = control.errors;
  //     }
  //   }
  // }

  onLogin(){
    this.userService.doEmailLogin(this.loginForm.get('email').value, this.loginForm.get('password').value)

    console.log('form.email: '+this.loginForm.get('email').value)
    console.log('form.password: '+this.loginForm.get('password').value)
  }

  onLogout(){
    this.userService.logout()
  }

  onFacebookLogin(){
    this.userService.doFacebookLogin()
  }

  onGoogleLogin(){
    this.userService.doGoogleLogin()
  }

  onRegister(){
    this.router.navigate(['profile',''])
  }

  openTab(event,tabName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tab-links");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    event.currentTarget.className += " active";
  }
}
