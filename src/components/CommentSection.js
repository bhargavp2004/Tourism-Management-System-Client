import React, { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode'; 

function CommentSection(props) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [userid, setUserid] = useState('');

  const packid = props.packid;

  useEffect(() => {
    // Retrieve the token from local storage
    const token = localStorage.getItem('token');
    // Check if a token exists
    if (token) {
      try {
        // Decode the token to get the payload
        const decodedToken = jwtDecode(token);
        // Extract the username from the payload (adjust this based on your token structure)
        const { id } = decodedToken.user;
        // Set the username in the component's state
        setUserid(id);
      } catch (error) {
        // Handle any decoding errors
        console.error('Error decoding token:', error);
      }
    }
  }, []);

  useEffect(() => {
    fetch(`http://localhost:5000/getComment/${packid}`)
      .then((response) => response.json())
      .then((data) => {
        setComments(data);
      })
      .catch((error) => console.error('Error fetching comments:', error));
  }, [packid]); // Update comments when packid changes

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleSubmitComment = () => {
    fetch(`http://localhost:5000/addComment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ newComment, userid, packid }),
    })
      .then((response) => response.json())
      .then((data) => {
        setComments([...comments, data.newCom]);
        setNewComment('');
        window.location.reload();
      })
      .catch((error) => console.error('Error adding comment:', error));
  };

  return (
    <div className="container mt-5">
      <h2>Comments</h2>
      <div className="mb-3">
        {comments &&
          comments.map((comment, index) => (
            <div key={index} className="alert alert-primary" role="alert">
              <div>
                <strong>User: </strong> {comment.username}
              </div>
              <div>
                <strong>Comment: </strong> {comment.comment_desc}
              </div>
            </div>
          ))}
      </div>
      <div className="mb-3">
        <textarea
          className="form-control"
          placeholder="Add a comment"
          value={newComment}
          onChange={handleCommentChange}
        />
      </div>
      <button className="btn btn-primary" onClick={handleSubmitComment}>
        Add Comment
      </button>
    </div>
  );
}

export default CommentSection;