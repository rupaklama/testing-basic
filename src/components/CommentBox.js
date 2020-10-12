import React, { useState } from 'react';

const CommentBox = () => {
  const [comment, setComment] = useState('');
  

  const handleSubmit = event => {
    event.preventDefault();
    console.log(comment);

    // TODO - call an action creator, save the comment

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

export default CommentBox;
