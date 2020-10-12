import React from 'react';

import Adapter from 'enzyme-adapter-react-16';

// instead of shallow, we will use Full DOM render method for demo
// which renders the component & all of its children components too
// Note: unlike shallow or static rendering, full rendering actually mounts 
// the component in the DOM, which means that tests can affect each other 
// if they are all using the same DOM. Keep that in mind while writing your tests and, 
// if necessary, use .unmount() or something similar as CLEANUP.
import { mount, configure } from 'enzyme'; // mount is Full DOM

import CommentBox from '../CommentBox';

configure({adapter: new Adapter()});

// Execution steps - when Jest starts up, for every single test, 
// Jest will execute first - beforeEach func, second - test statement & afterEach func to unmount
// This process goes again & again for every test/it statement inside this file

// helper function
let wrapper;
beforeEach(() => {
  wrapper = mount(<CommentBox />)
})

// helper function to unmount or clean up component in the JSDOM
// after running tests on FULL DOM render method
afterEach(() => {
  wrapper.unmount()
})

test('has a text area and a button', () => {
 
  // find helper can be use for finding Component instances & also 
  // to find normal HTML elements as well
  // console.log(wrapper.find('textarea').length)
  // console.log(wrapper.find('button').length)

  expect(wrapper.find('textarea').length).toEqual(1)
  expect(wrapper.find('button').length).toEqual(1)
})

// following Steps of Simulating/Faking Events
// 1. Find the textarea element - wrapper.find('textarea')
// 2. Simulate/fake a 'change' event - .simulate(event,[mock]) of enzyme
// 3. Provide a fake event object - mock event object
// 4. Force the component to update/re-render -  to avoid
//    default behaviour of react where react does it asynchronously taking some time,
//    to do this, we can use enzyme's update() func

// 5. Expectation - Assert that text areas value has changed
// making sure the text input is working & storing input values
test('has a text area that users can type in', () => {
  // simulate takes first arg -  html name of the event
  // second arg - is the mock event object that will be merged with the event object passed 
  // to our event handlers
  wrapper.find('textarea').simulate('change', { target: { value: 'new comment'}} ) 
  // NOTE - mock event object gets dump as an arg into our event handler - 
  // onChange(({ target: { value: 'new comment'}})) as an event in the CommentBox component
  // Now, mock event is creating piece of new state - 'new comment'

  // Forcing the component to update/re-render
  wrapper.update()

  // assertion that text area got our new value - 'new comment'
  // .prop(key) allows us to access props passed into any element into our react components
  expect(wrapper.find('textarea').prop('value')) // value is name of the prop in <textarea />
  .toEqual('new comment')

})