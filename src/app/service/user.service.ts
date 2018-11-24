import {EventEmitter, Injectable} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase';
import 'firebase/auth';
import {User} from "firebase";
import UserCredential = firebase.auth.UserCredential;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  onLoginSuccess: EventEmitter<User> = new EventEmitter<firebase.User>();
  onLogout = new EventEmitter();

  constructor(
    public afAuth: AngularFireAuth
  ) { }

    // login firebase ให้ npm install firebase angularfire2 --save ก่อน

  saveUserToLocalStorage(user: firebase.User) {
    var userJsonString = JSON.stringify(user);
    localStorage.setItem("user", userJsonString);
    this.onLoginSuccess.emit(user)
  }

  removeUserFromLocalStorage() {
    localStorage.removeItem("user");
    this.onLogout.emit()
  }

  isLogin():boolean {
      let currentUser = firebase.auth().currentUser;
      if(currentUser!=null){
        console.log('currentUser : '+currentUser.email)
      }
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

  emailLogin ( email: string , password: string ): Promise<UserCredential> {
    return firebase.auth().signInWithEmailAndPassword(email, password);
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

  logout(): Promise<void>{
    this.removeUserFromLocalStorage();
    return firebase.auth().signOut();
  }
}
