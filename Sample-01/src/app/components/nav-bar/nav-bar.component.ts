import { Component, Inject, OnInit } from '@angular/core';
import { faUser, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '@auth0/auth0-angular';
import * as auth0 from 'auth0-js';
import { DOCUMENT } from '@angular/common';
import authConfig from '../../../../auth_config.json'

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  isCollapsed = true;
  faUser = faUser;
  faPowerOff = faPowerOff;
  isLoggedIn = false;

  webAuth = new auth0.WebAuth({
    clientID: authConfig.clientId,
    domain: authConfig.domain,
    responseType: "token id_token",
    audience: "backend",
    scope: "openid profile",
    redirectUri: "http://localhost:4200/callback",
  });

  constructor(
    public auth: AuthService,
    @Inject(DOCUMENT) private doc: Document
  ) {}


  ngOnInit() {
    this.checkSession();
  }

  loginWithRedirect() {
    this.auth.loginWithRedirect();
  }

  checkSession() {
    this.webAuth.checkSession({}, (error, result) => {
      if(error){
        console.error(error);
        this.isLoggedIn = false;
        this.loginWithRedirect();
      }
      else {
        console.log(result);
        this.isLoggedIn = true;
      }
    
    })
  }

  logout() {
    this.auth.logout({ logoutParams: { returnTo: this.doc.location.origin } });
  }
}
