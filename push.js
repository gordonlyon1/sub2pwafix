var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BGsqj86_DGQZMx4GBFFvBnTkzGg5MFE8POaf6lVjcBAravVZHQl_jCU27uiLTmkzUvCo5vi7d3wy1SnTUjuN4Z4",
   "privateKey": "rFz06QHxR-3XJVG3zONFiKiTGTi5-AitP5zjkfxST38"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/e_kChoowLgg:APA91bHEP1_JMEUQlEnalw7v_dAVZJakk3n1xdtyCIfBdwKxbk1EKrVbhzK92ZrOc5XwCMLEY34JIGXaF-bNQmtG9KW4w4ixSNYU7rTPL2FYnHpmRptOzyGo-dsAnM4ckAui9vj2c-t6",
   "keys": {
       "p256dh": "BI5eirTnmShf7GpIfVTu4fLDrinLkytxXmLIdYAExS/QqJqox9WA6xxXg43uYrhhaoqi0+W8Qwe8dUqgwYU8jY4=",
       "auth": "IBfyp/AyAYVn5WeJT8Cj/w=="
   }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
var options = {
   gcmAPIKey: '954374120399',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
).catch(err=>{
    console.log(err);
});