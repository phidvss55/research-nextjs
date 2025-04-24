import { app, db } from '@/utils/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { getMessaging } from 'firebase-admin/messaging';
import { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';
import webpush from 'web-push';

const vapidKeys = {
  privateKey: 'bdSiNzUhUP6piAxLH-tW88zfBlWWveIx0dAsDO66aVU',
  publicKey: 'BIN2Jc5Vmkmy-S3AUrcMlpKxJpLeVRAfu9WBqUbJ70SJOCWGCGXKY-Xzyh7HDr6KbRDGYHjqZ06OcS3BjD7uAm8',
};

webpush.setVapidDetails('mailto:phi.dinh2023@gmail.com', vapidKeys.publicKey, vapidKeys.privateKey);

const subscriptions = {};


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query, body } = req;
  const subscriptions: Record<string, any> = {};
  
  if (method === 'POST') {
    // get all tokens from database
    const docRef = collection(db, 'tokens');
    const tokenSnap = await getDocs(docRef);
    const regisTokens: any[] = [];
    const TOPIC = process.env.NEXT_PUBLIC_TOPIC || 'topic1';

    tokenSnap.forEach((item) => {
      const _t = item.data();
      console.log('tokens.indexOf(_t.value)', regisTokens.indexOf(_t.value));
      if (regisTokens.indexOf(_t.value) === -1) {
        regisTokens.push(_t.value);
      }
    });

    getMessaging()
      .subscribeToTopic(regisTokens, TOPIC)
      .then((response: any) => {
        // See the MessagingTopicManagementResponse reference documentation
        // for the contents of response.
        console.log('Successfully subscribed to topic:', response);
      })
      .catch((error: any) => {
        console.log('Error subscribing to topic:', error);
      });

    res.status(201).json({ status: true, code: 200, msg: 'Return message', data: regisTokens });
  }  else  if (method === 'GET') {
    const subscriptionId = query.id;
    if (!subscriptionId || Array.isArray(subscriptionId)) {
      res.status(500).json({ message: 'Id is required' });
      return;
    }

    const pushSubscription = subscriptions[subscriptionId];

    webpush
      .sendNotification(
        pushSubscription,
        JSON.stringify({
          title: 'New Product Available ',
          text: 'HEY! Take a look at this brand new t-shirt!',
          image: '/images/jason-leung-HM6TMmevbZQ-unsplash.jpg',
          tag: 'new-product',
          url: '/new-product-jason-leung-HM6TMmevbZQ-unsplash.html',
        })
      )
      .catch((err) => {
        console.log(err);
      });
    res.status(202).json({});
  } else {
    const subscriptionRequest = body.data;
    const susbscriptionId = createHash(JSON.stringify(subscriptionRequest));
    subscriptions[susbscriptionId] = subscriptionRequest;
    res.status(201).json({ id: susbscriptionId });
  }
}

function createHash(input: any) {
  const md5sum = crypto.createHash('md5');
  md5sum.update(Buffer.from(input));
  return md5sum.digest('hex');
}
