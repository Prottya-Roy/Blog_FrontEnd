import {Component, OnInit} from '@angular/core';
import {AccountService} from "../_services/account.service";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {Observable, of} from "rxjs";
import {User} from "../_models/user";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  model: any={}


  constructor(public accountService: AccountService) {
  }

  ngOnInit(): void {
  }

  logIn() {
    this.accountService.login(this.model).subscribe({
      next: (response)=>{
        console.log(response);
      },
      error:(error)=>{
        console.log(error);
      }
    });
  }

  logOut(){
    this.accountService.logOut()
  }

}
