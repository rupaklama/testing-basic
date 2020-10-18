import React from 'react';

// This test file needs to connect to Redux store since
// our app is based on react-redux
import Root from '../../Root';

import Adapter from 'enzyme-adapter-react-16';

// instead of shallow, we will use Full DOM render method for demo
// which renders the component & all of its children components too
// Note: unlike shallow or static rendering, full rendering actually mounts
// the component in the DOM, which means that tests can affect each other
// if they are all using the same DOM. Keep that in mind while writing your tests and,
// if necessary, use .unmount() or something similar as CLEANUP.
import { mount, configure } from 'enzyme'; // mount is Full DOM

import CommentList from '../CommentList';

configure({ adapter: new Adapter() });

// helper function for code reuse/DRY
// runs before each of our tests
let wrapper;
beforeEach(() => {

  // our test files don't have any way to modify data inside Redux store
  // We need to somehow pass some data into our Redux Store, so
  // that it can be share with <CommentList />
  // To make it happen, we need to Customize our Redux Store to pass some initial test state 
  // Good approach is to create initial test state for this test file
  const initialState = {
    comments: ['Comment 1', 'Comment 2']
  }

  wrapper = mount(
    // initialState prop - to add above data into Redux Store for testing
    <Root initialState={initialState}>
      <CommentList />
    </Root>
  );
});

// helper function to unmount or clean up component in the JSDOM
// after running tests on FULL DOM render method
afterEach(() => {
  wrapper.unmount();
});


test('creates one List element per comment', () => {
  // two comments in initialState array, should return 2
  // console.log(wrapper.find('li').length)
  expect(wrapper.find('li').length).toEqual(2)
})

// this test is to find bugs while rendering comments
// enzyme recommended way is to use render() which returns 
// CheerioWrapper is a library like jQuery allows us to run queries over snippets of html
test('shows the text for each comment', () => {
  // prints out all the text render by <CommentList />
  // console.log(wrapper.render().text())
  expect(wrapper.render().text()).toContain('Comment 1')
  expect(wrapper.render().text()).toContain('Comment 2')
})