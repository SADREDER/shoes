import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

let AlertDefValaue = true;

function alertReducer(state = AlertDefValaue, stateAction) {
  if (stateAction.type === 'close') {
    let copyState = state;
    copyState = false;
    return copyState;
  } else if (stateAction.type === 'open') {
    let copyState = state;
    copyState = true;
    return copyState;
  } else {
    return state;
  }
}

let defValue = [
  { id: 0, name: 'Good Shoes', quantity: 2 },
  { id: 1, name: 'Best Shoes', quantity: 1 },
];

function reducer(state = defValue, stateAction) {
  if (stateAction.type === 'addItem') {
    let found = state.findIndex((a) => {
      return a.id === stateAction.payload.id;
    });

    if (found >= 0) {
      let copyState = [...state];
      copyState[found].quantity++;
      return copyState;
    } else {
      let copyState = [...state];
      copyState.push(stateAction.payload);
      return copyState;
    }
  } else if (stateAction.type === 'quantityIncrease') {
    let copyState = [...state];
    copyState[stateAction.payload].quantity++;
    return copyState;
  } else if (stateAction.type === 'quantityDecrease') {
    let copyState = [...state];
    copyState[stateAction.payload].quantity--;
    return copyState;
  } else {
    return state;
  }
}

let store = createStore(combineReducers({ reducer, alertReducer }));

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
