import React from 'react';
import ReactDOM from 'react-dom';

// Using other function from Redux - createStore ()
// to put all Reducers into the Redux Store object & create Global State object
// applyMiddleware - to add redux thunk 
import { createStore, applyMiddleware } from 'redux';

// provider component
import { Provider } from 'react-redux';

// redux thunk
import thunk from 'redux-thunk';

// redux dev tool
import { composeWithDevTools } from 'redux-devtools-extension';

// reducers
import reducers from './reducers';

import App from './components/App';

// declare initial Global state object
const initialState = {};

// redux thunk middleware
const middleware = [thunk];

// STORE is the collections of different Reducers & to create a single global state object.
const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

// Wrap the App component with the Provider component.
// pass in a single prop - store which takes in all the reducers
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);
// Provider component connects to Redux Store.
// Instance of Connect component connects to the Provider component
// to access data in Redux Store.
