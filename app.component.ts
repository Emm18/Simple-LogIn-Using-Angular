import { Component } from '@angular/core';
import { User } from './models/user.model';
import { UserService } from './user.service';
import { Injectable } from '@angular/core';

@Injectable()

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  //For bootstrap validation
  txtUNameIsInvalid = false;
  txtPWordIsInvalid = false;

  correctMessage = false;
  incorrectMessage = false;

  //Model
  users: User[];
  
  constructor(private _userService: UserService){
  }

  ngOnInit(){
    
  }


  //When user press submit button
  checkUserInput(uName: string, pWord: string): void {
    //Subscribe
    this._userService.getUsers().subscribe((userData) => {
      //instantiate users with users from REST API
      this.users = userData;
      //Check if the userinput is not null
      if (uName !== "" && pWord !== "") {
        this.txtUNameIsInvalid = false;
        this.txtPWordIsInvalid = false;
        //Check in users if the Users input is valid
        const inputToCompare = this.users.find(u => u.userId === uName && u.password === pWord);
        if (!inputToCompare) {
          this.correctMessage = false;
          this.incorrectMessage = true;
        } else {
          this.correctMessage = true;
          this.incorrectMessage = false;
        }
      }
      //If null go here
      else {
        //Check which is null
        if (uName === "") {
          this.txtUNameIsInvalid = true;
          this.correctMessage = false;
          this.incorrectMessage = false;
        } else {
          this.txtUNameIsInvalid = false;
          this.correctMessage = false;
          this.incorrectMessage = false;
        }
        if (pWord === "") {
          this.txtPWordIsInvalid = true;
          this.correctMessage = false;
          this.incorrectMessage = false;
        } else {
          this.txtPWordIsInvalid = false;
          this.correctMessage = false;
          this.incorrectMessage = false;
        }
      }
      });
  }
}
