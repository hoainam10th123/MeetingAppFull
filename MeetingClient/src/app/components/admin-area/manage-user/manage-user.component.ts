import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Member } from 'src/app/models/member';
import { Pagination } from 'src/app/models/pagination';
import { ConfigService } from 'src/app/_services/ConfigService';
import { MemberService } from 'src/app/_services/member.service';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent implements OnInit {

  users: Member[];
  pageNumber = 1;
  pageSize = 5;
  maxSize = 5;
  pagination: Pagination;
  searchForm: FormGroup;

  constructor(private memberService: MemberService, private config: ConfigService) { 
    this.pageSize = this.config.pageSize
  }

  ngOnInit(): void {
    this.khoiTaoForm()
    this.loadMembers()    
  }

  loadMembers(){
    this.memberService.getAllMembers(this.pageNumber, this.pageSize).subscribe(res=>{
      this.users = res.result;
      this.pagination = res.pagination;
    })
  }

  //tim chinh xac username
  search(){
    this.memberService.getMember(this.searchForm.value.userName).subscribe(val=>{
      if(val){
        this.users = [];
        this.users.push(val);
      }
    })
  }

  pageChanged(event: any) {
    this.pageNumber = event.page;
    this.loadMembers()
  }

  lockedUser(event){
    this.memberService.updateLocekd(event.username).subscribe(()=>{
      console.log("update locked ok");
    })
  }

  khoiTaoForm() {
    this.searchForm = new FormGroup({
      userName: new FormControl('', [Validators.required])            
    })
  }
}
