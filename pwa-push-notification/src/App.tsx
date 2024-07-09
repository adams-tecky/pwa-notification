import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { requestNotificationPermission } from "./utils/notifications";
import { subscribeUser } from "./utils/subscription";

const App: React.FC = () => {
  const handleRequestPermissionAndSubscribe = async () => {
    console.log("asking for permission")
    const permission = await requestNotificationPermission();
    if (permission === "granted") {
      console.log("granted!");
      await subscribeUser();
      alert("Notifications permission granted and user subscribed.");
    } else {
      alert("Notifications permission denied.");
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <button onClick={handleRequestPermissionAndSubscribe}>
          Enable Notifications
        </button>
      </header>
    </div>
  );
};

export default App;
