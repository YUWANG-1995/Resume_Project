export const fetchLoginStatus = () => {
  return fetch('/session', {
    method:'GET'
  })
  .catch( () => Promise.reject({error: 'network-error'}))
  .then( (response) => {
    if(!response.ok) {
      return response.json().then( err => Promise.reject(err));
    }
    return response.json();
  });
};

export const fetchLogin = (username, password) => {
  return fetch('/session/'+username+'/'+password, {
    method: 'GET'
  })
  .catch( () => Promise.reject({error: 'network-error'}))
  .then( (response) => {
    if(!response.ok) {
      return response.json().then( err => Promise.reject(err));
    }
    return response.json();
  });
};

export const fetchSignUp = (username, password) => {
  return fetch('/session', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json',
    }),
    body: JSON.stringify({username, password})
  })
  .catch( () =>{
    Promise.reject({error: 'network-error'});
  })
  .then( (response) => {
    if(!response.ok) {
      return response.json().then( err => Promise.reject(err));
    }
    return response.json();
  });
};

export const fetchAllCars = () => {
  return fetch('/inventory', {
    method: 'GET'
  })
  .catch( () => Promise.reject({error: 'network-error'}))
  .then( (response) => {
    if(!response.ok) {
      return response.json().then( err => Promise.reject(err));
    }
    return response.json();
  });
}

export const fetchNewCar = (brand, model, quantity) => {
  return fetch('/inventory', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json',
    }),
    body: JSON.stringify({brand, model, quantity})
  })
  .catch( () =>{
    Promise.reject({error: 'network-error'});
  })
  .then( (response) => {
    if(!response.ok) {
      return response.json().then( err => Promise.reject(err));
    }
    return response.json();
  });
}

  export const fetchCRUD = (brand, model, method) => {
    return fetch('/inventory', {
      method: 'PUT',
      headers: new Headers({
        'content-type': 'application/json',
      }),
      body: JSON.stringify({brand, model, method})
    })
    .catch( () =>{
      Promise.reject({error: 'network-error'});
    })
    .then( (response) => {
      if(!response.ok) {
        return response.json().then( err => Promise.reject(err));
      }
      return response.json();
    });
  }
