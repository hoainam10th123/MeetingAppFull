import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Room } from '../models/room';
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  baseUrl = environment.apiUrl;
  
  constructor(private http: HttpClient) { }

  getRooms(pageNumber, pageSize){
    let params = getPaginationHeaders(pageNumber, pageSize);
    return getPaginatedResult<Room[]>(this.baseUrl+'room', params, this.http);
  }

  addRoom(name: string){
    return this.http.post(this.baseUrl + 'room?name=' + name, {});
  }

  editRoom(id: number, name: string){
    return this.http.put(this.baseUrl + 'room?id='+ id +'&editName='+name, {})
  }

  deleteRoom(id: number){
    return this.http.delete(this.baseUrl+'room/'+id);
  }

  deleteAll(){
    return this.http.delete(this.baseUrl+'room/delete-all');
  }
}
