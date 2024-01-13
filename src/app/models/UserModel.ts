export class TaskModel {
    id: string;
    description: string;
    developer: string;
    title: string;
    state: string;
    dateLimit?: Date;
    dateCreate?: Date;

    constructor() {
        this.id = '';
        this.description = '';
        this.title = '';
        this.developer = '';
        this.state = 'Pendiente';
    }
}

export class StateModel {
    key: string;
    action: string;
    value: UserDto;
    constructor(){
        this.key = '';
        this.action = '';
        this.value = new UserDto();
    }    
}

export class StatusRole {
    label: string;
    value: string;
    color: string;

    constructor() {
        this.label = 'P';
        this.value = 'Pendiente';
        this.color = 'danger';
    }
}


export class Status {
    label: string;
    value: boolean;
    color: string;

    constructor() {
        this.label = '';
        this.value = false;
        this.color = 'danger';
    }
}
export class User {
    email: string;
    password: string;
    constructor(){
        this.email = '';
        this.password = '';
    }
}
export class Token {
    token: string;
    constructor(){
        this.token = '';
    }
}
export class  InfoUserDto
{
     id?:string;
     documentType?:string;
     documentNumber?:string;
     firstName?:string;
     state?:boolean;
     lastName?:string;
     email?:string;
     codeRole?:string;
    constructor(){
        this.  id='';
        this. documentType='';
       this. documentNumber='';
       this. firstName='';
       this. state=false;
       this. lastName='';
       this. email='';
       this.  codeRole  ='';
    }
}

export class InfoRoleDto
    {
         identificaionCode:string;
         Description :string;
         constructor(){
            this.identificaionCode="";
            this.Description ="";
         }
    }

    export class UserDto
    {
        id :string;
        documentType :string;
        documentNumber:string;
        firstName :string;
        lastName:string;
        email :string;
        password :string;
        role :string;
        state :boolean;
        constructor(){
          this.  id ="";
          this.  documentType  ="";
          this.  documentNumber ="";
          this. firstName  ="";
          this.  lastName ="";
          this.  email ="";
          this.  password  ="";
          this.  role  ="";
          this.  state  =false;
        }
    }
