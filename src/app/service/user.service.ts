import { Injectable } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase';
import 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public afAuth: AngularFireAuth) { }

  // login firebase ให้ npm install firebase angularfire2 --save ก่อน

  doEmailLogin ( email: string , password: string ): void {
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

  doFacebookLogin(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const provider = new firebase.auth.FacebookAuthProvider();
      this.afAuth.auth
        .signInWithPopup(provider)
        .then(res => {
          resolve(res);
        }, err => {
          console.log(err);
          reject(err);
        });
    });
  }

  doGoogleLogin(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.afAuth.auth
        .signInWithPopup(provider)
        .then(res => {
          resolve(res);
        });
    });
  }

  doRegister(email: string, password: string): Promise<any>{
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
