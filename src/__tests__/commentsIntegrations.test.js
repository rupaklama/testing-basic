import React from 'react';
import moxios from 'moxios';

// This test file needs to connect to Redux store since
// our app is based on react-redux
import Root from '../Root';

import Adapter from 'enzyme-adapter-react-16';

// instead of shallow, we will use Full DOM render method for demo
// which renders the component & all of its children components too
// Note: unlike shallow or static rendering, full rendering actually mounts
// the component in the DOM, which means that tests can affect each other
// if they are all using the same DOM. Keep that in mind while writing your tests and,
// if necessary, use .unmount() or something similar as CLEANUP.
import { mount, configure } from 'enzyme'; // mount is Full DOM

// App component is the root component which renders all others components
import App from '../components/App';

configure({ adapter: new Adapter() });

// helper function for code reuse/DRY
// runs before each of our tests
beforeEach(() => {
  // setting up Moxios in beforeEach statement
  // telling axios to turn off & if there's any request, moxios will handle it
  // which will will trick axios into thinking it just got response
  moxios.install();
  moxios.stubRequest('https://jsonplaceholder.typicode.com/comments', {
    // customizing how moxios should handle it
    // second arg is an object that will be return to axios
    // passing network response to axios
    status: 200, // to make axios thinking request was successful
    // faking list of comments with name property
    response: [{ name: 'Fetched #1' }, { name: 'Fetched #2' }],
  });
});

// helper function to unmount or clean up component in the JSDOM
// after running tests on FULL DOM render method
afterEach(() => {
  // turn off moxios to stop making same request again
  moxios.uninstall();
});

// integration testing for two things together
// first arg - String description of the test, second arg - func with test logic
// calling done method of jest is to verify the test is complete
test('can fetch a list of comments and display them', done => {
  // attempt to render entire app
  const wrapper = mount(
    // passing no initial state, the test only suppose to fetch data
    <Root>
      <App />
    </Root>
  );

  // simulate is to fake click event to fetch data & send it our reducer
  // find the 'fetch Comments' button & click it
  // add specific class name to that particular button to find it - 'fetch-comments'
  wrapper.find('.fetch-comments').simulate('click');

  // introduce a TINY little pause as it takes time to fetch data
  // setTimeout(() => {
  
  // wait function is for async operation
  moxios.wait(() => {
    // to tell our app to update itself
    wrapper.update();

    // Expect to find a list of comments

    // expect func, first arg is the Subject of our expectation,
    // it can be object, property, array or anything else that we want to inspect
    expect(wrapper.find('li').length).toEqual(2);
    // toEqual is the Matcher statement to clarify what property & how we want to
    // inspect the 'Subject'

    // to verify test is complete
    done();

    wrapper.unmount();
  }, 100);
});

// NOTE: when we make ajax request from inside of JSDOM - jest test environment,
// the request will fail, we don't have that ability inside jsdom.

// To make this work, we will use a package - Moxios
// Moxios is to mock axios api/fake network request or to trick axios to make it work
// Moxios gets the data from ajax request
