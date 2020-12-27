// ===== data part =========
const users = {};
const convertor = {};
const carList = {
  'BMWX1': {
    brand: 'BMW',
    model: 'X1',
    quantity: '2',
  },
  'AUDI9': {
    brand: 'AUDI',
    model: '9',
    quantity: '1'
  }
}

// ===== Function ======
const validSession = (sid) => {
  if(!sid || !users[sid]) {
    return false;

  }
  return true;
}

const attemptLogin = (username, password) => {
  if(!username || !password || !convertor[username] || users[convertor[username]].password !== password) {
    return false;
  }

  return true;
}

const getUsers = (sid) => {
  return users[sid];
}

// CREATE NEW USER, valid username and password.
const createUser = (username, password, sid) => {
  if(!username || username === 'dog'|| !password || !username.match(/^[A-Za-z0-9_-]{2,20}$/)){
    return false;
  }

  convertor[username] = sid;
  users[sid] = {
    sid,
    username,
    password
  };

  return users[sid];
}

const removeUser = (sid) => {
  const username = users[sid].username;
  delete users[sid];
  delete convertor[username];
}

const addNewCar = (brand, model, quantity) => {
  brand = brand.toUpperCase();
  model = model.toUpperCase();
  const id = (brand+model+'');
  if(carList[id]){
    carList[id].quantity += Number(quantity);
  } else {
    carList[id] = {
      brand,
      model,
      quantity
    }
  }
  return carList[id];
}

const getCarList = () => {
  return carList;
}

const inventoryOperation = (brand, model, method) => {
  const id = ''+brand+model;
  if(method === "add") {
    carList[id].quantity = Number(carList[id].quantity) + 1;
  } else if(method == "decrease"){
    let remain = Number(carList[id].quantity) - 1;
    if(remain <= 0) {
      delete carList[id];
    } else {
      carList[id].quantity = remain;
    }
  } else if(method == "delete"){
    delete carList[id];
  } else {
    return false;
  }
  return true;
}

module.exports = {
  validSession,
  attemptLogin,
  getUsers,
  removeUser,
  convertor,
  createUser,
  addNewCar,
  getCarList,
  inventoryOperation
}
