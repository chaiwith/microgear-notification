module.exports.create = create;

const APIADDRESS = 'test.netpie.io';
const APIPORT = '443';

function create(param) {
  var firebase_token;
  var device_info;
  var firebase;
  var owner_token;

  var httpsclient = require('https');
  var querystring = require('querystring');

  var microgear_notification = function(device, firebase) {
    this.device = device;
    this.firebase = firebase;
  }

  microgear_notification.prototype.regisApplication = function(appid, key, secret, callback) {

    this.firebase.getToken(function(token) {
      this.firebase_token = token;
      var postData = {
        client_id: 'third-party',
        device_uuid: this.device.uuid,
        device_info: JSON.stringify({ "model": this.device.model, "platform": this.device.platform, "version": this.device.version }),
        appid: appid,
        key: key,
        secret: secret,
        fcmtoken: token
      }
      var postBody = querystring.stringify(postData);
      console.log(postBody)
      var opt = {
        host: APIADDRESS,
        path: '/mobile/regissubscribe',
        port: APIPORT,
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': postBody.length
        }
      };
      var rq = httpsclient.request(opt, function(res) {
        var buff = '';
        res.on('data', function(chunk) {
          buff += chunk;
        });
        res.on('end', function() {
          if (buff) {
            console.log(buff)
            callback(buff)
          }
        });
      });
      rq.on('error', function(e) {
      });
      rq.write(postBody);
      rq.end();
    }, function(error) {
      console.log(error)
      callback(error)
    });
  }

  microgear_notification.prototype.turnOnNotification = function(appid, key, secret, callback) {

    this.firebase.getToken(function(token) {
      console.log(token)
      this.firebase_token = token;
      var postData = {
        appid: appid,
        key: key,
        secret: secret,
        fcmtoken: token,
        status:'on'
      }
      var postBody = querystring.stringify(postData);
      console.log(postBody)
      var opt = {
        host: APIADDRESS,
        path: '/mobile/noticestatustp',
        port: APIPORT,
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': postBody.length
        }
      };
      var rq = httpsclient.request(opt, function(res) {
        var buff = '';
        res.on('data', function(chunk) {
          buff += chunk;
        });
        res.on('end', function() {
          if (buff) {
            console.log(buff)
            callback(buff)
          }
        });
      });
      rq.on('error', function(e) {
      });
      rq.write(postBody);
      rq.end();
    }, function(error) {
      console.log(error)
      callback(error)
    });
  }

  microgear_notification.prototype.turnOffNotification = function(appid, key, secret, callback) {

    this.firebase.getToken(function(token) {
      console.log(token)
      this.firebase_token = token;
      var postData = {
        appid: appid,
        key: key,
        secret: secret,
        fcmtoken: token,
        status:'off'
      }
      var postBody = querystring.stringify(postData);
      console.log(postBody)
      var opt = {
        host: APIADDRESS,
        path: '/mobile/noticestatustp',
        port: APIPORT,
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': postBody.length
        }
      };
      var rq = httpsclient.request(opt, function(res) {
        var buff = '';
        res.on('data', function(chunk) {
          buff += chunk;
        });
        res.on('end', function() {
          if (buff) {
            console.log(buff)
            callback(buff)
          }
        });
      });
      rq.on('error', function(e) {

      });
      rq.write(postBody);
      rq.end();
    }, function(error) {
      console.log(error)
      callback(error)
    });
  }


  var microgear_notification_object = new microgear_notification(param.device, param.firebase);
  return microgear_notification_object;
}
