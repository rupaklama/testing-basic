import { saveComment } from '../index';
import { save_comment } from '../types';

import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
configure({ adapter: new Adapter() });

// describe func/statement is to group together similar sets of tests
// to prevent DRY code
// first arg describes both the tests below, second arg func wraps both tests below

// making sure this action has a correct type & payload
describe('saveComment', () => {
  // we are going to call action creators & write expectations on action 
  test('has the correct type', () => {
    const action = saveComment()

    expect(action.type).toEqual(save_comment)
  })

  test('has the correct payload', () => {
    // pass in payload of some sort
    const action = saveComment('new comment')

    expect(action.payload).toEqual('new comment')
  })
})
