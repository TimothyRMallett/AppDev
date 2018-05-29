import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-add-user',
  templateUrl: 'add-user.html',
})
export class AddUserPage {

	public username: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewctrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddUserPage');
  }

  addUser(){//Called by add user button to send the username back to then user page
  	this.viewctrl.dismiss({username: this.username});
  }

}
