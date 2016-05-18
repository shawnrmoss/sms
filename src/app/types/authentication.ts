export class Credential {
    //full constructor       
    constructor(public email: string,
                public password: string) {}
}

export class Registration {
    //full constructor           
    constructor(public userName: string,                
                public email: string,
                public password: string, 
                public confirmPassword: string) {}
}

