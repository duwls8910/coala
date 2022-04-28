const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const { swaggerUi, specs } = require('./swagger');

const app = express();
// const port = 4000;

const userRouter = require('./routes/user');
const contentsRouter = require('./routes/contents');
const contentRouter = require('./routes/content');
const adminRouter = require('./routes/admin');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ['http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS', 'PATCH', 'DELETE'],
  }),
);
app.use(cookieParser());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use(
  morgan('      :method :url :status :res[content-length] - :response-time ms'),
);

app.get('/', (req, res) => {
  res.send('Coala World!!');
});

app.use('/user', userRouter);
app.use('/contents', contentsRouter);
app.use('/content', contentRouter);
app.use('/admin', adminRouter);
// ! -----------------------------
module.exports = app; // express();

const http = require('http');
const server = http.createServer(app);
const port = 4000;

const socketIo = require('socket.io');
// io 객체는 http 서버를 만들고 콜스 설정을 가지고있네?
// io는 socket.io 패키지를 import한 변수
const io = socketIo(server, {
  cors: {
    origin: ['http://localhost:3000'],
    methods: ['POST', 'GET'],
    credentials: true,
  },
});
// io.on('event', (listener)=>{})
io.on('connection', (socket) => {
  console.log(`유저 연결 ${socket.id}`);

  socket.on('join_room', (data) => {
    socket.join(data); // 그룹에 들어가기(data는 방의 아이디)
    console.log(`User with ID: ${socket.id} 접속된 room: ${data}`);
  });

  socket.on('send_message', (data) => {
    socket.to(data.room).emit('receive_message', data);
  });

  socket.on('disconnect', () => {
    console.log('User Disconnected', socket.id);
  });
});
// socket은 커넥션이 성공했을 때 커넥션에 대한 정보를 담고 있는 변수입니다.
// socket 변수를 사용해 서버에서 이벤트 리스너를 등록하면 됨

app.listen(port, () => {
  console.log(`현재 ${port}에서 서버 가동 중`);
});
