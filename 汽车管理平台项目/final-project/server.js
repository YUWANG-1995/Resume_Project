const express = require('express');
const cookieParser = require('cookie-parser');
const uuid = require('uuid').v4;

const app = express();
const PORT = 5000;
const session = require('./session');

app.use(cookieParser());
app.use(express.json());
app.use(express.static('./build'));

// session part
app.get('/session', (req, res) => {
  const sid = req.cookies.sid;
  if(!session.validSession(sid)) {
    res.clearCookie('sid');
    res.status(401).json({error: 'login-required'});
    return;
  }
  const users = session.getUsers(sid);
  res.status(200).json({users});
});

app.get('/session/:username/:password', (req, res)=> {
  const username = req.params.username;
  const password = req.params.password;
  const loginResult = session.attemptLogin(username, password);
  if(!loginResult){
    res.status(401).json({error: 'login-required'});
    return;
  }
  const sid = session.convertor[username];
  const users = session.getUsers(sid);
  res.status(200).json({users});
});

app.post('/session', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const sid = uuid();
  res.cookie('sid', sid);
  const newUser = session.createUser(username, password, sid);
  if(!newUser) {
    res.status(403).json({error: 'invalid sign up'});
    return;
  }
  res.status(200).json({newUser});
});

// inventory part
app.get('/inventory', (req, res) => {
  const sid = req.cookies.sid;
  if(!session.validSession(sid)) {
    res.clearCookie('sid');
    res.status(401).json({error: 'login-required'});
    return;
  }
  const cars = session.getCarList();
  res.status(200).json(cars);
});

app.post('/inventory', (req, res) => {
  const brand = req.body.brand;
  const model = req.body.model;
  const quantity = req.body.quantity;
  const sid = req.cookies.sid;
  if(!session.validSession(sid)) {
    res.clearCookie('sid');
    res.status(401).json({error: 'login-required'});
    return;
  }
  if(!brand || !model || quantity <= 0) {
    res.status(403).json({error: 'invalid-car-information'});
    return;
  }
  session.addNewCar(brand, model, quantity);
  res.status(200).json(session.getCarList());
});

app.put('/inventory', (req, res) => {
  const sid = req.cookies.sid;
  if(!session.validSession(sid)) {
    res.clearCookie('sid');
    res.status(401).json({error: 'login-required'});
    return;
  }
  const brand = req.body.brand;
  const model = req.body.model;
  const method = req.body.method;
  if(!brand ||!model) {
    res.status(403).json({error: 'invalid-operation'});
    return;
  }
  if(!session.inventoryOperation(brand, model, method)) {
    res.status(403).json({error: 'CRUD-FAILED'});
    return;
  }
  res.status(200).json(session.getCarList());
});


app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
