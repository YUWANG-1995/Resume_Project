import React, {useEffect, useReducer, createContext } from "react";
import * as services from "./services";
import errors from "./errors";
import "./App.css";
import LoginPage from "./LoginPage/LoginPage";
import RegisterPage from "./RegisterPage/RegisterPage";
import InventoryPage from "./InventoryPage/InventoryPage";
import NavBar from "./NavBar/NavBar";
import NewCar from "./AddNewCar/AddNewCar";
import AboutUs from "./AboutUs/AboutUs";
import Footer from "./Footer/Footer";
import Error from "./Error/Error";

 const initialState = {
   isLoggedIn: false,
   showSignUp: false,
   showNewCar: false,
   showAbout: false,
   showInventory: false,
   userName: '',
   method: '',
   error: '',
   carList: {},
 };

 export const StateContext = createContext();

 const reducer = (state, action) => {
   switch(action.type) {
     case 'LOGIN_SUCCESS':
      return {...state, isLoggedIn: true, userName: action.payload}
     case 'LOGIN_FAILED':
      return {...state, isLoggedIn: false, userName:'', error: action.payload}
     case 'REGISTER_SUCCESS':
      return {...state, showSignUp: false}
     case 'REGISTER_FALIED':
      return {...state, showSignUp: true, error: action.payload}
     case 'CLICK_SIGNUP':
      return {...state, showSignUp:action.payload}
     case 'ERROR_FOUND':
      return {...state, error: errors[action.payload]}
     case 'GET_CARLIST':
      return {...state, carList: action.payload}
     case 'SHOW_INVENTORY':
      return {...state, showInventory: action.payload}
     case 'ADD_NEW_CAR':
      return {...state, showNewCar: action.payload }
     case 'SHOW_ABOUT':
      return {...state, showAbout: action.payload}
     default:
      return state;
   }
 };

 const App = () => {
   const [state, dispatch] = useReducer(reducer, initialState);

   useEffect( () => {
     services.fetchLoginStatus()
     .then((response) => {
       dispatch({type:'LOGIN_SUCCESS', payload: response.username});
       getAllCars();
     })
     .catch((err) => {
       dispatch({type:'LOGIN_FAILED', payload: err.error})
     })
   }, []);

   const fetchRegister = (username, password) => {
     services.fetchSignUp(username, password)
     .then((response) => {
       dispatch({type:'REGISTER_SUCCESS', payload:''});
     })
     .catch((err) => {
       dispatch({type:'REGISTER_FALIED', payload:err.error})
     })
   }

   const fetchLogOut = () => {  
       dispatch({type:'LOGIN_FAILED', payload:''});
       dispatch({type:'ERROR_FOUND', payload:''});
   }

   const fetchLogin = (username, password) => {
     services.fetchLogin(username, password)
     .then((response) => {
       dispatch({type:'LOGIN_SUCCESS', payload: username});
       dispatch({type:'ERROR_FOUND', payload:''});
     })
     .catch((err) => {
       dispatch({type:'ERROR_FOUND', payload:err.error});
     })
   }

   const getAllCars = () => {
     services.fetchAllCars()
     .then((allCars) => {
       dispatch({type:'GET_CARLIST', payload:allCars});
       dispatch({type:'SHOW_INVENTORY', payload:true});
       dispatch({type:'ERROR_FOUND', payload:''});
     })
     .catch((err) => {
       dispatch({type:'ERROR_FOUND', payload:err.error});
     })
   }

   const addNewCar = (brand, model, quantity) => {
     services.fetchNewCar(brand, model, quantity)
     .then((response) => {
       dispatch({type:'ERROR_FOUND', payload:''});
       dispatch({type:'ADD_NEW_CAR', payload: false});
       getAllCars();
     })
     .catch((err) => {
       dispatch({type:'ERROR_FOUND', payload:err.error});
     })
   }

   const crudOperation = (brand, model, method) => {
     services.fetchCRUD(brand, model, method)
     .then(() => {
       dispatch({type:'ERROR_FOUND', payload:''});
       getAllCars();

     })
     .catch((err) => {
       dispatch({type:'ERROR_FOUND', payload: err.error});
     })
   }

   return (
     <StateContext.Provider value={{state, dispatch, fetchLogin, fetchLogOut, fetchRegister, getAllCars, addNewCar, crudOperation}}>
      <div className="container">
        <div>
          {state.isLoggedIn ? <NavBar username={state.userName} /> : ''}
          {state.error ? <Error /> : ''}
          {state.showSignUp ? <RegisterPage /> : state.isLoggedIn ? '' : <LoginPage/>}
          {state.isLoggedIn ? state.showInventory ? <InventoryPage /> : state.showNewCar ? <NewCar /> : state.showAbout ? <AboutUs /> : '' : ''}
          {state.isLoggedIn ? <Footer /> : ''}
        </div>
      </div>
     </StateContext.Provider>
   );
 }

 export default App;
