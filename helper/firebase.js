const fcm = require('firebase-admin');
const { initializeApp } = require('firebase-admin/app');
const { getMessaging } = require('firebase-admin/messaging');
const connectionPool = [];
const firebaseConfig = require('../test-notif.json');
const wrapper = require('./wrapper');

const init = async () => {
  const client = initializeApp({
    credential: fcm.credential.cert(firebaseConfig)
  });
  connectionPool.push(client);
  return connectionPool;
};

const sendToDevice = async (payload, options) => {
  try {
    const message = await getMessaging().send(payload,options);
    if (message) {
      return wrapper.data(message);
    }
  } catch (err) {
    return wrapper.error('Error send to device');
  }
};

const send = async (payload) => {
  try {
    const message = await getMessaging().send(payload);
    if (message) {
      return wrapper.data(message);
    }
  } catch (err) {
    return wrapper.error('Error send to device');
  }
};

module.exports = {
  init,
  sendToDevice,
  send
};
