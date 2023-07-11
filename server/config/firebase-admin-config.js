const admin = require("firebase-admin");
const serviceAccount = require("./nemsu-ict-firebase-adminsdk-8ifvn-2906ac32b1.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
