import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/_services/account.service';
import { MyStreamSocialService } from 'src/app/_services/my-stream-social.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(public accountService: AccountService, private router: Router, private streamSocialService: MyStreamSocialService) { }

  ngOnInit(): void {
  }

  logout(){    
    if (this.streamSocialService.UserSocial) {
      this.streamSocialService.signOutSocial();      
    }
    this.accountService.logout();
    this.router.navigateByUrl('/login'); 
  }

  infor(){
    console.log(this.streamSocialService.UserSocial);
  }
}
