import React, { useCallback } from "react";
import { useIdeasContext } from "../hooks/useIdeasContext";
import { formatDistanceToNow } from "date-fns";
import useAuthContext from "../hooks/useAuthContext";

function IdeaCard({ idea, showDeleteButton }) {
  const { dispatch } = useIdeasContext();
  const { user } = useAuthContext();

  const handleDelete = useCallback(async () => {
    if (!user) {
      return;
    }

    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}api/ideas/${idea._id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
          "X-User-ID": user.id,
        },
      }
    );
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_IDEA", payload: json });
    }
  }, [dispatch, idea._id, user]);

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg border-2 border-black m-2">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{idea.title}</div>
        <p className="text-gray-700 text-base">{idea.description}</p>
        <p className="text-gray-700 text-base">
          {formatDistanceToNow(new Date(idea.createdAt), { addSuffix: true })}
        </p>
      </div>

      <div className="px-6 pt-4 pb-2">
        {showDeleteButton && (
          <button
            type="button"
            className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 material-symbols-outlined"
            onClick={handleDelete}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}

export default IdeaCard;
