import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Member } from '../models/member';
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllMembers(pageNumber, pageSize){
    let params = getPaginationHeaders(pageNumber, pageSize);
    return getPaginatedResult<Member[]>(this.baseUrl+'member', params, this.http);
  }

  //tim chinh xac username
  getMember(username: string){
    return this.http.get<Member>(this.baseUrl+'member/'+username);
  }

  updateLocekd(username: string){
    return this.http.put(this.baseUrl+'member/'+username, {});
  }
}
