import axios from 'axios';
import { save_comment, fetch_comments } from './types';

// to save comments
export const saveComment = (comment) => {
  return {
    type: save_comment,
    payload: comment
  }
}

// to fetch comments from json place holder
export const fetchComments = () => {
  const response = axios.get('https://jsonplaceholder.typicode.com/comments')

  return {
    type: fetch_comments,
    payload: response
  }
}