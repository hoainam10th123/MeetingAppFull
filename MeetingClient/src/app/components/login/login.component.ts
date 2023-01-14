import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MyStreamSocialService } from 'src/app/_services/my-stream-social.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: UntypedFormGroup;
  user: User;
  
  constructor(public accountService: AccountService, 
    private router: Router, 
    private toastr: ToastrService,
    private streamSocialService: MyStreamSocialService
    ) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user=> this.user = user);
  }

  ngOnInit(): void {
    if(this.user){//if user login then redict to home page
      this.router.navigateByUrl('/room');
    }
    this.khoiTaoForm();    
  }

  khoiTaoForm() {
    this.loginForm = new UntypedFormGroup({
      userName: new UntypedFormControl('', [Validators.required]),
      password: new UntypedFormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)])
    })
  }

  login(){
    this.accountService.login(this.loginForm.value).subscribe(res=>{
      //this.toastr.success('Đăng nhập thành công!');
      this.router.navigateByUrl('/room');
    }, error=>{
      console.log(error);
      this.toastr.error(error.error);
    })
  }

  loginWithFacebook(){
    this.streamSocialService.signInWithFacebook();
  }
}
