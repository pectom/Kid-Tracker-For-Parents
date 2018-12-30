const admin = require('firebase-admin');

const keys = require('../config/keys');

admin.initializeApp({
    credential: admin.credential.cert({
        projectId: keys.firebaseProjectId,
        clientEmail: keys.firebaseClientEmail,
        privateKey: keys.firebasePrivateKey
    }),
});
function sendNotification(user,rule,area) {
    const registrationToken = user.firebaseToken;
    const message = {
        data: {
            area:area.name
        },
        token: registrationToken
    };
    admin.messaging().send(message)
        .then((response) => {
            // Response is a message ID string.
            console.log('Successfully sent message:', response);
        })
        .catch((error) => {
            console.log('Error sending message:', error);
        });
};
module.exports = {sendNotification};