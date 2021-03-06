import { Injectable } from '@angular/core';

@Injectable()
export class ApplicationService {
    // Use in all other services to set the BASE_SERVICE_URL    
    public BASE_SERVICE_URL: string;

    private TEST_LOCALLY: boolean;
    private LOCAL_SERVICE_URL = 'http://localhost:65052/';
    private AZURE_SERVICE_URL = 'http://summitapi.azurewebsites.net/';

    constructor() {
        this.TEST_LOCALLY = false;
        this.BASE_SERVICE_URL = this.TEST_LOCALLY === true ? this.LOCAL_SERVICE_URL : this.AZURE_SERVICE_URL;
    }
}
