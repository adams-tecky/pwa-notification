export const subscribeUser = async () => {
  if ("serviceWorker" in navigator) {
    const registration = await navigator.serviceWorker.ready;
    console.log("Service Worker ready:", registration);

    if (registration.pushManager) {
      try {
        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(
            "BPnXtEYQLQdXa4eekZPJyzyE6eUGpjBtodNzgys0i49XhGhNCm1FBVkFF05W1emTW4c23qfnr12zD-Jxc2HHX_U"
          ),
        });
        console.log("User subscribed:", subscription);
        const subscriptionJSON = subscription.toJSON();
        await sendSubscriptionToServer(subscriptionJSON);
      } catch (error) {
        console.error("Error during subscription:", error);
      }
    } else {
      console.error("PushManager is not available.");
      alert("Push notifications are not supported in this browser.");
    }
  } else {
    console.error("Service workers are not supported in this browser.");
    alert("Service workers are not supported in this browser.");
  }
};

const sendSubscriptionToServer = async (subscription: PushSubscriptionJSON) => {
  console.log("Sending subscription to server:", subscription);
  const response = await fetch(`${process.env.PUBLIC_URL}/subscribe`, {
    method: "POST",
    body: JSON.stringify(subscription),
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log("Subscription response:", response);
};

const urlBase64ToUint8Array = (base64String: string) => {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};
