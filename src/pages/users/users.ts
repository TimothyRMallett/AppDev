import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { AddUserPage } from '../add-user/add-user';


@IonicPage()
@Component({
  selector: 'page-users',
  templateUrl: 'users.html',
})
export class UsersPage {

  @ViewChild('fileInput')fileInput;

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
    this.storage.get("currentUser").then((val)=>{
      this.currentUser = val;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UsersPage');
  }

  changeUser(){ //called by back button to go back to home screen and return inputs
  	this.viewctrl.dismiss({currentUser:this.currentUser});
  }

  showAddUserModal(){//Displays the add user modal to add a new user and stores data returned and adds to list
    let usersModal = this.modCtrl.create(AddUserPage);
      usersModal.onDidDismiss(data => { 
        this.username = data.username;
        this.users.push({username:this.username, correctNotes:this.corArr, incorrectNotes:this.incorArr});
        console.log(JSON.stringify(this.users));
        this.storage.set("users", JSON.stringify(this.users));
      });
      usersModal.present();
  }

  deleteUser(index:number){ //Deletes user from list and makes checks to avoid errors
    if(this.users.length > 1){
      if(confirm("Delete " + this.users[index].username + "?")){
        if(this.users[index].username === this.currentUser){
          this.users.splice(index, 1);
          this.storage.set("users", JSON.stringify(this.users));
          this.currentUser = this.users[0].username;
          this.setCurrentUser(0);
        }
        else{
          this.users.splice(index, 1);
          this.storage.set("users", JSON.stringify(this.users));
        }
      }
    }
    else{
      alert("Cannot Delete Last User");
    }
  }

  editUsername(index:number){//not used or implemented

  }

  setCurrentUser(index:number){//sets the current
    this.storage.set("currentUser",this.users[index].username);
    this.currentUser = this.users[index].username;
    console.log(this.currentUser);
  }

/*  imageSelected(files){//allows user to select image from device when clicked and displays it
    
    let fileReader = new FileReader();

    fileReader.onload = e => {
      this.imgFile = fileReader.result;
      this.storage.set("image", this.imgFile);
    }

    fileReader.readAsDataURL(files[0]);

  }
*/

}
