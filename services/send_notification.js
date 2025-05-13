const admin = require('firebase-admin');

async function sendNotification(title, body, fcm, data = {}) {
    const payload = {
        notification: {
          title: title,
          body: body,
        },
        data: data,
        token: fcm,
      };

      const response = await admin.messaging().send(payload);
      console.log(response);
}

module.exports = sendNotification;

