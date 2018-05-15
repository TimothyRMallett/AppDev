import { Component, ElementRef, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PianoDrawProvider } from '../../providers/piano-draw/piano-draw';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-time-trial',
  templateUrl: 'time-trial.html',
})
export class TimeTrialPage {
@ViewChild('canvas') canvasElement: ElementRef;
  private ctx: any;
  private clef: number;
  public correctClicks = "0"; public correctClicksNum = 0;
  public incorrectClicks = "0"; public incorrectClicksNum = 0;
  public timeStarted = false;
  public intervalId = 0;
  public seconds = 4;
  public timeLeft = "30";
  public timer:any;
  public currentUser:string;
  public users:Array<any>;



  constructor(public navCtrl: NavController, public navParams: NavParams, public drawServ: PianoDrawProvider, private storage: Storage) {
    this.storage.get("currentUser").then((val)=>{
      this.currentUser = val;
    });
    console.log(this.currentUser);
  }

  ionViewDidLoad() {

    this.storage.get("currentUser").then((val)=>{
      this.currentUser = val;
      console.log(this.currentUser);
    });
    this.clef = Math.floor(Math.random() * 2);
    this.drawServ.outerPos = true;
  	this.canvasElement.nativeElement.width = 320;
    this.canvasElement.nativeElement.height = 260;
    this.ctx = this.canvasElement.nativeElement.getContext('2d');
    this.drawServ.clearCanvas();
    this.drawServ.drawGrandStaff();
    this.ctx.drawImage(this.drawServ.canvas, 0, 0);
    this.storage.get("users").then((val)=>{
      this.users = JSON.parse(val);
    });

  }

  drawRandIfCorrect(letter:number){//draws new random note on bass or treble clef
    this.canvasElement.nativeElement.width = 320;
    this.clef = Math.floor(Math.random() * 2); 
    if(this.clef == 0){
    	if(this.drawServ.drawNewTrebleNote(letter) === 1){
        this.incrementCorrect();
      }
      else{
        this.incrementIncorrect();
      }
    }
    else if(this.clef == 1){
    	if(this.drawServ.drawNewBassNote(letter)){
        this.incrementCorrect();
      }
      else{
        this.incrementIncorrect();
      }
	}
    this.ctx.drawImage(this.drawServ.canvas, 0, 0);
  }

  popPage(){ //pops page
    this.navCtrl.pop();
  }

  incrementCorrect(){
    this.correctClicksNum++;
    this.correctClicks = this.correctClicksNum.toString();
  }

  incrementIncorrect(){
    this.incorrectClicksNum++;
    this.incorrectClicks = this.incorrectClicksNum.toString();
  }

  storeResults(){
    let currentUserIndex = this.findUserIndex(this.currentUser);
    if(currentUserIndex < 0){
      alert("failed to find user!");
    }
    else if(this.users[currentUserIndex].correctNotes[0] < 0){
      this.users[currentUserIndex].correctNotes[0] = this.correctClicksNum;
      this.users[currentUserIndex].incorrectNotes[0] = this.incorrectClicksNum;
      this.storage.set("users", JSON.stringify(this.users));
    }
    else{
      this.users[currentUserIndex].correctNotes.push(this.correctClicksNum);
      this.users[currentUserIndex].incorrectNotes.push(this.incorrectClicksNum);
      this.storage.set("users", JSON.stringify(this.users));
    }
    console.log(JSON.stringify(this.users[currentUserIndex]));
  }

  findUserIndex(user:string):number{
    let index = this.users.length;
    for(let i = 0; i < index; i++){
      if(this.users[i].username === user){
        return i;
      }
    }
    return -1;

  }

 /* displayTimeChange(seconds:number){
    console.log("timer working");
    seconds--;
    _this.timeLeft = this.seconds.toString();
    if(_this.seconds <= 0){
        clearInterval(_this.timer);
        _this.timeStarted = false;
      }
  }*/

  resetTimer(){
    document.getElementById('timeLeft').innerHTML = "30";
    this.timeStarted = false;
    console.log("worked");
  }

  startTimer(timeLength:number){
    this.timeStarted = true;
    this.drawServ.drawRandomNote(this.clef);
    this.ctx.drawImage(this.drawServ.canvas, 0, 0);
    let secondsLeft = timeLength;
    let timerRunning = true;
    let timer = setInterval(function(){
      secondsLeft--;
      document.getElementById('timeLeft').innerHTML = secondsLeft.toString();
      if(secondsLeft <= 0){
        timerRunning = false;
        clearInterval(timer);
        document.getElementById('timeLeft').innerHTML = "30";
      }
    },1000);
  }


}
/*
clearTimer() { clearInterval(this.intervalId); }

  //ngOnInit()    { this.start(); }
  ngOnDestroy() { this.clearTimer(); }

  start(){ 
    if(this.timeStarted){
      
    }
    else{
      this.timeStarted = true;
      this.drawServ.drawRandomNote(this.clef);
      this.ctx.drawImage(this.drawServ.canvas, 0, 0);
      this.countDown(); 
    }
  }
  stop()  {
    this.clearTimer();
  }

  private countDown() : number {
    this.clearTimer();
    this.intervalId = window.setInterval(() => {
      this.seconds--;
      this.timeLeft = this.seconds.toString();
      if (this.seconds <= 0) {
        this.seconds = 30;
        stop();
        return 1;
      }
    }, 1000);
    return 0;
  }*/


