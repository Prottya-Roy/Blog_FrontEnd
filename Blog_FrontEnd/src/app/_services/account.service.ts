import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {map} from "rxjs/operators";
import {User} from "../_models/user";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl = 'https://localhost:7233/api/';
  private  currentUserSource = new BehaviorSubject<User| null>(null);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) { }

  login(model: any){
    return this.http.post<User>(this.baseUrl+'User/LoginUser', model).pipe(
      map((response :User)=>{
        const user = response;
        if(user){
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    );
  }

  setCurrentUser(user: User){
    this.currentUserSource.next(user);
  }

  logOut(){
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }

  register(model: any){
    return this.http.post<User>(this.baseUrl+'User/RegisterUser', model).pipe(
      map((response :User)=>{
        const user = response;
        if(user){
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    );
  }

  checkUserName(userName: string) {
    return this.http.get<any>(this.baseUrl + 'User/UserNameAvailable/' + userName).pipe(
      map(response  => {
        if (response instanceof HttpErrorResponse) {
          console.log("UserName is in use");
        } else {
          console.log("UserName is Available");
        }
      })
    );
  }

    checkEmail(email: string){
      return this.http.get<any>(this.baseUrl+'User/EmailAvailable/'+email).pipe(
        map(response=>{
          if(response instanceof HttpErrorResponse){
            console.log("email is in use");
          }
          else {
            console.log("email is Available");
          }
        })
      );
  }

}
