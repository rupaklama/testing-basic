import React from 'react';
import ReactDOM from 'react-dom';

import Root from './Root';

import App from './components/App';

// Wrap the App component with the Provider component.
// pass in a single prop - store which takes in all the reducers
ReactDOM.render(
  <Root>
    <App />
  </Root>,
  document.querySelector('#root')
);

