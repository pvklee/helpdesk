const redis = require('redis');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const config = require('./config');
const {redis: {port, host, password}, secret} = config;

exports.createSessionStore = (app) => {
  var redisClient = redis.createClient(
    port,
    host,
    {no_ready_check: true});

  redisClient.on('connect', function () {
    console.log('Connected to Redis');
  });

  redisClient.auth(password, function (err) {
    if (err) throw err;
  });
  
  // Tell Express to use our RedisLab instance as session store
  app.use(session({
      secret,
      store: new RedisStore({client: redisClient}),
      saveUninitialized: false,
      resave: false
  }));
}
