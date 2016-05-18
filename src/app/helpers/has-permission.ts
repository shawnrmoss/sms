import {Injector} from '@angular/core';
import {appInjector} from './app-injector';
import {Router, ComponentInstruction} from '@angular/router-deprecated';

import {AuthenticationService} from '../services/authentication.service';

/**
 * Checks to see if the user is logged in and either resolves the route or redirect to the Login route.
 */
export const hasPermission = (next: ComponentInstruction, previous: ComponentInstruction, permissionName: string) => {
	let injector: Injector = appInjector(); // get the stored reference to the injector
	let authService: AuthenticationService = injector.get(AuthenticationService);
	let router: Router = injector.get(Router);

	// return a boolean or a promise that resolves a boolean
	return new Promise((resolve) => {
		authService.hasPermission(permissionName)
			.subscribe((result) => {
				if (result) {
					resolve(true);
				} else {
					router.navigate(['/PermissionDenied']);
					resolve(false);
				}
			});
	});
};
