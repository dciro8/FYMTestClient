import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { RequestResultModel } from 'src/app/models/RequestResultModel';
import { ResponseModelTask } from 'src/app/models/ResponseModel';
import { InfoRoleDto, InfoUserDto, Token, User } from 'src/app/models/UserModel';
import { userService } from 'src/app/services/userService';

@Component({
  selector: 'ta-app-task-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class TaskListComponent implements OnInit {

  @Input() User = new User();
  infoUserDto:any= new InfoUserDto();
  token: string="";
   userVal: User =new User;
   isLoger:boolean=false;
   userList: InfoUserDto[] = [];
   infoRoleDto: InfoRoleDto[] = [];
   openDialog: boolean = false;
   isAdd: boolean = false;
   isDisabled: boolean = false;

   constructor(private userService: userService,
    private messageService: MessageService,) {
      this.isLoger=false;
  }

  ngOnInit(): void {

  }

  GetToken= (user: User) => {

    this.userService.getToken(user).subscribe((response: Token) => {
      
      if (!response.token) {
        if (this.token ==""){
      
          this.messageService.add({
            severity: 'error',
            summary:  'error',
            detail:`El Usuario '${this.User.email}' o la contraseña son erroneas`,
            life: 4001
          });
        }
        return
      }; 
      
      this.token =response.token;

      this.userService.getUserByMail(user,this.token).subscribe((infoUser: RequestResultModel<InfoUserDto>) => {   
        if (!infoUser) return;    

        this.infoUserDto =infoUser.result;
debugger;
        if (this.infoUserDto.codeRole !="ADM")
            {this.isDisabled=true;}

        this.isLoger=true;

          this.messageService.add({
            severity:  this.token ? 'success' : 'error',
            summary:  this.token ? 'Completado' : 'error',
            detail:  this.token ? `Se ha logueado el usuario ${this.infoUserDto.firstName} ${this.infoUserDto.lastName }` :  "El usuario no se encuentra registrado",
            life: 4001
          });
        });      
        this.getUserList(this.token);
        this.getRoleList(this.token);
    }
    
    );
  
  }



  getUserList = (token:string) => {
    this.userService.getUserList(token).subscribe((response: RequestResultModel<InfoUserDto[]>) => {
 
       this.userList = (response.result || []);
    });
  }

getRoleList = (token:string) => {
  this.userService.getRolList(token).subscribe((response: RequestResultModel<InfoRoleDto[]>) => {

     this.infoRoleDto = (response.result || []);
  });
}
  getStatus = (status: boolean) => {    
    switch (status) {
      case true:
        return "success"
        break;
      case false:
        return "danger"
        break;
      default:
        return "danger"
        break;
    }
  }


  addUser = () => {
    this.openDialog = true;
    this.isAdd = true;
  }
  
  closeSssion = () => {
    this.isLoger = false;
    this.token= "";
    this.isDisabled=false;
    this.User=new User;
    this.messageService.add({
      severity: 'success',
      summary:  'Completado',
      detail:`Se ha cerrado la session correctamente`,
      life: 4001
    }); 
  }

  Ingress =  (event: any) => {

    if (event == null) return;

    this.userVal.email=this.User.email;
    this.userVal.password=this.User.password;

    this.GetToken(this.userVal);
  }

  hideDialog = (event: ResponseModelTask) => {
    if (event == null) return;

     this. getUserList(this.token);
    this.openDialog = (event.openDialog || false);
  }

}
