import { useState } from "react";
import useAuthContext from "../hooks/useAuthContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const Comment = ({ comment, onEdit, onDelete }) => {
  const [editingMode, setEditingMode] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const { user } = useAuthContext();

  const handleSave = () => {
    onEdit(comment._id, editContent);
    setEditingMode(false);
  };

  return (
    <div className="outline my-2">
      {editingMode ? (
        <div>
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
          />
          <div className="flex justify-end">
            <button onClick={handleSave}>Save</button>
            <button onClick={() => setEditingMode(false)}>Cancel</button>
          </div>
        </div>
      ) : (
        <div>
          <p>{comment.content}</p>
          <div className="comment-meta">
            <span>By {comment.username}</span>
            <span className="text-sm">
              {formatDistanceToNow(new Date(comment.createdAt), {
                addSuffix: true,
              })}
            </span>
            {user && user._id === comment.userId && (
              <div className="comment-actions flex justify-end">
                <button
                  className="btn m-1"
                  onClick={() => setEditingMode(true)}
                >
                  Edit
                </button>
                <button
                  className="btn m-1"
                  onClick={() => onDelete(comment._id)}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Comment;
