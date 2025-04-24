import React, { useEffect } from 'react'
import { getMessaging, getToken } from 'firebase/messaging'
import { app, db } from '@/utils/firebase'
import { collection, getDocs, query, where, addDoc } from 'firebase/firestore'

const FirebaseNotify = () => {
  const requestPermission = async () => {
    const permission = await Notification.requestPermission()
    if (permission === 'granted') {
      const messaging = getMessaging(app)

      const token = await getToken(messaging, {
        vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY
      })

      if (token) {
        const docRef = collection(db, "tokens");

        const _query = query(docRef, where("value", "==", token));
        const querySnapshot = await getDocs(_query);

        if (querySnapshot.empty) {
          await addDoc(docRef, {
            value: token
          });
        }
      }
    } else if (permission === 'denied' || permission === 'default') {
      alert('You  denied for the notification')
      await Notification.requestPermission().then((permission) => {
        requestPermission()
        console.log('permision', permission)
      })
    }
  }

  useEffect(() => {
    requestPermission()
  }, [])

  return (
    <div>FirebaseNotify</div>
  )
}

export default FirebaseNotify
