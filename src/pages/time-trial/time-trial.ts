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
  public setTime = 3;
  public seconds = this.setTime;
  public timeLeft = "30";
  public timer:any;
  public currentUser:string;
  public users:Array<any>;



  constructor(public navCtrl: NavController, public navParams: NavParams, public drawServ: PianoDrawProvider, private storage: Storage) {
    this.storage.get("currentUser").then((val)=>{
      this.currentUser = val;
    });
    console.log(this.currentUser + "is the current user!");
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

  incrementCorrect(){ //add one to correct clicks if time has started
    if(this.timeStarted){
      this.correctClicksNum++;
      this.correctClicks = this.correctClicksNum.toString();
    }
  }

  incrementIncorrect(){ //add one to incorrect clicks if time has started
    if(this.timeStarted){
      this.incorrectClicksNum++;
      this.incorrectClicks = this.incorrectClicksNum.toString();
    }
  }

  resetClicks(){ //sets clicks to zero and displays them as so
    this.incorrectClicksNum = 0;
    this.incorrectClicks = this.incorrectClicksNum.toString();
    this.correctClicksNum = 0;
    this.correctClicks = this.correctClicksNum.toString();
  }

//When the time trial is done this is called to reset everything to original state so a new time trial can start
//This is the only function called at the end of the timer and requires all jobs to be done inside it
  timeTrialDone(){
    this.drawServ.redrawCanvas();
    this.ctx.drawImage(this.drawServ.canvas, 0, 0);
    console.log("whydis");
    this.timeStarted = false;
    this.storeResults();
    this.resetClicks();
    this.seconds = this.setTime;
    this.drawServ.clearCanvas();
    this.drawServ.drawGrandStaff();
    this.ctx.drawImage(this.drawServ.canvas, 0, 0);
  }

  storeResults(){//stores results of time trial in memory
    console.log(JSON.stringify(this.users));
    let currentUserIndex = this.findUserIndex(this.currentUser);
    console.log(currentUserIndex + JSON.stringify(this.users[currentUserIndex]));
    if(currentUserIndex < 0){
      console.log("failed to find user!");
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

  findUserIndex(user:string):number{//Finds the index in the array of the current user for storing the results
    let length = this.users.length;
    console.log(length);
    for(let i = 0; i < length; i++){
      if(this.users[i].username === user){
        return i;
      }
    }
    return -1;
  }

  startTimer(){//starts the timer and handles the countdown and display of clicks and resets when done
    if(this.timeStarted){}
    else{
      this.drawServ.redrawCanvas();
      this.ctx.clearRect(0,0, this.canvasElement.nativeElement.width, this.canvasElement.nativeElement.height);
      this.ctx.drawImage(this.drawServ.canvas, 0, 0);
      this.clef = Math.floor(Math.random() * 2);
      this.timeStarted = true;
      this.drawServ.drawRandomNote(this.clef);
      //this.drawServ.clearCanvas();
      this.ctx.drawImage(this.drawServ.canvas, 0, 0);
      let timerRunning = true;
      let self = this;
      let timer = setInterval(function(){
        self.seconds--;
        if(self.seconds <= 0){
          self.ctx.clearRect(0,0, self.canvasElement.nativeElement.width, self.canvasElement.nativeElement.height);
          self.timeTrialDone();
          clearInterval(timer);
        }
      },1000);
    }
  }

}