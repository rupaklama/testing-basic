import React from 'react';
import ReactDOM from 'react-dom';

import App from '../App';

// test function
// first arg - description of the test, second arg - func with test logic
// reading this test as - test 'shows a comment box' for making meaningful description
test('shows a comment box', () => {
  // JSDOM is the virtual browser in the command line
  // creating fake div inside JSDOM
  const div = document.createElement('div')

  // Rendering instance of App component inside of fake div for testing
  // React looks inside the div & checks to see if the CommentBox is in there
  ReactDOM.render(<App />, div)
  // console log in cli
  // console.log(div.innerHTML)
  expect(div.innerHTML).toContain('Comment Box')

  // function to Remove instance of App component 
  // clean up method
  ReactDOM.unmountComponentAtNode(div)
});