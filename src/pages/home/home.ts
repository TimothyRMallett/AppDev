import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ModalController, NavParams } from 'ionic-angular';
import { PianoDrawProvider } from '../../providers/piano-draw/piano-draw';


import { TutorialPage } from '../tutorial/tutorial';
import { TreblePage } from '../treble/treble';
import { BassPage } from '../bass/bass';
import { GrandStaffPage } from '../grand-staff/grand-staff';
import { TimeTrialPage } from '../time-trial/time-trial';
import { StatsPage } from '../stats/stats';
import { WelcomePage } from '../welcome/welcome';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	//private trebleClefImg = new Image(); private bassClefImg = new Image(); private quarterNoteImg = new Image();
	public userName: string;
	@ViewChild('canvas') canvasElement: ElementRef;
  	private ctx: any;

  	constructor(public navCtrl: NavController, public modCtrl: ModalController, public navParams: NavParams, public drawServ: PianoDrawProvider) {
  		//this.showUserModal();
  		//this.userName = navParams.get('userName');
	  	//this.trebleClefImg.src = '../../assets/imgs/treble-clef.png'; 
	  	//this.bassClefImg.src = '../../assets/imgs/bass-clef.png';
	  	//this.quarterNoteImg.src = '../../assets/imgs/quarter-note.png';
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
  			console.log(this.userName);
  		})
  		userModal.present();
  	}



}
