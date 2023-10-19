import React, {useContext, useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import { GlobalContext } from "../App";


import { PulseLoader as DotLoader } from 'react-spinners';
function CommentSection(props) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [userid, setUserid] = useState('');
  const [commentloading, setcommentloading] = useState(true);
  const { isLoggedIn, isAdmin } = useContext(GlobalContext);
  const packid = props.packid;

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const { id } = decodedToken.user;
        setUserid(id);
      } catch (error) {
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
      .catch((error) => console.error('Error fetching comments:', error)).finally(() => {
        setcommentloading(false);
      });
  }, [packid]);

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleSubmitComment = async () => {
    try {
      const response = await fetch(`http://localhost:5000/addComment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newComment, userid, packid }),
      });
  
      if (!response.ok) {
        throw new Error('Error adding comment');
      }
  
      const data = await response.json();
      const userResponse = await fetch(`http://localhost:5000/getUser/${userid}`);
  
      if (userResponse.ok) {
        const userData = await userResponse.json();
        const newCommentWithUsername = {
          username: userData.username,
          comment_desc: data.comment_desc, 
        };
        setComments([...comments, newCommentWithUsername]);
        setNewComment('');
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };
  

  return (
    <div className="container mt-5" style={{backgroundColor : "white"}}>
      <h2>Comments</h2>
      {commentloading ? (<div className="text-center justify-content-center">
        <DotLoader color="rgb(0, 0, 77)" loading={true} size={25} />
      </div>) : 
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
      }
      {!isAdmin && (
      <div className="mb-3">
        <textarea
          className="form-control"
          placeholder="Add a comment"
          value={newComment}
          onChange={handleCommentChange}
        />
      </div>
      )}

      {!isAdmin && (
      <button className="btn btn-primary" onClick={handleSubmitComment}>
        Add Comment
      </button>
      )}
    </div>
  );
}

export default CommentSection;