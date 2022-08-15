import React, { useState, useEffect } from 'react';

const Comments: React.FC = () => {

  const [commentsOpen, setCommentsOpen] = useState(false);

  const showComments = () => {
    if (commentsOpen) {
      setCommentsOpen(false);
      // console.log('hidden');
    } else {
      setCommentsOpen(true);
      // console.log('shown');
    }
  };

  const commentsFeed = () => {
    // console.log('comments');
    if (commentsOpen) {
      return (
        <div>
          comments HERE
        </div>
      );
    } else {
      return;
    }
  };

  return (
    <div>
      <div onClick={showComments}>
        {commentsOpen ? 'hide comments' : 'show comments'}
      </div>

      <div>
        {commentsOpen ? commentsFeed() : ''}
      </div>
    </div>
  );
};


export default Comments;
