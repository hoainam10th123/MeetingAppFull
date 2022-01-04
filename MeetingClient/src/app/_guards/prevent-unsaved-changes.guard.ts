import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { HomeComponent } from '../components/home/home.component';
import { ConfirmService } from '../_services/confirm.service';

@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedChangesGuard implements CanDeactivate<unknown> {
  constructor(private confirmService: ConfirmService){}

  canDeactivate(component: HomeComponent): Observable<boolean> | boolean {
    if(component.isMeeting){
      //return confirm("Are you sure to exit?")
      return this.confirmService.confirm('Confirmation', 'Are you sure exit this page?');
    }
    return true;
  }
  
}
