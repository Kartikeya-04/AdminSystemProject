const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const bodyparser = require('body-parser');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const http = require('http');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { AdminModel, UserModel, UserCModel } = require('./model');

require('dotenv').config();
app.use(cors());
app.use(express.static('../Frontend'));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(express.json());
const Port = process.env.PORT;
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});
//add database
console.log('start');
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.DB);
}
//put  data of admin
app.post('/admin', async (req, res) => {
  try {
    // console.log(req.body.userid);
    // console.log(req.body.password);
    var userid = req.body.userid;
    var password = req.body.password;

    const existingAdmin = await AdminModel.findOne({ userid: req.body.userid });

    if (existingAdmin) {
      return res.status(400).send('User ID already exists');
    }

    var salt = await bcrypt.genSalt(10);
    var hpassword = await bcrypt.hash(password, salt);
    const admin = new AdminModel({
      userid: userid,
      password: hpassword,
    });
    const adminS = await admin.save();
    res.redirect('/adminview/adminview.html');
  } catch (e) {
    console.error(e);
  }
});

//for user register
app.post('/user', async (req, res) => {
  var userid = req.body.userid;
  var password = req.body.password;
  // console.log(typeof password);
  const finduser = await UserModel.findOne({ userid: req.body.userid });
  if (finduser) {
    return res.status(404).json({ error: 'User already exists!' });
  }
  var salt = await bcrypt.genSalt(10);
  var hpassword = await bcrypt.hash(password, salt);
  const user = new UserModel({
    userid: userid,
    password: hpassword,
  });
  const userS = await user.save();

  jwt.sign(
    { user },
    process.env.SECRET,
    { expiresIn: '120d' },
    (err, token) => {
      res.json({
        token,
        userS,
      });

      if (err) {
        res.status(404).send('Invalid !error in jwt');
      }
    }
  );
  // const seeu = await UserModel.find({});
  // res.status(200).json({ seeu });
  // res.send({ seeu });
});
//admin viewing user
app.get('/seeuser', async (req, res) => {
  const seeu = await UserModel.find({});

  res.send({ seeu });
});

//user login

app.post('/userlogin', verifyToken, async (req, res) => {
  const user1 = req.body.userid;
  const test = await UserModel.findOne({ userid: user1 });
  if (!test) {
    return res.status(404).json({ error: 'User does not exist' });
  }

  const pass1 = req.body.password;
  const test2 = await bcrypt.compare(pass1, test.password);
  if (!test2) {
    return res.status(404).json({ error: 'pass does not exist' });
  }
  jwt.verify(req.token, process.env.SECRET, (err, data) => {
    if (err) {
      res.status(404).send('wrong');
    } else {
      res.status(202).json({
        message: 'Successful',
        data,
      });
    }
  });
});

//verifytoken middleware
function verifyToken(req, res, next) {
  const token = req.header('authorization');
  if (typeof token !== undefined) {
    const token2 = token.split(' ');
    const bearer = token2[1];
    req.token = bearer;

    next();
  } else {
    res.send('error in verifying');
  }
}

//name and pic of user

app.post('/usercred', async (req, res) => {
  var { username, profile } = req.body;
  // console.log(profile);
  // const check1 = await UserCModel.find({ username: username });
  // const check2 = await UserCModel.find({ profile: profile });
  // if (check1.length > 0 && check2.length > 0) {
  //   return res.send('User is logged In!');
  // }
  // const existingUser = await UserCModel.findOne({ username: username });
  // if (existingUser) {
  //   return res.send('User is logged In!');
  // }

  const userC = new UserCModel({
    username: username,
    profile: profile,
  });
  const userSC = await userC.save();
});

//render all data

app.get('/all', async (req, res) => {
  var user1 = await UserModel.find({});
  res.send(user1);
});
app.get('/all2', async (req, res) => {
  var user2 = await UserCModel.find({});
  res.send(user2);
});

//del

app.delete('/delete', async (req, res) => {
  var { username, userid } = req.body;
  const del2 = await UserCModel.deleteOne({ username: username });

  const del = await UserModel.deleteOne({ userid: userid });
  console.log('deletion is done');
});

io.on('connection', (socket) => {
  socket.on('result', (data) => {
    console.log(data);
    io.emit('checkresult', data);
  });
});

//server listening
// app.listen(Port, () => {
//   console.log(`Server is on http:localhost:${Port}`);
// });

server.listen(Port, () => {
  console.log(`Server is on http:localhost:${Port}`);
});
