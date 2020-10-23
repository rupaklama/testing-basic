// creating separate file to access Redux Store in test files

import React from 'react';
import { Provider } from 'react-redux';

// Using other function from Redux - createStore ()
// to put all Reducers into the Redux Store object & create Global State object
// applyMiddleware - to add redux thunk
import { createStore, applyMiddleware } from 'redux';

import reducers from './reducers';

// redux promise to make async network request
import reduxPromise from 'redux-promise';

// redux dev tool
import { composeWithDevTools } from 'redux-devtools-extension';

// declare initial Global state object
// const initialState = {};

// redux thunk middleware
// const middleware = [thunk];

// STORE is the collections of different Reducers & to create a single global state object.
// const store = createStore(
//   reducers,
//   initialState,
//   composeWithDevTools(applyMiddleware(...middleware))
// );

// This is a React Provider component & call with props object
// This component will wrap up other components

// declare initial Global state object & customize to work with 
// test files to add data into Store for testing from test files
// our initial test state will be pass as prop here
export default ({ children, initialState = {} }) => {

  // Wrap the children component with the Provider component.
  // pass in a single prop - store which takes in all the reducers
  return (
    <Provider
      store={createStore(
        reducers,
        initialState,
        composeWithDevTools(applyMiddleware(reduxPromise))
      )}
    >
      {children}
    </Provider>
  );
};
