import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Room } from 'src/app/models/room';
import { RoomService } from 'src/app/_services/room.service';
import { UtilityStreamService } from 'src/app/_services/utility-stream.service';

@Component({
  selector: 'app-add-room-modal',
  templateUrl: './add-room-modal.component.html',
  styleUrls: ['./add-room-modal.component.css']
})
export class AddRoomModalComponent implements OnInit {
  addRoomForm: FormGroup;

  title?: string;
  list: any[] = [];

  constructor(public bsModalRef: BsModalRef, private roomService: RoomService, private utility: UtilityStreamService) {}

  ngOnInit(): void {
    this.khoiTaoForm();
  }

  khoiTaoForm() {
    this.addRoomForm = new FormGroup({
      roomName: new FormControl('', [Validators.required, Validators.maxLength(100)])      
    })
  }

  save(){
    this.roomService.addRoom(this.addRoomForm.value.roomName).subscribe((res: Room)=>{
      this.utility.Room = res;//add data in room-meeting component
      this.bsModalRef.hide();
    })
  }
}
