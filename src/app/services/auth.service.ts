import { Injectable, WritableSignal,inject,signal } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  router = inject(Router);
  userData: any = null;
  $isLogged: WritableSignal<boolean> = signal(false);

  constructor(private auth: AngularFireAuth) { 
    //Comprobar si esta logeado
    this.auth.authState.subscribe(data=>{
      if(data){
        //Estoy logeado
        this.userData = data;
        this.$isLogged.set(true);
      }else{
        //No estoy logeado
        this.userData = null;
        this.$isLogged.set(false);
        this.router.navigate(['login']);
      }
    })
  }

  async login(){
    try{
      let user = await this.auth.signInWithPopup(new GoogleAuthProvider());
      return user;
    }catch(err){
      return err;
    }
  }

  logout(){
    this.auth.signOut();
  }

}


