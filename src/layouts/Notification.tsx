import React, { useState } from 'react'

const NotificationComponent = () => {
  const notifyUser = async (str = 'lorem') => {
    console.log('Notification.permission', Notification.permission)
    if (!('Notification' in window)) {
      alert('Not supported')
    } else if (Notification.permission === 'granted') {
      const notifications = new Notification(str)
    } else if (Notification.permission === 'denied' || Notification.permission === 'default') {
      await Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          const notifications = new Notification(str)
        }
      })
    }
  }

  const [respon, setRespon] = useState(false)
  const enableNotiAndClose = async () => {
    await notifyUser().then(() => {
      setRespon(true)
    })
  }

  const disableNotiAndClose = () => {
    setRespon(false)
  }

  return (
    <div className="flex-1">
      <div className="flex flex-col">
        <button onClick={async () => { await enableNotiAndClose() }}> Notify </button>
        <button onClick={() => { disableNotiAndClose() }}> Close </button>
      </div>
      <div>{respon ? 'true' : 'false'}</div>
    </div>
  )
}

export default NotificationComponent
