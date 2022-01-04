import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { Pagination } from 'src/app/models/pagination';
import { Room } from 'src/app/models/room';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/_services/account.service';
import { ConfigService } from 'src/app/_services/ConfigService';
import { ConfirmService } from 'src/app/_services/confirm.service';
import { RoomService } from 'src/app/_services/room.service';
import { UtilityStreamService } from 'src/app/_services/utility-stream.service';
import { AddRoomModalComponent } from '../add-room-modal/add-room-modal.component';
import { EditRoomModalComponent } from '../edit-room-modal/edit-room-modal.component';

@Component({
  selector: 'app-room-meeting',
  templateUrl: './room-meeting.component.html',
  styleUrls: ['./room-meeting.component.css']
})
export class RoomMeetingComponent implements OnInit {
  bsModalRef?: BsModalRef;
  listRoom: Room[] = [];
  pageNumber = 1;
  pageSize = 5;
  maxSize = 5;
  pagination: Pagination;
  data: any;//ngModel select html
  roomGroupBy: any[] = [];
  currentUser: User;

  constructor(private modalService: BsModalService,
    private roomService: RoomService,
    private accountService: AccountService,
    private utility: UtilityStreamService,
    private router: Router,
    private config: ConfigService,
    private toastr: ToastrService,
    private confirmService: ConfirmService) {
      this.pageSize = this.config.pageSize
      this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.currentUser = user)
    }

  ngOnInit(): void {
    this.loadRooms();
    //add new room
    this.utility.room$.subscribe(room => {
      if (this.listRoom) {
        this.listRoom.push(room)
      }
    })

    //edit room
    this.utility.roomEdit$.subscribe(data => {
      if (this.listRoom) {
        let room = this.listRoom.find(x => x.roomId === data.roomId);
        if(room)
          room.roomName = data.roomName;
      }
    })

    this.utility.roomCount$.subscribe(data=>{
      if(this.listRoom){
        let room = this.listRoom.find(r=>r.roomId === data.roomId)
        if(room)
          room.countMember = data.countMember
      }
    })

    //call from signalR
    this.utility.kickedOutUser$.subscribe(val=>{
      this.accountService.logout()
      this.toastr.info('You have been locked by admin')
      this.router.navigateByUrl('/login')
    })
  }

  dataGroupByUser: Map<any, any>;

  loadRooms() {
    this.roomGroupBy = [];
    this.roomService.getRooms(this.pageNumber, this.pageSize).subscribe(res => {
      this.listRoom = res.result;
      this.pagination = res.pagination;
      //group by de hien thi len select html
      const grouped = this.groupBy(this.listRoom, (room: Room) => room.userName);
      this.dataGroupByUser = grouped;
      //load data into select html
      grouped.forEach((value: Room[], key: string) => {
        //console.log(key, value);
        //cac phan tu sau khi group by la giong nhau chung 1 nhom
        let obj = {userName: key, displayName: value[0].displayName}
        this.roomGroupBy.push(obj)
      });
    })
  }

  openAddRoomModalWithComponent() {
    const initialState: ModalOptions = {
      initialState: {
        list: [
          'Open a modal with component',
          'Pass your data',
          'Do something else',
          '...'
        ],
        title: 'Modal with component'
      }
    };
    this.bsModalRef = this.modalService.show(AddRoomModalComponent, initialState);
  }

  openEditRoomModalWithComponent(data: Room) {
    const initialState: ModalOptions = {
      initialState: {
        title: 'Modal with component',
        room: data
      }
    };
    this.bsModalRef = this.modalService.show(EditRoomModalComponent, initialState);
  }

  deleteRoomById(id: number) {
    this.confirmService.confirm().subscribe(value => {
      if (value) {//true
        this.roomService.deleteRoom(id).subscribe(res => {
          if (res) {
            this.loadRooms();
          }
        })
      }
    })
  }

  deleteAll(){
    this.confirmService.confirm().subscribe(val=>{
      if(val){//true
        this.roomService.deleteAll().subscribe(()=>{
          this.loadRooms();
        })
      }
    })
  }

  pageChanged(event: any) {
    this.pageNumber = event.page;
    this.loadRooms();
  }

  //event select html
  ngChanged(e) {    
    //console.log(e)
    this.listRoom = this.dataGroupByUser.get(e.userName)//userName la key
  }

  joinRoom(roomId: number){
    this.router.navigate(['/home', roomId])
  }

  private groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
      const key = keyGetter(item);
      const collection = map.get(key);
      if (!collection) {
        map.set(key, [item]);
      } else {
        collection.push(item);
      }
    });
    return map;
  }
}
