import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router-deprecated';
import { JwtHelper } from 'angular2-jwt';

import { Observable } from 'rxjs';

// Services
import { ApplicationService } from '../services/application.service';

// Types
import { Credential, Registration } from './../types/authentication';

/**
 * Auth Service.
 * This service is responsible for handling all authentication logic for the application.
 */
@Injectable()
export class AuthenticationService {
  private token: string;
  private loggedIn: boolean;
  private headers: Headers;
  private jwtHelper: JwtHelper = new JwtHelper();

  constructor(private http: Http, private router: Router, private CONSTANTS: ApplicationService) {
    this.loggedIn = false;

    // Set headers
    this.headers = new Headers();
    this.headers.append('Accept', 'application/json');
    this.headers.append('Content-Type', 'application/json');
  }

  /**
   * @param  cred Credential object containing a username and password.
   * @returns Sets the local storage jwt object used for authentication.
   */
  login(credential: Credential) {
    let body = 'userName=' + credential.email +
      '&password=' + credential.password + '&grant_type=password';

    // Change the Content-Type header for text/plain for the token
    this.headers.set('Content-Type', 'text/plain');

    return this.http.post(this.CONSTANTS.BASE_SERVICE_URL + 'Token', body, {
      headers: this.headers
    })
      .map(res => {
        this.token = res.json().access_token;
        this.loggedIn = true;
        localStorage.setItem('jwt', this.token);
      });
  }

  /**
   * @param registration Registration object we use to create a user.   
   */
  register(registration: Registration) {

    // create an object for the server must match the binding model for that route 
    // In this case it matches our CreateUserBindingModel
    // Sometimes we have to transform data                
    let registrationBindingModel = {
      'UserName': registration.userName,
      'Email': registration.email,
      'Password': registration.password,
      'ConfirmPassword': registration.confirmPassword
    };

    return this.http.post(this.CONSTANTS.BASE_SERVICE_URL +
      'api/account/Register', JSON.stringify(registrationBindingModel), {
        headers: this.headers
      });
  }

  /**
   * Logs the user out both in the client app and on the server
   */
  public logout() {

    let jwt = localStorage.getItem('jwt');

    // An authenticated request must contain the jwt token
    this.headers.append('Authorization', 'Bearer ' + jwt);

    this.http.post(this.CONSTANTS.BASE_SERVICE_URL + 'api/Account/Logout', '', {
      headers: this.headers
    })
      .subscribe(res => {
        localStorage.removeItem('jwt');
        localStorage.removeItem('expires');
        localStorage.removeItem('userName');
        this.loggedIn = false;
        this.router.navigate(['Login']);
      });
  }

  // Properties 

  public isAuthenticated() {
    return localStorage.getItem('jwt') !== undefined;
  }

  public getSummitUserID() {
    return this.jwtHelper.decodeToken(localStorage.getItem('jwt')).SummitUserID;
  }

  public getCustomerID() {
    return this.jwtHelper.decodeToken(localStorage.getItem('jwt')).CustomerID;
  }

  public getDisplayName() {
    return this.jwtHelper.decodeToken(localStorage.getItem('jwt')).DisplayName;
  }

  public getEmail() {
    return this.jwtHelper.decodeToken(localStorage.getItem('jwt')).Name;
  }

  public getPermissions() {
    return this.jwtHelper.decodeToken(localStorage.getItem('jwt')).Permissions;
  }

  public getRoles() {
    return this.jwtHelper.decodeToken(localStorage.getItem('jwt')).roles;
  }

  /**
   * This function checks to see if the user is logged in.
   * @returns boolean that represents whether a user is logged in or not.
   */
  check() {
    this.loggedIn = true;
    // Need to check for invalid or expired jwt and set the value of this.loggedIn truthy    
    if (!localStorage.getItem('jwt')) {
      this.loggedIn = false;
    } else if (this.jwtHelper.isTokenExpired(localStorage.getItem('jwt'))) {
      this.loggedIn = false;
    }

    return Observable.of(this.loggedIn);
  }
  
  /**
   * This function checks to see if the user has a particular permission.
   * @returns boolean that represents whether a user is logged in or not.
   */
  hasPermission() {
    this.loggedIn = true;
    // Need to check for invalid or expired jwt and set the value of this.loggedIn truthy    
    if (!localStorage.getItem('jwt')) {
      this.loggedIn = false;
    } else if (this.jwtHelper.isTokenExpired(localStorage.getItem('jwt'))) {
      this.loggedIn = false;
    }

    return Observable.of(this.loggedIn);
  }
}
