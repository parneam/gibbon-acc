import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { firebaseConfig } from '../environments/firebase.config';

import { UserService } from "./service/user.service";
import { HomeComponent } from './main/content/home/home.component';
import { MainComponent } from './main/main.component';
import { ShopComponent } from './main/content/shop/shop.component';
import { ProfileModule } from './main/content/profile/profile.module';
import { RouterModule, Routes } from '@angular/router';
import { LoginModule } from './main/content/login/login.module';
import { RegisterModule } from './main/content/register/register.module';
import { ShopsModule } from './main/content/shops/shops.module';
import { ContentComponent } from './main/content/content.component';
import { NavComponent } from './main/nav/nav.component';
import { MailConfirmModule } from './main/content/mail-confirm/mail-confirm.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogTestModule} from './main/content/dialog-test/dialog-test.module';

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
    ShopComponent,
    ContentComponent,
    NavComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),

    // Firebase modules
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,//ใช้สำหรับเอา Data จาก firebase
    AngularFireAuthModule,// ใช้เอา Auth จาก firebase

    //PrivateModule
    ProfileModule,
    LoginModule,
    RegisterModule,
    ShopsModule,
    MailConfirmModule,
    DialogTestModule
  ],
  providers: [
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
