'use strict';

const
  http          = require('http'),
  express       = require('express'),
  path          = require('path'),
  logger        = require('morgan'),
  bodyParser    = require('body-parser'),
  cookieParser  = require('cookie-parser'),
  cors          = require('cors'),
  app           = express(),
  server        = http.createServer(app),
  port          = process.env.port || 3001,
  models        = require('./models'),
  multer        = require('multer');

app.use(logger('dev'));
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

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

// sync() will create all table if they doesn't exist in database
models.sequelize.sync().then(() => {
  server.on('error', error => console.error(error));
});

const
  modules = [
    './src/authorization/authorization.router',
    './src/user/user.router',
    './src/profile/profile.router',
    './src/product/product.router'
  ],
  connection = new Connection(app, modules).initRoutes();

server.listen(port, () => console.log(`Server up and listening on port ${port}`));
