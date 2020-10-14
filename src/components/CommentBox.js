import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

const CommentBox = ({ saveComment }) => {
  const [comment, setComment] = useState('');
  console.log(comment)

  const handleSubmit = event => {
    event.preventDefault();

    // TODO - call an action creator, save the comment
    // Action Creators which is pass as props into this react component by connect
    saveComment(comment) // calling action creator with our state
    setComment('');
  };
  return (
    <form onSubmit={handleSubmit}>
      <h4>Add a Comment</h4>
      <textarea value={comment} onChange={e => setComment(e.target.value)} />
      <div>
        <button>Submit Comment</button>
      </div>
    </form>
  );
};

// mapStateToProps function passes global state data from Redux Store into react components 
// in order to do so, pass mapStateToProps to Connect function
// mapStateToProps, meaning - pass in the data store in Redux Store to this component as PROPS
// const mapStateToProps = (state) => { // call with our entire global state object in Redux Store
//   return { }
// }

// Even though if there's no state/data, still need to pass in first arg to the connect func
// first arg is always mapStateToProps func, pass null instead if no state/data
// Second arg is the Action Creator object

// passing mapStateToProps as a first arg
export default connect(null, actions)(CommentBox);
// Action Creators which is pass as props into this react component by Connect component 