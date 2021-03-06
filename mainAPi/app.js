var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');
const nconf = require('nconf');
const cookieParser = require('cookie-parser');
const routes = require('./src/routes/Project');
const kanban = require('./src/routes/KanbanRoutes');
var InterviewRoutes = require('./src/routes/InterviewRoutes');
const user = require('./src/routes/User')
const news = require('./src/routes/News')
const agenda = require('./src/routes/Agenda')

var app = express();

//server configuration
var prod = true
var basePath = '/api';
var port = 6200;
let uri = ''
if (prod) {
  port = 8080;
  nconf.argv().env().file('keys.json');

  const user = nconf.get('mongoUser');
  const pass = nconf.get('mongoPass');
  const host = nconf.get('mongoHost');
  const dbPort = nconf.get('mongoPort');

  uri = `mongodb+srv://${user}:${pass}@${host}`;
  // if (nconf.get('mongoDatabase')) {
  //   uri = `${uri}/${nconf.get('mongoDatabase')}`;
  // }

} else {
  uri = 'mongodb://mongodb'
}

app.use(cors());

// Connection to DB
mongoose.connect(uri)
  .then(() => {
    console.log('Backend Started');
  })
  .catch(err => {
    console.error('Backend error:', err.stack);
    process.exit(1);
  });


// App Instance
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.text());
app.use(bodyParser.json());
app.use(basePath, InterviewRoutes);
app.use(basePath, kanban)
app.use(basePath, user)
app.use(basePath, news)
app.use(basePath, agenda)
app.use(basePath, routes)


// Execute App
app.listen(port, () => {
  console.log('InterviewRoutes Backend running on Port: ', port);
});



