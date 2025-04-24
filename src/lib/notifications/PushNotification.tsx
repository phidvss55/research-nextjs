import React, { useState, useEffect } from 'react'

const PushNotification = () => {
  const [permission, setPermission] = useState('default')

  useEffect(() => {
    if (!('Notification' in window)) {
      console.log('This browser does not support notifications.')
    } else {
      Notification.requestPermission().then((status) => {
        setPermission(status)
      })
    }
  }, [])

  const handleSubscribe = async () => {
    if (permission !== 'granted') {
      console.log('Notification permission not granted.')
      return
    }

    const registration = await navigator.serviceWorker.register('/sw.js')
    const subscribeOptions = {
      userVisibleOnly: true,
      applicationServerKey: process.env.NEXT_PUBLIC_VAPID_KEY
    }

    const subscription = await registration.pushManager.subscribe(subscribeOptions)
    console.log('Push notification subscription:', subscription)
  }

  return (
    <div>
      {permission === 'granted'
        ? (
        <button onClick={handleSubscribe}>Subscribe to Push Notifications</button>
          )
        : (
        <p>Push notifications are not supported in this browser.</p>
          )}
    </div>
  )
}

export default PushNotification
