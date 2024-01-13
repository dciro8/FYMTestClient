import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ActionsEnum } from 'src/app/models/EnumActions';
import { RequestResultModel } from 'src/app/models/RequestResultModel';
import { ResponseModelTask } from 'src/app/models/ResponseModel';
import {  StateModel, Status, StatusRole, Token, User, UserDto } from 'src/app/models/UserModel';
// import { stateService } from 'src/app/services/stateService';
import { userService } from 'src/app/services/userService';

@Component({
  selector: 'ta-app-task',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class TaskComponent implements OnInit {

  @Output() closeDialog = new EventEmitter<ResponseModelTask>();
  @Input() userDtol = new UserDto();
  @Input() openDialog: boolean = false;
  @Input() isEdit: boolean = false;
  @Input() isAdd: boolean = false;
  statusesRole: StatusRole[] = [];
  tipeDoc: StatusRole[] = [];
  
  statuses: Status[] = [];
  validForm = true;
  @Input() token: string="";
  user: User =new User;
  constructor(private userService: userService, 
              private messageService: MessageService,
              // private stateService1: stateService
              ) {
    this.statusesRole = [
    {
      value: '8013CFE1-B7D2-4795-A2FE-B21558C21C9F',
      label: "El Inge que toma cerveza",
      color: 'success'
    },{
      value: '8013CFE1-B7D2-4795-A2FE-B21558C21C9F',
      label: "Administrador",
      color: 'danger'
    },
    {
      value: '2A5591A4-68BA-4AC3-A6D2-447E1D70ABA7',
      label: "Default",
      color: 'warning'
    }];
  
    this.statuses =
     [
    {
      value: true,
      label: "Activo",
      color: 'success'
    },{
      value: false,
      label: "Inactivo",
      color: 'danger'
    }];
      
    this.tipeDoc =
     [{
      value: "CC",
      label: "Cédula",
      color: 'danger'
    },
    {
      value: "CE",
      label: "Cédula de extranjería",
      color: 'success'
    },{
      value: "PA",
      label: "Pasaporte",
      color: 'danger'
    },];
    
  }
  ngOnInit(): void {
   }
  saveTask = (event: any) => {
    
    if (event == null) return;

    if (!this.validForm) return;

       this.postSaveTask(this.userDtol);
  }

  hideDialog = () => {
    let model = new ResponseModelTask();
    model.openDialog = false;
    debugger;
    this.closeDialog.emit(model);
  }
  
  private generateUuid(): string {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
            var r = (Math.random() * 16) | 0,
                v = c == "x" ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        }
    );
}

  postSaveTask = (user: UserDto) => {    
    user.id=this.generateUuid();
    debugger;
    this.userService.saveUser(user,this.token).subscribe((response: RequestResultModel<UserDto>) => {
      debugger;
      if (!response) return;

      const state = new StateModel ();
      state.action = ActionsEnum.INSERT;
      state.value = user;

      // this.stateService.setData(state);

      this.messageService.add({
        severity: response.isSuccessful ? 'success' : 'error',
        summary: response.isSuccessful ? 'Completado' : 'error',
        detail: response.isSuccessful ? `Se ha agregado el usuario ${user.email}` : response.errorMessage
      });
      this.hideDialog();
    });
  }

}
