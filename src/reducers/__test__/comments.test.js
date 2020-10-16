import commentsReducer from '../commentsReducer';
import { save_comment } from '../../actions/types';

// To test Reducers, all we have to do call Reducer, pass in some fake Action &
// make expectation around the value that Reducer returns
test('handles actions of type save_comment', () => {
  // creating fake action object
  const action = {
    type: save_comment,
    payload: 'New Comment'
  }

  // Calling our reducer to process fake action object
  const newState = commentsReducer([], action)

  expect(newState).toEqual(['New Comment']);
})

// our reducer doesn't throw an error if it gets an action of unknown type
test('handles action with unknown type', () => {
  // call our reducer & pass in empty object
  // empty object is same as action object with unknown type
  const newState = commentsReducer([], {})

  // don't throw any error, just return an array - initial state
  expect(newState).toEqual([])
})