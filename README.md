# Guide to setup Demo project

Since IOS Push Notifictions only works under HTTPS. We need to setup https for local development.

## Build the react app

For convenience, in this demo we shall serve the react app through server.

```cmd
cd pwa-push-notification
yarn install
yarn build
```

You should see the build folder in react project folder.

Let's copy the build folder to `push-server`.

```cmd
cp -r build ../push-server/.
```

## Start up the server

Change directory to push-server.

You can see the self signed certificate `cert.pem`,`csr.pem`,`key.pem`

Let's start up the server

```
yarn install
yarn start
```

Check your `IP` on router's network.For example mine is `192.168.80.30` You will need it to access server on your phone.

## Install self sign certificate on your iPhone

Let's download self signed certificate to phone by accessing the `IP` : `https://192.168.80.30:8080/cert.pem`.

Safari will open the iOS Setting up and offer you to install the certificate as a Profile.

Then instruct iOS to fully trust the installed root certificate. For this, open again the iOS Settings app. Then navigate to “General” > “About” > “Certificate Trust Settings”. In the section “Enable Full Trust for Root Certificates”, enable your root certificate.

## Test out the push notification function

Make sure your phone is connect to same wifi as your computer.Go to the `IP` : `https://192.168.80.30:8080/` directly, you should be able to view the site.

Click `Enable Notifications` and press allow all.

Using Insomina to send a **POST** request to `IP` : `https://192.168.80.30:8080/sendNotification` to trigger server sending a push notifications
