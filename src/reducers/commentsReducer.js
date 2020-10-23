import { save_comment, fetch_comments } from '../actions/types';

// initialing default state to [] to add comments 
export default function(state = [], action) {
  switch (action.type) {
    case save_comment:
      return [...state, action.payload]
    case fetch_comments:
      // returning only name property from array of objects
      const comments = action.payload.data.map(comment => comment.name) 
      // prev comments + new comments
      return [...state, ...comments]
    default:
      return state
  }
}