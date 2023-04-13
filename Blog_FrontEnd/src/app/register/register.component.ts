import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {AccountService} from "../_services/account.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  @Output() cancelRegister = new EventEmitter();
  model: any={}

  constructor(public accountService: AccountService, private router: Router, private toastr: ToastrService) {
  }
  ngOnInit(): void {
  }
  register(){
    this.accountService.register(this.model).subscribe({
      next: (response)=>{
        this.router.navigateByUrl('/profile');
      },
      error:(error)=>{
        this.toastr.error(error.error);
        console.log(error);
      }
    });
  }

  checkUserName(){
    this.accountService.checkUserName(this.model.username).subscribe({
      next: (response)=>{
       this.checkEmail();
      },
      error:(error)=>{
        this.toastr.error(error.error);
        console.log(error);
      }
    });
  }

  checkEmail(){
    this.accountService.checkEmail(this.model.email).subscribe({
      next: (response)=>{
        this.register()
      },
      error:(error)=>{
        this.toastr.error(error.error);
        console.log(error);
      }
    });
  }

  cancel(){
    this.cancelRegister.emit(false);
  }

}
