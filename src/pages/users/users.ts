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
  imgFile: any;

	public users: Array<any>;
  public username: string;
  public corArr:Array<number> = [-1];
  public incorArr:Array<number> = [-1];
  public currentUser: string;
  public reminder = "";
  public numberInput = 0;

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

  changeUser(){
  	this.viewctrl.dismiss({currentUser:this.currentUser, reminder:this.reminder, numberInput: this.numberInput});
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

  editUsername(index:number){

  }

  setCurrentUser(index:number){
    this.storage.set("currentUser",this.users[index].username);
    this.currentUser = this.users[index].username;
    console.log(this.currentUser);
    console.log(this.numberInput);
  }

  imageSelected(files){
    
    let fileReader = new FileReader();

    fileReader.onload = e => {
      this.imgFile = fileReader.result;
      this.storage.set("image", this.imgFile);
    }

    fileReader.readAsDataURL(files[0]);

  }

}
