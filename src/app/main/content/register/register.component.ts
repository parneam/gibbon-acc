import {Component, Inject, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../service/user.service';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {AlertPopupComponent} from './alert-popup/alert-popup.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  id:number;
  private sub: any;
  test:string;
  registerForm: FormGroup;
  registerFormErrors: any;

  constructor(
    private formBuilder: FormBuilder,
    private router : Router,
    private route: ActivatedRoute,
    private userService: UserService,
    public dialog: MatDialog
  ) {

    this.registerFormErrors = {
      email   : {},
      password: {},
      rePassword:{}
    };
  }

  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      email     : ['', [Validators.required, Validators.email]],
      password  : ['', Validators.required],
      rePassword: ['',[Validators.required,]],
      accepted  : [false, [Validators.required,Validators.requiredTrue]]
    }
    // ,
    //   {Validators:this.checkPasswords()}
    );


    this.registerForm.valueChanges.subscribe(() => {
      this.onRegisterFormValuesChanged();
    });
  }

  onRegisterFormValuesChanged()
  {
    for ( const field in this.registerFormErrors )
    {
      if ( !this.registerFormErrors.hasOwnProperty(field) )
      {
        continue;
      }

      // Clear previous errors
      this.registerFormErrors[field] = {};

      // Get the control
      const control = this.registerForm.get(field);

      if ( control && control.dirty && !control.valid )
      {
        this.registerFormErrors[field] = control.errors;
      }
      // this.checkPasswords()
    }
  }

  checkPasswords() { // here we have the 'passwords' group
    let pass = this.registerForm.get('password').value;
    let confirmPass = this.registerForm.get('rePassword').value;

    return pass === confirmPass ? null : { notSame: true }
    // return false
  }

  onCreateNewAccountClick() {
    this.userService.createUserWithEmailAndPassword(this.registerForm.get('email').value,this.registerForm.get('password').value)
      .then(res => {
        let user = res.user
        if (user != null) {
          console.log('register success: ' + user.email);
          this.userService.sendVerificationEmail(user)
            .then( value => {
              console.log('Sending verification email success:');
            })
            .catch( error => {
              let errorCode = error.code;
              let errorMessage = error.message;
              console.log('Sending verification email error:' + errorCode + ' ' + errorMessage);
              this.openAlertPopup(errorCode,errorMessage);
            })
        }
      })
      .catch(error => {
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log('Create user error:' + errorCode + ' ' + errorMessage);
        this.openAlertPopup(errorCode,errorMessage);
      });
  }

  openTermsAndConditions(){

    const dialogRef = this.dialog.open( TermsConditionsComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openAlertPopup(errorCode:string,errorMassege:string){

    const dialogRef = this.dialog.open(AlertPopupComponent, {
      width : '250px',
      data  : { errorCode : errorCode, errorMassege : errorMassege }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`PopUp Alert result: ${result}`);
    });
  }

}

