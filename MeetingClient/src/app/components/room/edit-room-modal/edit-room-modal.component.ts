import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Room } from 'src/app/models/room';
import { RoomService } from 'src/app/_services/room.service';
import { UtilityStreamService } from 'src/app/_services/utility-stream.service';

@Component({
  selector: 'app-edit-room-modal',
  templateUrl: './edit-room-modal.component.html',
  styleUrls: ['./edit-room-modal.component.css']
})
export class EditRoomModalComponent implements OnInit {
  addRoomForm: UntypedFormGroup;
  room: Room;
  title: string;

  constructor(public bsModalRef: BsModalRef, 
    private roomService: RoomService, 
    private toastr: ToastrService,
    private utility: UtilityStreamService) { }

  ngOnInit(): void {
    this.khoiTaoForm();
  }

  khoiTaoForm() {
    this.addRoomForm = new UntypedFormGroup({
      roomName: new UntypedFormControl(this.room.roomName, [Validators.required, Validators.maxLength(100)])      
    })
  }

  save(){
    this.roomService.editRoom(this.room.roomId, this.addRoomForm.value.roomName).subscribe((res: Room)=>{
      if(res){
        this.utility.RoomEdit = res;//edit data in room-meeting component
      }else{
        this.toastr.warning('No change')
      }
      this.bsModalRef.hide();
    })
  }
}
