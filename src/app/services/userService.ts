import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RequestResultModel } from "../models/RequestResultModel";
import { InfoRoleDto, InfoUserDto, Token, User, UserDto } from "../models/UserModel";
import { Observable, catchError, of, throwError } from "rxjs";


@Injectable({
    providedIn: "root",
})
export class userService {
    constructor(private http: HttpClient) { }

    URL_Str = 'https://localhost:7109/api/';

    
    getToken(user: User) {
        return this.http.post<Token>(this.URL_Str + "Autentications/Validate", user).pipe(catchError(x=> this.handleErrorAutorization(x)));;
    }

    private handleErrorAutorization(err: HttpErrorResponse): Observable<any> {
      
      if (err.status === 401 || err.status === 403) {
          return of(err.message); 
      }
      return throwError(err);
  }
    getUserList(token:string) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          })
        return this.http.get<RequestResultModel<InfoUserDto[]>>(this.URL_Str + "Users/GetAll", { headers: headers });
    }

    getRolList(token:string) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          })
        return this.http.get<RequestResultModel<InfoRoleDto[]>>(this.URL_Str + "Roles/GetRoleAll", { headers: headers });
    }

    getUserByMail(user: User,token:string) {

        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          })

        return this.http.get<RequestResultModel<InfoUserDto>>(this.URL_Str + "Users?email="+user.email+"&password="+user.password, { headers: headers });
    }

    saveUser(objDto: UserDto,token:string) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          })

        return this.http.post<RequestResultModel<UserDto>>(this.URL_Str + "Users", objDto, { headers: headers });
    }

}
