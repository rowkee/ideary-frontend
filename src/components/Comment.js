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
    <div className="my-2 rounded-lg bg-gray-200">
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
          <div className="comment-meta p-2">
            <div className="flex justify-between">
              <span className="font-bold">
                {comment.username || "Unknown User"}
              </span>
              <span className="text-sm">
                {formatDistanceToNow(new Date(comment.createdAt), {
                  addSuffix: true,
                })}
              </span>
            </div>
            <p>{comment.content}</p>
            {user && user._id === comment.authorId && (
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
