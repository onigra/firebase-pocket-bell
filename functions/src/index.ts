import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as express from "express";
import * as bodyParser from "body-parser";

// Setup express
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Setup firebase SDK
admin.initializeApp();

// call
app.post("/", async (req, res) => {
  console.log(req.body);

  await admin
    .database()
    .ref("/calls")
    .push({
      from: req.body.from,
      to: req.body.to,
      message: req.body.message
    });

  return res.status(201).json({
    request: "ok",
    from: req.body.from,
    to: req.body.to,
    message: req.body.message
  });
});

export const call = functions.https.onRequest(app);

// Push to phone
export const push = functions.database
  .ref("/calls/{pushId}")
  .onCreate((snapshot, context) => {
    const call = snapshot.val();
    console.log(call);
    // push(to: call.to, message: call.message)
    return;
  });
