import { Injectable } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase';
import 'firebase/auth';
import {User} from "firebase";
import UserCredential = firebase.auth.UserCredential;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public afAuth: AngularFireAuth) { }

    // login firebase ให้ npm install firebase angularfire2 --save ก่อน

  isLogin():boolean {
      let currentUser = firebase.auth().currentUser;
      return currentUser != null;
  }

  isAdmin():boolean {
      return false;
  }

  createUserWithEmailAndPassword(email: string , password: string): Promise<UserCredential> {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  sendVerificationEmail(user: User): Promise<void> {
    let actionCodeSettings = { url: 'http://localhost:4200/#/login', handleCodeInApp: true };
    return user.sendEmailVerification(actionCodeSettings)
  }

  emailLogin ( email: string , password: string ): void {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(res => {
          const user = firebase.auth().currentUser;
          console.log(user.getIdToken())

          if (user != null) {
            user.providerData.forEach(function ( profile ): void {
              console.log('Sign-in provider: ' + profile.providerId);
              console.log('  Provider-specific UID:'  + profile.uid);
              console.log('  Name: ' + profile.displayName);
              console.log('  Email: ' + profile.email);
              console.log('  Photo URL: ' + profile.photoURL);
              console.log('logIn successful')
            });
          }

        },
      );
  }

  facebookLogin(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const provider = new firebase.auth.FacebookAuthProvider();
      this.afAuth.auth
        .signInWithPopup(provider)
        .then(data => {
          const user=data.user
          console.log('Sign-in provider: ' + user.providerId);
          console.log('  Provider-specific UID:'  + user.uid);
          console.log('  Name: ' + user.displayName);
          console.log('  Email: ' + user.email);
          console.log('  Photo URL: ' + user.photoURL);
          console.log('logIn successful')

        }, err => {
          console.log(err);
          reject(err);
        });
    });
  }

  googleLogin(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.afAuth.auth
        .signInWithPopup(provider)
        .then(data => {
          const user=data.user
          console.log('Sign-in provider: ' + user.providerId);
          console.log('  Provider-specific UID:'  + user.uid);
          console.log('  Name: ' + user.displayName);
          console.log('  Email: ' + user.email);
          console.log('  Photo URL: ' + user.photoURL);
          console.log('logIn successful')
        });
    });
  }

  register(email: string, password: string): Promise<any>{
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(res => {
          resolve(res);
        }, err => reject(err));
    });
  }

  logout(){
    this.afAuth.auth.signOut().then(res=>{
        const user = firebase.auth().currentUser;

        if (user != null) {
          user.providerData.forEach(function ( profile ): void {
            console.log('Sign-in provider: ' + profile.providerId);
            console.log('  Provider-specific UID:'  + profile.uid);
            console.log('  Name: ' + profile.displayName);
            console.log('  Email: ' + profile.email);
            console.log('  Photo URL: ' + profile.photoURL);
            console.log('logOut unsuccessful')
          });
        }else{
          console.log('logOut successful')
        }
    }

    );
  }
}
