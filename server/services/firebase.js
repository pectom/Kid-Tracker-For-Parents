const admin = require('firebase-admin');

const keys = require('../config/keys');

admin.initializeApp({
    credential: admin.credential.cert({
        projectId: keys.firebaseProjectId,
        clientEmail: keys.firebaseClientEmail,
        privateKey: keys.firebasePrivateKey.replace(/\\n/g, '\n')
    }),
    databaseURL: keys.fireBaseDB
});

function sendBreakRuleNotification(user,name,rule,area) {
    const registrationToken = user.firebaseToken;
    if(registrationToken){

        const childName = String(name).toUpperCase()[0]+String(name).substr(1);

        const message = {
            notification: {
                title: childName + ' opuścił/a obszar: '+ area.name,
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
    }
};
function sendBackToAreaNotification(user,name,rule,area) {
    const registrationToken = user.firebaseToken;
    if(registrationToken){

        const childName = String(name).toUpperCase()[0]+String(name).substr(1);

        const message = {
            notification: {
                title: childName + ' powrócił/a do obszar: '+ area.name,
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
    }
};
module.exports = {sendBreakRuleNotification,sendBackToAreaNotification};