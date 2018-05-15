import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { AddUserPage } from '../add-user/add-user';


@IonicPage()
@Component({
  selector: 'page-users',
  templateUrl: 'users.html',
})
export class UsersPage {

	public users: Array<any>;
  public username: string;
  public corArr:Array<number> = [-1];
  public incorArr:Array<number> = [-1];
  public currentUser: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewctrl: ViewController,public modCtrl: ModalController, private storage: Storage) {
  	this.storage.get("users").then((val)=>{
  		this.users = JSON.parse(val);
  		console.log(val);
  	});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UsersPage');
  }

  changeUser(){
  	this.viewctrl.dismiss({currentUser:this.currentUser});
  }

  showAddUserModal(){
    let usersModal = this.modCtrl.create(AddUserPage);
      usersModal.onDidDismiss(data => { 
        this.username = data.username;
        this.users.push({username:this.username, correctNotes:this.corArr, incorrectNotes:this.incorArr});
        console.log(JSON.stringify(this.users));
        this.storage.set("users", JSON.stringify(this.users));
      });
      usersModal.present();
  }

  deleteUser(index:number){
      if(confirm("Delete " + this.users[index].username + "?")){
          this.users.splice(index, 1);
          this.storage.set("users", JSON.stringify(this.users));
    }
  }

  setCurrentUser(index:number){
      if(confirm("Change to " + this.users[index].username + "?")){
          this.storage.set("currentUser",this.users[index].username);
          this.currentUser = this.users[index].username;
          console.log(this.currentUser);
    }
  }

}
