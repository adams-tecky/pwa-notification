import express from "express";
import https from "https";
import fs from "fs";
import webpush from "web-push";
import bodyParser from "body-parser";
import path from "path";

const app = express();
app.use(bodyParser.json());

const vapidKeys = {
  publicKey:
    "BPnXtEYQLQdXa4eekZPJyzyE6eUGpjBtodNzgys0i49XhGhNCm1FBVkFF05W1emTW4c23qfnr12zD-Jxc2HHX_U",
  privateKey: "8H6awwd2wwrcjvTc9SM7-Dzw0bhgr5orqO34vm8s97I",
};

webpush.setVapidDetails(
  "mailto:airommel2014@gmail.com",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

interface PushSubscriptionJSON {
  endpoint: string;
  expirationTime: null | number;
  keys: {
    p256dh: string;
    auth: string;
  };
}

let subscriptions: PushSubscriptionJSON[] = [];

app.all("*", function (req, res, next) {
  console.log(
    "req start: ",
    req.secure,
    req.hostname,
    req.url,
    app.get("port")
  );
  if (req.secure) {
    return next();
  }

  res.redirect("https://" + req.hostname + ":" + app.get("secPort") + req.url);
});

app.get("/hi", (req, res) => {
  res.send("hello world");
});

app.use(express.static("build"));

app.post("/subscribe", (req, res) => {
  console.log("New subscription");
  const subscription: PushSubscriptionJSON = req.body;
  subscriptions.push(subscription);
  res.status(201).json({});
});

app.post("/sendNotification", (req, res) => {
  console.log("Received request");
  const payload = JSON.stringify({
    title: "Test Notification",
    body: "This is a test notification",
  });

  Promise.all(
    subscriptions.map((sub) => webpush.sendNotification(sub, payload))
  )
    .then(() =>
      res.status(200).json({ message: "Notification sent successfully." })
    )
    .catch((error) => {
      console.error("Error sending notification:", error);
      res.sendStatus(500);
    });
});

app.get("/cert.pem", (req, res) => {
  res.sendFile(path.join(__dirname, "cert.pem"));
});

const options = {
  key: fs.readFileSync(path.join(__dirname, "key.pem")),
  cert: fs.readFileSync(path.join(__dirname, "cert.pem")),
};

https.createServer(options, app).listen(8080, () => {
  console.log("HTTPS server started on port 8080");
});
