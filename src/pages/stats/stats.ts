import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-stats',
  templateUrl: 'stats.html',
})
export class StatsPage {

	public timeTrialData:Array<any> = [
  {data: [10, 15, 33, 37, 42, 51, 60, 61, 63, 57], label: 'Correct Notes'},
  {data: [26, 23, 14, 17, 13, 11, 6, 8, 11, 4, 5], label: 'Incorrect Notes'}
];
public lineChartLabels:Array<any> = ['1', '2', '3', '4', '5', '6', '7', '8','9','10'];

public lineChartType:string = 'line';


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StatsPage');
  }

}
