import { useState, useEffect } from "react";
import useAuthContext from "../hooks/useAuthContext";
import Comment from "./Comment";
import CommentForm from "./CommentForm";

const Comments = ({ ideaId }) => {
  const [comments, setComments] = useState([]);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}api/comments/${ideaId}`
        );
        const json = await response.json();

        if (response.ok) {
          setComments(json);
        } else {
          console.log("Failed to fetch comments:", json.error);
        }
      } catch (error) {
        console.log("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [ideaId]);

  const handleCommentAdd = (newComment) => {
    setComments([newComment, ...comments]);
  };

  const handleEdit = async (commentId, content) => {
    const response = await fetch(`/api/comments/${commentId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ content }),
    });
    const json = await response.json();

    if (response.ok) {
      setComments(
        comments.map((comment) => (comment._id === commentId ? json : comment))
      );
    }
  };

  const handleDelete = async (commentId) => {
    const response = await fetch(`/api/comments/${commentId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    if (response.ok) {
      setComments(comments.filter((comment) => comment._id !== commentId));
    }
  };

  return (
    <div className="comments-section">
      <h3>Comments</h3>
      {user && <CommentForm ideaId={ideaId} onCommentAdd={handleCommentAdd} />}
      <div className="comments-list">
        {comments.map((comment) => (
          <Comment
            key={comment._id}
            comment={comment}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default Comments;
