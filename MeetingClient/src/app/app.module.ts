import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { AlertModule } from 'ngx-bootstrap/alert';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { PopoverModule } from 'ngx-bootstrap/popover';

import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TimeagoModule } from 'ngx-timeago';
import { HomeComponent } from './components/home/home.component';
import { NavComponent } from './components/nav/nav.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotfoundComponent } from './components/error-page/notfound/notfound.component';
import { ServerErrorComponent } from './components/error-page/server-error/server-error.component';
import { VideoBoxUserComponent } from './components/video-box-user/video-box-user.component';
import { ConfirmDialogComponent } from './components/modals/confirm-dialog/confirm-dialog.component';
import { HasRoleDirective } from './_directives/has-role.directive';
import { ErrorInterceptor } from './_interceptor/error.interceptor';
import { JwtInterceptor } from './_interceptor/jwt.interceptor';
import { LoadingInterceptor } from './_interceptor/loading.interceptor';

import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider } from '@abacritt/angularx-social-login';
import { ChatGroupComponent } from './components/chat-group/chat-group.component';
import { AddRoomModalComponent } from './components/room/add-room-modal/add-room-modal.component';
import { EditRoomModalComponent } from './components/room/edit-room-modal/edit-room-modal.component';
import { RoomMeetingComponent } from './components/room/room-meeting/room-meeting.component';

import { APP_INITIALIZER } from '@angular/core';
import { map } from 'rxjs/operators';
import { ConfigService } from './_services/ConfigService';
import { ManageUserComponent } from './components/admin-area/manage-user/manage-user.component';
import { ClockedButtonComponent } from './components/admin-area/clocked-button/clocked-button.component';

function initialize(http: HttpClient, config: ConfigService): (() => Promise<boolean>) {
  return (): Promise<boolean> => {
    return new Promise<boolean>((resolve: (a: boolean) => void): void => {
      http.get('../assets/config.json')
        .pipe(
          map((x: ConfigService) => {
            config.STUN_SERVER = x.STUN_SERVER;
            config.urlTurnServer = x.urlTurnServer;
            config.username = x.username;
            config.password = x.password;
            config.isRecorded = x.isRecorded;
            config.clockRegister = x.clockRegister;
            config.pageSize = x.pageSize;
            resolve(true);
          })
        ).subscribe();
    });
  };
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    LoginComponent,
    RegisterComponent,
    NotfoundComponent,
    ServerErrorComponent,
    RoomMeetingComponent,
    VideoBoxUserComponent,
    ConfirmDialogComponent,
    HasRoleDirective,
    ChatGroupComponent,
    AddRoomModalComponent,
    EditRoomModalComponent,
    ManageUserComponent,
    ClockedButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    SocialLoginModule,
    TimeagoModule.forRoot(),
    TooltipModule.forRoot(),
    AlertModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    PopoverModule.forRoot(),
    PaginationModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-left'
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('634916054192102')
          }
        ]
      } as SocialAuthServiceConfig,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initialize,
      deps: [
        HttpClient,
        ConfigService
      ],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
