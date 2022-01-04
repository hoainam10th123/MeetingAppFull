import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { User } from '../models/user';
import { AccountService } from '../_services/account.service';

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective implements OnInit {
  //ng g d has-role --skip-tests
  @Input() appHasRole: string[];
  user: User;
  //<li class="nav-item" *appHasRole='["Admin", "HR"]'>
  constructor(private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private accountService: AccountService) { }

  ngOnInit(): void {
    this.accountService.currentUser$.subscribe(user => {
      this.user = user;
      // clear view if no roles    
      if (!this.user?.roles || this.user == null) {
        this.viewContainerRef.clear();
        return;
      }

      if (this.user?.roles.some(r => this.appHasRole.includes(r))) {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainerRef.clear();
      }
    })
  }
}
