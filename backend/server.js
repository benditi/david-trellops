const boardRoutes = require('./api/board/board.routes');
const path = require('path');
const express = require('express');
const cors = require('cors');
var bodyParser = require('body-parser');
// const expressSession = require('express-session'); //I added
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const http = require('http').Server(app);
var io = require('socket.io')(http);
// const session = expressSession({
//   secret: 'coding is amazing',
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: false }
// })
// app.use(express.json()); //I added
// app.use(session) //I added

if (process.env.NODE_ENV === 'production') {
  // Express serve static files on production environment
  app.use(express.static(path.resolve(__dirname, 'public')))
} else {
  // Configuring CORS
  const corsOptions = {
      // Make sure origin contains the url your frontend is running on
      origin: ['http://localhost:3000', 'http://127.0.0.1:3000','http://127.0.0.1:8080', 'http://localhost:8080','http://127.0.0.1:3000', 'http://localhost:2556'],
      credentials: true
  }
  app.use(cors(corsOptions))
}

app.use('/api/board', boardRoutes);
// app.use(express.static('public'));
app.get('/*', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});
// app.use(cors(corsOptions));
http.listen(process.env.PORT || 2556, () => {
  console.log('connected');
});

io.on('connection', (socket) => {
  console.log('HELLO');
  socket.on('move-applicant', (payload) => {
    socket.broadcast.emit('move-applicant', payload);
  });
  socket.on('set-bg', (payload) => {
    socket.broadcast.emit('set-bg', payload);
  });
});
console.log('process.env.NODE_ENV', process.env.NODE_ENV);//for debbuging

