const firebase = require('../helper/firebase');

const sendNotif = async(req, res) => {
    const { deviceId, message } = req.body;
    let obj = {
      token: deviceId,
      notification: {
        title: 'Notif Firebase',
        body: message
      }
    };
    const result = await firebase.sendToDevice(obj);
    res.send(result);
}

const sendTopicNotif = async(req, res) => {
    const { topic, message } = req.body;

    const obj = {
      topic: topic,
      data: {
        title: 'Topic Notif',
        body: message,
      }
    }
    const result = await firebase.send(obj);
    res.send(result);
}

module.exports = {
    sendNotif,
    sendTopicNotif
};