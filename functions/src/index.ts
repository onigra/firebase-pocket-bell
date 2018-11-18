import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as Call from "./call";

admin.initializeApp();

export const call = functions.https.onRequest((req, res) => {
  if (req.method !== "POST") {
    res.status(405).send("Method Not Allowed");
    return 0;
  }

  Call.save(req);
  Call.render(req, res);
  return 0;
});

// Push to phone
export const push = functions.database
  .ref("/calls/{pushId}")
  .onCreate((snapshot, context) => {
    const call = snapshot.val();
    console.log(call);
    // push(to: call.to, message: call.message)
    return;
  });
