import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import {FormsModule,ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { firebaseConfig } from '../environments/firebase.config';

import {UserService} from "./service/user.service";
import { HomeComponent } from './main/content/home/home.component';
import { MainComponent } from './main/main.component';
import { NavComponent } from './main/content/nav/nav.component';
import { ShopComponent } from './main/content/shop/shop.component';
import {ProfileModule} from './main/content/profile/profile.module';
import {RouterModule, Routes} from '@angular/router';
import {LoginModule} from './main/content/login/login.module';

const appRoutes: Routes = [
  {
    path      : '**',
    redirectTo: 'login'
  }
];
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainComponent,
    NavComponent,
    ShopComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),

    // Firebase modules
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,//ใช้สำหรับเอา Data จาก firebase
    AngularFireAuthModule,// ใช้เอา Auth จาก firebase

    //PrivateModule
    ProfileModule,
    LoginModule
  ],
  providers: [
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
