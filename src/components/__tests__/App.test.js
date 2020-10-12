import React from 'react';
// import ReactDOM from 'react-dom';

// Enzyme configurations
import Adapter from 'enzyme-adapter-react-16';

// Shallow render method only renders just the give component with its 
// inner contents like div, text, input etc 
// but none of its react Children Component will render
import { shallow, configure } from 'enzyme';

import App from '../App';
import CommentBox from '../CommentBox';
import CommentList from '../CommentList';

// new instance of adapter
configure({adapter: new Adapter()});

// if there's a common code between multiple tests in a single file,
// we use jest's beforeEach helper func to extract that common logic
let wrapper; // let to reassigned new values to this variable several times during test
beforeEach(() => {
  // any logic we put here gets executed before all the tests below
  wrapper = shallow(<App />)
});

// test function
// first arg - String description of the test, second arg - func with test logic
// reading this test as - test 'shows one CommentBox component' for making meaningful description
test('shows one CommentBox component', () => {
  // using Shallow render method of enzyme to render only App component
  // wrapped - a shallow instance object we get from this is a wrapped version of App component
  // wrapped specifically means that this is a wrapped component that has some additional 
  // functionalities loaded on top with Enzyme
  // const wrapped = shallow(<App />)

  // to find CommentBox component inside of our wrapped App component
  // find method returns back an array which contains every instances of CommentBox that was found
  // although we only care about one copy of CommentBox that was created
  expect(wrapper.find(CommentBox).length).toEqual(1) // length of array
  // to make sure there's One CommentBox component inside our App component

});

test('shows one CommentList component', () => {
  // const wrapper = shallow(<App />)

  expect(wrapper.find(CommentList).length).toEqual(1)
})


  // JSDOM is the virtual browser in the command line
  // creating fake div inside JSDOM
  // const div = document.createElement('div')

  // Rendering instance of App component inside of fake div for testing into JSDOM
  // React looks inside the div & checks to see if the CommentBox is in there
  // ReactDOM.render(<App />, div)
  // console log in cli
  // console.log(div.innerHTML)

  // expect func, first arg is the Subject of our expectation, 
  // it can be object, property, array or anything else that we want to inspect
  // Here, we wanted to inspect the html contain by that div element
  // expect(div.innerHTML).toContain('Comment Box') // toBeTruthy(), no arg - true/false values
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
  // ReactDOM.unmountComponentAtNode(div)
// });