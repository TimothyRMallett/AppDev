import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ModalController, NavParams } from 'ionic-angular';
import { PianoDrawProvider } from '../../providers/piano-draw/piano-draw';
import { Storage } from '@ionic/storage';


import { TutorialPage } from '../tutorial/tutorial';
import { TreblePage } from '../treble/treble';
import { BassPage } from '../bass/bass';
import { GrandStaffPage } from '../grand-staff/grand-staff';
import { TimeTrialPage } from '../time-trial/time-trial';
import { StatsPage } from '../stats/stats';
import { WelcomePage } from '../welcome/welcome';
import { UsersPage } from '../users/users';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	//private trebleClefImg = new Image(); private bassClefImg = new Image(); private quarterNoteImg = new Image();
	public userName: string;
	public usersFound = 0;
	public users:Array<any>;
	public correctNotes:Array<number> = [-1];
	public incorrectNotes:Array<number> = [-1];
	@ViewChild('canvas') canvasElement: ElementRef;
  	private ctx: any;

  	constructor(public navCtrl: NavController, public modCtrl: ModalController, public navParams: NavParams, public drawServ: PianoDrawProvider, private storage: Storage) {

  		this.storage.get("users").then((val)=>{
  			if(val === null){
  				this.showUserModal();
  			}
  			else{
  				this.users = JSON.parse(val);
  			}
  		});
  		this.storage.get("currentUser").then((val)=>{
  			this.userName = val;
  		});
  	}

  	ionViewDidLoad(){
  		
  		console.log(this.userName);
  		this.drawServ.drawImagesForPreLoad();
  	}

	pushPage(page:string){ //pushes the page that the user selects
		if(page === "Tutorial"){
			this.navCtrl.push(TutorialPage);
		}
		else if(page === "Treble"){
			this.navCtrl.push(TreblePage);
		}
		else if(page === "Bass"){
			this.navCtrl.push(BassPage);
		}
		else if(page === "Grand"){
			this.navCtrl.push(GrandStaffPage);
		}
		else if(page === "Time"){
			this.navCtrl.push(TimeTrialPage);
		}
		else if(page === "Stats"){
			this.navCtrl.push(StatsPage);
		}
	}

	showUserModal(){
  		let userModal = this.modCtrl.create(WelcomePage);
  		userModal.onDidDismiss(data => {
  			this.userName = data.userName;
  			//this.usersFound++;
  			//this.storage.set("userFound", this.usersFound);
  			//this.users[this.usersFound] = {username:data.userName,}
  			this.storage.get("users").then((val)=>{
  				if(val === null){
  					let correct = JSON.stringify(this.correctNotes);
  					let incorrect = JSON.stringify(this.incorrectNotes);
  					let usersArr = [{username:data.userName, correctNotes:correct, incorrectNotes:incorrect}];
        			this.storage.set("users", JSON.stringify(usersArr));
        		}
      		});
      		this.storage.get("currentUser").then((val)=>{
  				if(val === null){
        			this.storage.set("currentUser", data.userName);
        		}
      		});
  			console.log(this.userName);
  		})
  		userModal.present();
  	}

  	showChangeUserModal(index:number){
  		let usersModal = this.modCtrl.create(UsersPage);
  		usersModal.onDidDismiss(data => {
          this.userName = data.currentUser;
  		});
  		usersModal.present();
  		/*
  		this.storage.get("users").then((val)=>{
  			let usersArr = JSON.parse(val);
  			this.userName = usersArr[index].username;
  			this.storage.set("currentUser", usersArr[index].username);
  		});*/
  	}

}
