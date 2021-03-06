import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import 'firebase/auth';
import {UserService} from "../../../service/user.service";
import {App} from '../../model/app';
import {Router} from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  app:App={name:'Gibbon App'};
  loginForm: FormGroup;
  loginFormErrors: any;
  @Output()navigator: EventEmitter<boolean> = new EventEmitter<boolean>();

  //START Login Config
  logintype='loginOnly';//loginOnly','loginWithRegister'
  //END


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


    //Start  ใช้สำหรับทำ login กับ register ในหน้าเดียว
    // this.registerFormErrors = {
    //   email   : {},
    //   password: {},
    //   rePassword: {}
    // };
    //End

  }

  ngOnInit() {
    this.userService.logout();
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

  //START ใช้ทำ LogIn กับ Register ในหน้าเดียว
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
  //END

  onLogin(){
    console.log('onLoginClick');
    this.userService.emailLogin(this.loginForm.get('email').value, this.loginForm.get('password').value)
      .then(res => {
          const user = firebase.auth().currentUser;
          console.log(user.getIdToken());
          if (user != null && user.emailVerified) {
            user.providerData.forEach(function ( profile ): void {
              console.log('Sign-in provider: ' + profile.providerId);
              console.log('  Provider-specific UID:'  + profile.uid);
              console.log('  Name: ' + profile.displayName);
              console.log('  Email: ' + profile.email);
              console.log('  Photo URL: ' + profile.photoURL);
              console.log('logIn successful')
            });
            this.userService.saveUserToLocalStorage(user);
            this.router.navigate(['/shops']); //TODO
          } else if (user != null && user.emailVerified == false) {
            this.userService.logout();
            this.router.navigate(['/mail-confirm', this.loginForm.get('email').value]); //TODO
          } else {
            this.userService.logout();
          }
        }
      )
      .catch(error => {
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log('Create user error:' + errorCode + ' ' + errorMessage);
        this.router.navigate(['/login']);
      });

    console.log('form.email: '+this.loginForm.get('email').value)
    console.log('form.password: '+this.loginForm.get('password').value)
    // if(this.userService.isLogin()){
    //   this.router.navigate(['shops'])
    // }
  }

  // onLogout(){
  //   this.userService.logout()
  // }

  onFacebookLogin(){
    this.userService.facebookLogin()
    if(this.userService.isLogin()){
      this.router.navigate(['shops']);
      this.navigator.emit(true);
      console.log('navigator'+this.navigator)
    }

  }

  onGoogleLogin(){
    this.userService.googleLogin()
    if(this.userService.isLogin()){
      this.router.navigate(['shops'])
    }
  }

  onRegister(){
    this.router.navigate(['register'])
    // this.router.navigate(['dialogTest'])
  }

  // onRegisterSubmit(){
  //
  // }

  //START ใช้ทำ LOGIN กับ Register ในหน้าเดียว
  // openTab(event,tabName) {
  //   // Declare all variables
  //   var i, tabcontent, tablinks;
  //
  //   // Get all elements with class="tabcontent" and hide them
  //   tabcontent = document.getElementsByClassName("tab-content");
  //   for (i = 0; i < tabcontent.length; i++) {
  //     tabcontent[i].style.display = "none";
  //   }
  //
  //   // Get all elements with class="tablinks" and remove the class "active"
  //   tablinks = document.getElementsByClassName("tab-links");
  //   for (i = 0; i < tablinks.length; i++) {
  //     tablinks[i].className = tablinks[i].className.replace(" active", "");
  //   }
  //
  //   // Show the current tab, and add an "active" class to the button that opened the tab
  //   document.getElementById(tabName).style.display = "block";
  //   event.currentTarget.className += " active";
  // }
  //END

}
