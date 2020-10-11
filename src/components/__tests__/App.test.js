import React from 'react';
import ReactDOM from 'react-dom';

import App from '../App';

// test function
// first arg - String description of the test, second arg - func with test logic
// reading this test as - test 'shows a comment box' for making meaningful description
test('shows a comment box', () => {
  // JSDOM is the virtual browser in the command line
  // creating fake div inside JSDOM
  const div = document.createElement('div')

  // Rendering instance of App component inside of fake div for testing into JSDOM
  // React looks inside the div & checks to see if the CommentBox is in there
  ReactDOM.render(<App />, div)
  // console log in cli
  // console.log(div.innerHTML)

  // expect func, first arg is the Subject of our expectation, 
  // it can be object, property, array or anything else that we want to inspect
  // Here, we wanted to inspect the html contain by that div element
  expect(div.innerHTML).toContain('Comment Box') // toBeTruthy(), no arg - true/false values
  // toContain is the Matcher statement is to clarify what property & how we want to 
  // inspect the 'Subject'
  // In this case, Subject to contain a string - 'Comment Box'
  // The arg in Matcher statement is the value that we want/expect to see. 
  
  // NOTE: Above Test statement shows that our App.test file is trying to access internal 
  // workings 'text' of CommentBox component - NOT IDEAL
  // Good approach is to make sure that App.test knows that CommentBox exists inside of 
  // App component and not accessing it's inner contents by doing something like this
  // expect(div).toHaveAnInstanceOf(CommentBox) - unfortunately jest don't have matcher like this
  // Instead of Writing custom code to do that & do lots of extra work, we will instead use
  // Enzyme library to make testing components lots easier. 

  // function to Remove instance of App component 
  // Clean Up method
  ReactDOM.unmountComponentAtNode(div)
});