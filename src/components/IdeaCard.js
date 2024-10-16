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
    <div className="card bg-base-100 w-96 shadow-xl m-2">
      <div className="card-body">
        <h2 className="card-title">{idea.title}</h2>
        <p>{idea.description}</p>

        <div className="card-actions justify-end">
          <p className="text-gray-700 text-base">
            {formatDistanceToNow(new Date(idea.createdAt), { addSuffix: true })}
          </p>
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
    </div>
  );
}

export default IdeaCard;
