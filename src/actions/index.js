import { save_comment } from './types';

// to save comments
export const saveComment = (comment) => {
  return {
    type: save_comment,
    payload: comment
  }
}