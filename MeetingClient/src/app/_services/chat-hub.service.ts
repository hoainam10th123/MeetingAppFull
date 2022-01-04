import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Member } from '../models/member';
import { Message } from '../models/message';
import { User } from '../models/user';
import { MessageCountStreamService } from './message-count-stream.service';
import { MuteCamMicService } from './mute-cam-mic.service';

@Injectable({
  providedIn: 'root'
})
export class ChatHubService {

  hubUrl = environment.hubUrl;
  private hubConnection: HubConnection;

  //private onlineUsersSource = new BehaviorSubject<Member[]>([]);
  //onlineUsers$ = this.onlineUsersSource.asObservable();

  private oneOnlineUserSource = new Subject<Member>();
  oneOnlineUser$ = this.oneOnlineUserSource.asObservable();

  private oneOfflineUserSource = new Subject<Member>();
  oneOfflineUser$ = this.oneOfflineUserSource.asObservable();

  private messagesThreadSource = new BehaviorSubject<Message[]>([]);
  messagesThread$ = this.messagesThreadSource.asObservable();

  constructor(private toastr: ToastrService, 
    private messageCount: MessageCountStreamService, 
    private muteCamMicro: MuteCamMicService) { }

  createHubConnection(user: User, roomId: string){
    
    this.hubConnection = new HubConnectionBuilder()
    .withUrl(this.hubUrl+ 'chathub?roomId=' + roomId, {
      accessTokenFactory: ()=> user.token
    }).withAutomaticReconnect().build()

    this.hubConnection.start().catch(err => console.log(err));

    // this.hubConnection.on('ReceiveMessageThread', messages => {
    //   this.messageThreadSource.next(messages);
    // })  

    this.hubConnection.on('NewMessage', message => {
      if(this.messageCount.activeTabChat){
        this.messageCount.MessageCount = 0;
      }else{
        this.messageCount.MessageCount += 1
      }
      this.messagesThread$.pipe(take(1)).subscribe(messages => {
        this.messagesThreadSource.next([...messages, message])        
      })
    })

    this.hubConnection.on('UserOnlineInGroup', (user: Member) => {
      //this.onlineUsersSource.next(users);
      this.oneOnlineUserSource.next(user);
      this.toastr.success(user.displayName + ' has join room!')
    })

    this.hubConnection.on('UserOfflineInGroup', (user: Member) => {
      // this.onlineUsers$.pipe(take(1)).subscribe(users => {
      //   this.onlineUsersSource.next([...users.filter(x => x.userName !== user.userName)])
      // })
      this.oneOfflineUserSource.next(user);
      this.toastr.warning(user.displayName + ' has left room!')
    })

    this.hubConnection.on('OnMuteMicro', ({username, mute}) => {
      this.muteCamMicro.Microphone = {username, mute}
    })

    this.hubConnection.on('OnMuteCamera', ({username, mute}) => {
      this.muteCamMicro.Camera = {username, mute}
    })

    this.hubConnection.on('OnShareScreen', (isShareScreen) => {
      this.muteCamMicro.ShareScreen = isShareScreen
    })

    this.hubConnection.on('OnShareScreenLastUser', ({usernameTo, isShare}) => {
      this.muteCamMicro.LastShareScreen = {username: usernameTo, isShare}
    })

    this.hubConnection.on('OnUserIsSharing', currentUsername => {
      this.muteCamMicro.UserIsSharing = currentUsername
    })
  }

  stopHubConnection(){
    if(this.hubConnection){
      this.hubConnection.stop().catch(error => console.log(error));
    }
  }

  async sendMessage(content: string){    
    return this.hubConnection.invoke('SendMessage', {content})
      .catch(error => console.log(error));
  }

  async muteMicroPhone(mute: boolean){    
    return this.hubConnection.invoke('MuteMicro', mute)
      .catch(error => console.log(error));
  }

  async muteCamera(mute: boolean){    
    return this.hubConnection.invoke('MuteCamera', mute)
      .catch(error => console.log(error));
  }

  async shareScreen(roomId: number, isShareScreen: boolean){    
    return this.hubConnection.invoke('ShareScreen', roomId, isShareScreen)
      .catch(error => console.log(error));
  }

  async shareScreenToUser(roomId: number, username: string, isShareScreen: boolean){    
    return this.hubConnection.invoke('ShareScreenToUser', roomId, username, isShareScreen)
      .catch(error => console.log(error));
  }
}
