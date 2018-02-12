module.exports.create = create;

const APIADDRESS = 'test.netpie.io';
const APIPORT = '443';

function create(param) {
  var device_info;
  var firebase;
  var owner_token;

  var httpsclient = require('https');
  var querystring = require('querystring');

  var microgear_notification = function(device, firebase) {
    this.device = device;
    this.firebase = firebase;
    this.mobile_appkey = null;
  }

  microgear_notification.prototype.regisApplication = function(mobile_appkey, callback) {
    let that = this;
    this.firebase.getToken(function(token) {
      var postData = {
        device_uuid: that.device.uuid,
        device_info: JSON.stringify({ "model": that.device.model, "platform": that.device.platform, "version": that.device.version }),
        mobile_appkey: mobile_appkey,
        fcmtoken: token
      }
      var postBody = querystring.stringify(postData);
      var opt = {
        host: APIADDRESS,
        path: '/mobile/regismobileapp',
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
            callback(buff);
            that.mobile_appkey = mobile_appkey;
          }
        });
      });
      rq.on('error', function(e) {});
      rq.write(postBody);
      rq.end();
    },
    function(error) {
      callback(error)
    });
  }

  microgear_notification.prototype.subscribe = function(topic, callback) {
    let that = this;
    if (that.mobile_appkey) {
      this.firebase.getToken(function(token) {
        var postData = {
          device_uuid: that.device.uuid,
          fcmtoken: token,
          mobile_appkey: that.mobile_appkey,
          topic: topic
        }
        var postBody = querystring.stringify(postData);
        var opt = {
          host: APIADDRESS,
          path: '/mobile/subscribe',
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
              callback(buff)
            }
          });
        });
        rq.on('error', function(e) {});
        rq.write(postBody);
        rq.end();
      }, function(error) {
        callback(error)
      });
    } else {
      callback('{"code":401,"message":"mobile application is unregistered"}')
    }
  }

  microgear_notification.prototype.unsubscribe = function(topic, callback) {
    let that = this;
    if (that.mobile_appkey) {
      this.firebase.getToken(function(token) {
        var postData = {
          device_uuid: that.device.uuid,
          fcmtoken: token,
          mobile_appkey: that.mobile_appkey,
          topic: topic
        }
        var postBody = querystring.stringify(postData);
        var opt = {
          host: APIADDRESS,
          path: '/mobile/unsubscribe',
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
              callback(buff)
            }
          });
        });
        rq.on('error', function(e) {});
        rq.write(postBody);
        rq.end();
      }, function(error) {
        callback(error)
      });
    } else {
      callback('{"code":401,"message":"mobile application is unregistered"}')
    }
  }

  microgear_notification.prototype.turnOnNotification = function(callback) {
    let that = this;
    if (that.mobile_appkey) {
      this.firebase.getToken(function(token) {
        var postData = {
          device_uuid: that.device.uuid,
          fcmtoken: token,
          mobile_appkey: that.mobile_appkey,
          status: 'on'
        }
        var postBody = querystring.stringify(postData);
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
              callback(buff)
            }
          });
        });
        rq.on('error', function(e) {});
        rq.write(postBody);
        rq.end();
      }, function(error) {
        callback(error)
      });
    } else {
      callback('{"code":401,"message":"mobile application is unregistered"}')
    }
  }

  microgear_notification.prototype.turnOffNotification = function(callback) {
    let that = this;
    if (that.mobile_appkey) {
      this.firebase.getToken(function(token) {
        var postData = {
          device_uuid: that.device.uuid,
          fcmtoken: token,
          mobile_appkey: that.mobile_appkey,
          status: 'off'
        }
        var postBody = querystring.stringify(postData);
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
              callback(buff)
            }
          });
        });
        rq.on('error', function(e) {

        });
        rq.write(postBody);
        rq.end();
      }, function(error) {
        callback(error)
      });
    } else {
      callback('{"code":401,"message":"mobile application is unregistered"}')
    }
  }

  var microgear_notification_object = new microgear_notification(param.device, param.firebase);
  return microgear_notification_object;
}
