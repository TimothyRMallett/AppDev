import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Chart } from 'chart.js';



@IonicPage()
@Component({
  selector: 'page-stats',
  templateUrl: 'stats.html',
})
export class StatsPage {

public users:Array<any>;
public currentUser:string;
public currentUserData:any;
public chartLabels = [];


  @ViewChild('barChartCanvas')barCanvas;
  barChart: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
    
  }

  ionViewDidLoad() {

    this.storage.get("users").then((val)=>{
      this.users = JSON.parse(val);
      this.storage.get("currentUser").then((val)=>{
        this.currentUser = val;
        let userIndex = this.findUserIndex(this.currentUser);
        this.currentUserData = this.users[userIndex];
        this.createLabels(this.currentUserData.correctNotes.length);
        this.barChart = new Chart(this.barCanvas.nativeElement, {
          type: 'bar',
          data: {
            labels: this.chartLabels,
            datasets:[{
              label: 'Correct Notes',
              data: this.currentUserData.correctNotes,
              backgroundColor: [
                //'rgba(255, 17, 100, 0.3)'
               ]
            },
            {
              label: 'Incorrect Notes',
              data: this.currentUserData.incorrectNotes,
              backgroundColor: [
                //'rgba(255, 17, 100, 0.3)'
               ]
            }]
           }
          });
      });
    });


  }

  findUserIndex(user:string):number{ //finds index in array of current user for display their results
    let index = this.users.length;
    for(let i = 0; i < index; i++){
      if(this.users[i].username === user){
        return i;
      }
    }
    return -1;
  }

  createLabels(arrLength:number){//creates the lables for the chart to scale it no matter how many time trial attempts
    for(let i = 1; i <= arrLength; i++){
      this.chartLabels.push(i.toString());
    }
    console.log(JSON.stringify(this.chartLabels));
  }

}
