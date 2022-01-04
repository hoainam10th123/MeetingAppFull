import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageUserComponent } from './components/admin-area/manage-user/manage-user.component';
import { NotfoundComponent } from './components/error-page/notfound/notfound.component';
import { ServerErrorComponent } from './components/error-page/server-error/server-error.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RoomMeetingComponent } from './components/room/room-meeting/room-meeting.component';
import { AdminGuard } from './_guards/admin.guard';
import { AuthGuard } from './_guards/auth.guard';
import { PreventUnsavedChangesGuard } from './_guards/prevent-unsaved-changes.guard';

const routes: Routes = [
  {
    path:'',
    runGuardsAndResolvers:'always',
    canActivate: [AuthGuard],
    children:[
      {path: '', component: RoomMeetingComponent},
      {path: 'room', component: RoomMeetingComponent},
      {path: 'home/:id', component: HomeComponent, canDeactivate: [PreventUnsavedChangesGuard]},
      {path: 'manage-user', component: ManageUserComponent, canActivate: [AdminGuard]}
    ]
  },  
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},  
  {path: 'not-found', component: NotfoundComponent},
  {path: 'server-error', component: ServerErrorComponent},
  {path: '**', component: NotfoundComponent, pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
