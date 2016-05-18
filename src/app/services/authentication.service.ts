import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router-deprecated';

import { Observable } from 'rxjs';

//Services
import { ApplicationService } from '../services/application.service';

//Types
import { Credential, Registration } from './../types/authentication';

@Injectable()
export class AuthenticationService {
    private token: string;
    private loggedIn: boolean;
    private headers: Headers;
    
    constructor(private http: Http, private router: Router,  private CONSTANTS: ApplicationService) {
    this.loggedIn = false;
    
    this.headers = new Headers(); 
    this.headers.append('Accept', 'application/json');   
    this.headers.append('Content-Type', 'application/json'); 
  }
  
  login(credential: Credential) {
    let body = 'userName=' + credential.email + '&password=' + credential.password + '&grant_type=password';

    //CHange the Content-Type header for text/plain for the token
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
        
  register(registration: Registration) {
  
    // create an object for the server must match the binding model for that route 
    // In this case it matches our CreateUserBindingModel
    // Sometimes we have to transform data                
    let registrationBindingModel = {    
        'UserName' : registration.userName,                         
        'Email': registration.email,
        'Password': registration.password,
        'ConfirmPassword': registration.confirmPassword           
    };
       
    return this.http.post(this.CONSTANTS.BASE_SERVICE_URL + 'api/account/Register', JSON.stringify(registrationBindingModel), {
        headers: this.headers
    });       
  }
  
  logout() {
    this.loggedIn = false;
  }
  
  check() {
    return Observable.of(this.loggedIn);
  }
}