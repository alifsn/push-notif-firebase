const restify = require('restify');
const project = require('./package.json');
const httpHandler = require('./handlers/http_handler');
const firebase = require('./helper/firebase');

const server = restify.createServer({
  name: project.name,
  version: project.version
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

firebase.init()

server.get('/echo/:name', function (req, res, next) {
  res.send(req.params);
  return next();
});
server.post('/notif/v1', httpHandler.sendNotif)
server.post('/notif/v1/topic', httpHandler.sendTopicNotif)

server.listen(8080, function () {
  console.log('%s listening at %s', server.name, server.url);
});