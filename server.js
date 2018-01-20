'use strict';

const
  http          = require('http'),
  express       = require('express'),
  path          = require('path'),
  morgan        = require('morgan'),
  bodyParser    = require('body-parser'),
  cookieParser  = require('cookie-parser'),
  cors          = require('cors'),
  app           = express(),
  server        = http.createServer(app),
  port          = process.env.port || 3001,
  DB            = require('./models'),
  logger        = require('./src/utils/logger'),
  multer        = require('multer');

app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use(morgan('dev', {
  skip: function (req, res) {
      return res.statusCode < 400
  }, stream: process.stderr
}));

app.use(morgan('dev', {
  skip: function (req, res) {
      return res.statusCode >= 400
  }, stream: process.stdout
}));

//don't show the log when it is test
if (process.env.NODE_ENV !== 'test') {
  //use morgan to log at command line
  app.use(morgan('combined')); //'combined' outputs the Apache style LOGs
  // sync() will create all table if they doesn't exist in database
  DB.sequelize.sync({ logging: false }).then(() => {
    server.on('error', error => console.error(error));
  });
}

class Connection {
  constructor(app, modules) {
    this.app      = app;
    this.modules  = modules;
  }
  initRoutes() {
    this.modules.map((module_path) => {
      require(module_path)(this.app);
    });
  }
}

const
  modules = [
    './src/authorization/authorization.router',
    './src/user/user.router',
    './src/profile/profile.router',
    './src/product/product.router'
  ],
  connection = new Connection(app, modules).initRoutes();

server.listen(port, () => logger.info(`Server up and listening on port ${port}`));

module.exports = app; // for testing
