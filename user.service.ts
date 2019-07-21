import { Injectable } from '@angular/core';
import { User } from './models/user.model';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators'
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs/internal/Observable/throwError'

@Injectable()

export class UserService {

  constructor(private _httpClient: HttpClient){
  }

  //assuming the json-server will run in this port
  baseUrl = "http://localhost:3000/users";

        //REST - GET
        getUsers(): Observable<User[]>{
            return this._httpClient.get<User[]>(this.baseUrl).pipe(catchError(this.handleError));  
        }

        //Handels Error
        private handleError(errorResponse: HttpErrorResponse){
          if(errorResponse.error instanceof ErrorEvent){
            console.error('Client Side Error', errorResponse.error.message);
          }
          else {
            console.error('Server Side Error', errorResponse);
          } 
          return throwError('There is a problem with the service.Please Try again Later ');
        }
}