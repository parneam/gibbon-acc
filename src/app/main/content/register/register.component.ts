import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../service/user.service';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { MatDialogConfig, MatDialog} from '@angular/material';

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
    public dialog: MatDialog,
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
      rePassword: ['',Validators.required],
      accepted  : [false, [Validators.required,Validators.requiredTrue]]
    });


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
    }
  }

  onSubmit(){
    console.log('on submit')
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
            })
        }
      })
      .catch(error => {
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log('Create user error:' + errorCode + ' ' + errorMessage);
      });
  }

  openTermsAndConditions(){
    const dialogConfig = new MatDialogConfig();

    // dialogConfig.disableClose = true;
    // dialogConfig.autoFocus = true;
    // dialogConfig.hasBackdrop=true;
    dialogConfig.position={ top: '-60px', left: '500px' }

    const dialogRef = this.dialog.open( TermsConditionsComponent,dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
