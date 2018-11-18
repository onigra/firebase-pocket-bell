import * as admin from "firebase-admin";

export async function save(req) {
  await admin
    .database()
    .ref("/calls")
    .push({
      from: req.body.from,
      to: req.body.to,
      message: req.body.message
    });
}

export function render(req, res) {
  return res.status(201).json({
    request: "ok",
    from: req.body.from,
    to: req.body.to,
    message: req.body.message
  });
}
