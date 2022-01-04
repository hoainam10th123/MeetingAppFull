import { Injectable } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import { Room } from '../models/room';
import { RoomCount } from '../models/room-count';

@Injectable({
  providedIn: 'root'
})
export class UtilityStreamService {
  private roomSource = new ReplaySubject<Room>(1);
  room$ = this.roomSource.asObservable();

  private roomEditSource = new ReplaySubject<Room>(1);
  roomEdit$ = this.roomEditSource.asObservable();

  private roomCountSource = new Subject<RoomCount>();
  roomCount$ = this.roomCountSource.asObservable();

  private kickedOutUserSource = new Subject<boolean>();
  kickedOutUser$ = this.kickedOutUserSource.asObservable();

  constructor() { }

  set Room(value: Room) {
    this.roomSource.next(value);
  }

  set RoomEdit(value: Room) {
    this.roomEditSource.next(value);
  }

  set RoomCount(value: RoomCount) {
    this.roomCountSource.next(value);
  }

  set KickedOutUser(value: boolean) {
    this.kickedOutUserSource.next(value);
  }
}
