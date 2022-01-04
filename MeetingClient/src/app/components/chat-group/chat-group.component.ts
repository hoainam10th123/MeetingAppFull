import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Message } from 'src/app/models/message';
import { ChatHubService } from 'src/app/_services/chat-hub.service';

@Component({
  selector: 'app-chat-group',
  templateUrl: './chat-group.component.html',
  styleUrls: ['./chat-group.component.css']
})
export class ChatGroupComponent implements OnInit {
  
  @Input() messages: Message[];
  
  constructor(private chatHub: ChatHubService) { }

  ngOnInit(): void {
  }

  

}
