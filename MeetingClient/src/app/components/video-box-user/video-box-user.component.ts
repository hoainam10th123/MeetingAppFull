import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { VideoElement } from 'src/app/models/video-element';
import { MuteCamMicService } from 'src/app/_services/mute-cam-mic.service';

@Component({
  selector: 'app-video-box-user',
  templateUrl: './video-box-user.component.html',
  styleUrls: ['./video-box-user.component.css']
})
export class VideoBoxUserComponent implements OnInit, OnDestroy {
  @Input() userVideo: VideoElement;

  enableMicro = true;
  enableCamera = true;
  subscriptions = new Subscription();

  constructor(private muteService: MuteCamMicService) { }

  ngOnInit(): void {
    //Neu ko lay dc danh sach thiet bi thi mute het
    this.enableMicro = this.userVideo.srcObject.getAudioTracks()[0]? this.userVideo.srcObject.getAudioTracks()[0].enabled : false
    this.enableCamera = this.userVideo.srcObject.getVideoTracks()[0] ? this.userVideo.srcObject.getVideoTracks()[0].enabled : false

    this.subscriptions.add(this.muteService.muteCamera$.subscribe(data=>{
      if(this.userVideo.user.userName === data.username){
        this.enableCamera = data.mute
      }
    }))

    this.subscriptions.add(this.muteService.muteMicro$.subscribe(data=>{
      if(this.userVideo.user.userName === data.username){
        this.enableMicro = data.mute
      }
    }))
  }

  onLoadedMetadata(event: Event) {
    (event.target as HTMLVideoElement).play();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
