import { useState } from "react";
import useAuthContext from "../hooks/useAuthContext";

const CommentForm = ({ ideaId, onCommentAdd }) => {
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState(null);
  const { user } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in to comment");
      return;
    }

    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}api/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          content: newComment,
          ideaId: ideaId,
          author: user.id,
        }),
      }
    );
    const json = await response.json();

    if (response.ok) {
      setNewComment("");
      onCommentAdd(json);
      setError(null);
    } else {
      setError(json.error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Add a comment..."
        required
        className="textarea textarea-bordered w-full"
      />
      <button className="btn mb-1" type="submit">
        Post Comment
      </button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default CommentForm;
