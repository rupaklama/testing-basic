// creating separate file to share Redux Provider in test files

import React from 'react';
import { Provider } from 'react-redux';

// Using other function from Redux - createStore ()
// to put all Reducers into the Redux Store object & create Global State object
// applyMiddleware - to add redux thunk 
import { createStore, applyMiddleware } from 'redux';

import reducers from './reducers';

// redux thunk
import thunk from 'redux-thunk';

// redux dev tool
import { composeWithDevTools } from 'redux-devtools-extension';

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

// This is a React component & call with props object
// This component will wrap up other components
export default (props) => {
  return (
    <Provider store={store}>
      {props.children}
    </Provider>
  )
}