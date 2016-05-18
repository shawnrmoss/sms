import {Injector} from '@angular/core';
import {appInjector} from './app-injector';
import {Router, ComponentInstruction} from '@angular/router-deprecated';

import {AuthenticationService} from '../services/authentication.service';

export const isLoggedIn = (next: ComponentInstruction, previous: ComponentInstruction) => {
	let injector: Injector = appInjector(); // get the stored reference to the injector
	let authService: AuthenticationService = injector.get(AuthenticationService);
	let router: Router = injector.get(Router);

    // return a boolean or a promise that resolves a boolean
	return new Promise((resolve) => {
	  authService.check()
	      .subscribe((result) => {
					if (result) {						
						resolve(true);
					} else {						
						router.navigate(['/Login']);
						resolve(false);
					}
				});
  });
};
