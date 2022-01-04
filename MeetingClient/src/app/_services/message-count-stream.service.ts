import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageCountStreamService {
  activeTabChat = false;
  private messageCount = 0;

  private messageCountSource = new ReplaySubject<number>(1);
  messageCount$ = this.messageCountSource.asObservable();

  private activeTabChatSource = new ReplaySubject<boolean>(1);
  activeTabChat$ = this.activeTabChatSource.asObservable();

  constructor() { }

  set MessageCount(value: number) {
    this.messageCount = value;
    this.messageCountSource.next(value);
  }

  get MessageCount(){
    return this.messageCount;
  }

  set ActiveTabChat(value: boolean) {
    this.activeTabChat = value;
    this.activeTabChatSource.next(value);
  }
}
