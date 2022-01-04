import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Member } from 'src/app/models/member';

@Component({
  selector: 'app-clocked-button',
  templateUrl: './clocked-button.component.html',
  styleUrls: ['./clocked-button.component.css']
})
export class ClockedButtonComponent implements OnInit {

  @Input() member: Member;
  @Output() lockedUserEvent = new EventEmitter();
  clocked: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.clocked = this.member.locked;
  }

  clockedUser(){
    this.clocked = !this.clocked;
    this.lockedUserEvent.emit({username: this.member.userName, locked: this.clocked})
  }
}
