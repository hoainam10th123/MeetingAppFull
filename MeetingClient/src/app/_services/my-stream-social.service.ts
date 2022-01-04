import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class MyStreamSocialService {
  private socialUser: SocialUser;
  
  constructor(private authService: SocialAuthService, private router: Router, private accountService: AccountService) {
    this.authService.authState.subscribe((user) => {
      this.socialUser = user;
      if (this.socialUser) {
        let model = {
          provider: this.socialUser.provider,
          email: this.socialUser.email,
          name: this.socialUser.name,
          photoUrl: this.socialUser.photoUrl
        }

        this.accountService.loginWithSocial(model).subscribe(res => {
          this.router.navigateByUrl('/room');
        })
      }
    });
  }

  set UserSocial(value: SocialUser) {
    this.socialUser = value;
  }

  get UserSocial(): SocialUser {
    return this.socialUser;
  }

  signOutSocial(): void {
    this.authService.signOut();
  }

  // signInWithGoogle(): void {
  //   this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  // }

  signInWithFacebook(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
}
