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

    try {
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
            authorId: user._id,
            username: user.username,
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
    } catch (error) {
      setError("Failed to post comment: " + error.message);
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
      <button
        className="btn mb-1 bg-blue-500 hover:bg-blue-400 text-white"
        type="submit"
      >
        Comment
      </button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default CommentForm;
