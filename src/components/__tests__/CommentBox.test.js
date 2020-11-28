import React from 'react';

// This test file needs to connect to Redux store since
// our app is based on react-redux
import Root from '../../Root';

import Adapter from 'enzyme-adapter-react-16';

// NOTE: WE ARE DOING INTEGRATION TEST HERE EVEN THOUGH WE ARE RENDERING ONLY ONE COMPONENT. 
// THIS IS JUST FOR DEMO. USE SHALLOW RENDERING HERE IN PRODUCTION.

// instead of shallow, we will use Full DOM render method for demo
// which renders the component & all of its children components too
// Note: unlike shallow or static rendering, full rendering actually mounts
// the component in the DOM, which means that tests can affect each other
// if they are all using the same DOM. Keep that in mind while writing your tests and,
// if necessary, use .unmount() or something similar as CLEANUP.
import { mount, configure } from 'enzyme'; // mount is Full DOM

import CommentBox from '../CommentBox';

configure({ adapter: new Adapter() });

// Execution steps - when Jest starts up, for every single test,
// Jest will execute first - beforeEach func, second - test statement & afterEach func to unmount
// This process goes again & again for every single test/it statement inside this file

// helper function for code reuse/DRY
// runs before each of our tests
let wrapper;
beforeEach(() => {
  wrapper = mount(
    // to access Redux Store in test files
    <Root>
      <CommentBox />
    </Root>
  );
});

// helper function to unmount or clean up component in the JSDOM
// after running tests on FULL DOM render method
afterEach(() => {
  wrapper.unmount();
});

test('has a text area and two buttons', () => {
  // find helper can be use for finding Component instances & also
  // to find normal HTML elements as well
  // console.log(wrapper.find('textarea').length)
  // console.log(wrapper.find('button').length)

  // NOTE: use toBe() for primitive types - numbers, strings, null, undefined & boolean
  // use toEqual() only for an objects - object {}, array & function
  expect(wrapper.find('textarea').length).toBe(1);
  expect(wrapper.find('button').length).toBe(2);
});

// following Steps of Simulating/Faking Events
// 1. Find the textarea element - wrapper.find('textarea')
// 2. Simulate/fake a 'change' event - .simulate(event,[mock]) method of enzyme
// simulate(event,[mock]) method - first arg is html DOM event & second arg [mock] is fake event object
// 3. Provide html DOM event & mock event object 'e.target.value' in simulate method
// 4. Force the component to re-render -  to avoid
//    default behaviour of react where react does it asynchronously taking some time to re-render,
//    we can use enzyme's 'update()' func to re-render right away after we update component's state
// 5. Expectation - Assert that text areas value has changed

// making sure the text input is working & storing input values
test('has a text area that users can type in', () => {
  // simulate takes first arg -  html name of the event
  // simulate func - first arg is normal html DOM event,
  // Second arg is the mock event object that will be merged with the event object passed
  // to our event handlers
  wrapper
    .find('textarea')
    .simulate('change', { target: { value: 'new comment' } }); // creating piece of new state - 'new comment' in our component's comment state
  // NOTE - mock event object { target: { value: 'new comment' } } which is suppose to be 'e.target.value' in our component's onChange handler method
  // gets dump as an arg into our component's event handler - handleOnChange
  // ({ target: { value: 'new comment'}}) is pass as a value for an event into handleOnchange(event)
  // Now, mock event is creating piece of new state - 'new comment'

  // Forcing the component to re-render when comment state gets updated with setState
  wrapper.update();

  // assertion that text area got our new value/state - 'new comment'
  // .prop(key) allows us to access props passed into any element into our react components like value={}, onChange={}, onSubmit={}
  expect(wrapper.find('textarea').prop('value')) // value attribute in <textarea />
    .toBe('new comment');
});

test('when form is submitted, text area gets emptied', () => {
  // we need to make sure text area has some text inside of it. 
  // If we submit a form without a text in it, we are not doing a very good test.
  // So, we will add string value of 'new comment' in our text area element 
  // mocking the form - pretending that the text - 'new comment' is inside of text area element 
  // to submit a form with a text
  wrapper
    .find('textarea')
  // mock/fake event object of 'e.target.value' which sets our comment state with value - 'new comment'
    .simulate('change', { target: { value: 'new comment' } }); 
  
  // forcing our component to update right away to appply new state of 'new comment'
  wrapper.update();
  
  expect(wrapper.find('textarea').prop('value')) // value attribute in <textarea />
    .toBe('new comment');
  
  // now making attempt to Submit the form itself to verify if textarea gets emptied out after submitting 
  // When we simulate event, we use normal 'html name' of the event
  wrapper.find('form').simulate('submit'); 
  // ADD { preventDefault: () => {},} as a second arg in simulate func to mock e.preventDefault() & to aviod undefined issue with Shallow render
  // type error: cannot read property 'preventdefault' of undefined 
  // To mock, e.preventDefault()
  // NOTE - this is an issue only when using shallow enzyme renderer. 
  // In case of full DOM renderer mount, the event object contains the preventDefault method, therefore you don't have to mock it.

  // when we submit the form, it will call - handleSubmit func
  // which will change our state value to empty string by calling setComment('') to clear the form values
  // setComment('') is a async operation, so we need to force our component to update
  // in order to change our state value to inital state of '' after submitting form
  // forcing our component to update right away to update comment state to '' - initial state
  wrapper.update();

  // comment state to be empty string - const [comment, setComment] = useState('');
  expect(wrapper.find('textarea').prop('value')).toBe('');
});

// same as above
// describe func/statement is to group together similar sets of tests
// to prevent DRY code
// first arg describes both the tests below, second arg func wraps both tests below
// describe('the text area', () => {
//   // this runs before our tests below
//   beforeEach(() => {
//     wrapper
//       .find('textarea')
//       .simulate('change', { target: { value: 'new comment' } });
//     wrapper.update();
//   });

//   test('has a text area that users can type in', () => {
//     expect(wrapper.find('textarea').prop('value')).toEqual('new comment');
//   });

//   test('when form is submitted, text area gets emptied', () => {
//     wrapper.find('form').simulate('submit');
//     wrapper.update();
//     expect(wrapper.find('textarea').prop('value')).toEqual('');
//   });
// });
