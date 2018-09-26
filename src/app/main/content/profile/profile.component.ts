import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  id:number;
  private sub: any;
  test:string;
  profileForm: FormGroup;
  profileFormErrors: any;

  constructor(
    private formBuilder: FormBuilder,
    private router : Router,
    private route: ActivatedRoute
  ) {

    this.profileFormErrors = {
      email   : {},
      password: {},
      repassword:{}
    };
  }

  ngOnInit() {

    this.profileForm = this.formBuilder.group({
      email   : ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      repassword:['',Validators.required]
    });


    this.profileForm.valueChanges.subscribe(() => {
      this.onProfileFormValuesChanged();
    });

    this.sub = this.route.params.subscribe(params => {
      if(params['id']){
        this.id = +params['id'];
        console.log('found')
        this.test= 'edit';
      }else{
        console.log('not found')
        this.test= ' new'
      }
    });
  }

  onProfileFormValuesChanged()
  {
    for ( const field in this.profileFormErrors )
    {
      if ( !this.profileFormErrors.hasOwnProperty(field) )
      {
        continue;
      }

      // Clear previous errors
      this.profileFormErrors[field] = {};

      // Get the control
      const control = this.profileForm.get(field);

      if ( control && control.dirty && !control.valid )
      {
        this.profileFormErrors[field] = control.errors;
      }
    }
  }

  onSubmit(){

  }

}
