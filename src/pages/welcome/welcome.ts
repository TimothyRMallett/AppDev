import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { HomePage } from '../home/home';



@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

	private inputName: string;
	private userName: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }

  submitUserName(){// Sends username to home to be stored and set as current user
  	this.userName = this.inputName;
  	console.log(this.userName);
  	this.viewCtrl.dismiss({userName: this.userName});
  }

}
