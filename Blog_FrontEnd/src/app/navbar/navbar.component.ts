import {Component, OnInit} from '@angular/core';
import {AccountService} from "../_services/account.service";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {Observable, of} from "rxjs";
import {User} from "../_models/user";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  model: any={}


  constructor(public accountService: AccountService, private router: Router, private toastr:  ToastrService) {
  }

  ngOnInit(): void {
  }

  logIn() {
    this.accountService.login(this.model).subscribe({
      next: (response)=>{
        this.router.navigateByUrl('/profile');
      },
      error:(error)=>{
        if(error.status==500){
          this.toastr.error("Invalid Username");
        }
        else {
          this.toastr.error(error.error);
        }
      }
    });
  }

  logOut(){
    this.accountService.logOut();
    this.router.navigateByUrl('/');
  }

}
