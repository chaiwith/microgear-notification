# microgear-notification

## การติดตั้ง

```
ionic cordova plugin add cordova-plugin-firebase
npm install --save @ionic-native/firebase
ionic cordova plugin add cordova-plugin-device
npm install --save @ionic-native/device

npm install microgear-notification
```

## ตัวอย่างการเรียกใช้
```
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import microgear_notification from 'microgear-notification';
import { Firebase } from '@ionic-native/firebase';
import { Device } from '@ionic-native/device';

@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html'
})
export class NotificationPage {
  microgear_notification: any;
  topic: any;
  result: any;
  constructor(public navCtrl: NavController, private firebase: Firebase, private device: Device) {
    this.microgear_notification = microgear_notification.create({
      device: this.device,
      firebase: this.firebase
    });
    this.microgear_notification.regisApplication("{APPKEY}", function(result) {
      console.log('regisApplication : ' + result);
    });
  }
  ionViewDidEnter() {

  }

  subscribe() {
    this.microgear_notification.subscribe("{TOPIC}",function(result) {
      console.log('subscribe : ' + result);
    });
  }

  unsubscribe() {
    this.microgear_notification.unsubscribe("{TOPIC}",function(result) {
      console.log('unsubscribe : ' + result);
    });
  }

  turnOn(){
    this.microgear_notification.turnOnNotification(function(result) {
      console.log('turnOnNotification : ' + result);
    });
  }
  turnOff(){
    this.microgear_notification.turnOffNotification(function(result) {
      console.log('turnOffNotification : ' + result);
    });
  }

}
```
