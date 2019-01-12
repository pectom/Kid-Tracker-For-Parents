const admin = require('firebase-admin');

const keys = require('../config/keys');

const defaultApp = admin.initializeApp({
    credential: admin.credential.cert({
        projectId: keys.firebaseProjectId,
        clientEmail: keys.firebaseClientEmail,
        privateKey: keys.firebasePrivateKey.replace(/\\n/g, '\n')
    }),
    databaseURL: keys.fireBaseDB
});

function sendNotification(user,child,rule,area) {
    const registrationToken = user.firebaseToken;
    console.log(user);
    console.log(rule);
    console.log(area);
    const name = child.name[0].toUpperCase()+child.name.substr(1);
    const message = {
            notification: {
                title: name + 'opuścił/a obszar: '+ area.name,
                color: '#f45342'
            }
    };
    admin.messaging().sendToDevice(registrationToken,message)
        .then((response) => {
            // Response is a message ID string.
            console.log('Successfully sent message:', response);
        })
        .catch((error) => {
            console.log('Error sending message:', error);
        });
};
module.exports = {sendNotification};