import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { TutorialPage } from '../tutorial/tutorial';
import { TreblePage } from '../treble/treble';
import { BassPage } from '../bass/bass';
import { GrandStaffPage } from '../grand-staff/grand-staff';
import { TimeTrialPage } from '../time-trial/time-trial';
import { StatsPage } from '../stats/stats';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	private trebleClefImg = new Image(); private bassClefImg = new Image(); private quarterNoteImg = new Image();

  constructor(public navCtrl: NavController) {
  	this.trebleClefImg.src = '../../assets/imgs/treble-clef.png'; 
  	this.bassClefImg.src = '../../assets/imgs/bass-clef.png';
  	this.quarterNoteImg.src = '../../assets/imgs/quarter-note.png';
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

}
