self.addEventListener('push', (event) => {
    console.log('Push event received:', event);
  
    // Default data in case event data is not provided
    const defaultData = {
      title: 'Default Title',
      body: 'Default body text',
      icon: '/logo192.png',
      badge: '/logo192.png'
    };
  
    const data = event.data ? event.data.json() : defaultData;
  
    const title = data.title;
    const options = {
      body: data.body,
      icon: data.icon,
      badge: data.badge
    };
  
    event.waitUntil(
      self.registration.showNotification(title, options)
    );
  });
  
  self.addEventListener('notificationclick', (event) => {
    event.notification.close();
  
    event.waitUntil(
      clients.openWindow('https://your-url-here.com') // Replace with the URL you want to open when the notification is clicked
    );
  });
  