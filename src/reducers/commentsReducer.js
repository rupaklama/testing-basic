import { save_comment } from '../actions/types';

// initialing default state to [] to add comments 
export default function(state = [], action) {
  switch (action.type) {
    case save_comment:
      return [...state, action.payload]
    default:
      return state
  }
}