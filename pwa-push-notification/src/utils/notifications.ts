export const requestNotificationPermission =
  async (): Promise<NotificationPermission> => {
    const permission = await Notification.requestPermission();
    return permission;
  };

export const showNotification = (
  title: string,
  options?: NotificationOptions
) => {
  if (Notification.permission === "granted") {
    new Notification(title, options);
  } else {
    console.error("Notifications are not permitted.");
  }
};
