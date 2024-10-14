import React from "react";
import { useState } from "react";
import { useIdeasContext } from "../hooks/useIdeasContext";
import useAuthContext from "../hooks/useAuthContext";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

function IdeaForm({ isVisible, onClose }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);
  const { dispatch } = useIdeasContext();
  const [emptyFields, setEmptyFields] = useState([]);
  const { user } = useAuthContext();

  if (!isVisible) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in.");
      return;
    }

    const idea = { title, description, createdBy: user.id };

    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}api/ideas`,
      {
        method: "POST",
        body: JSON.stringify(idea),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    const json = await response.json();

    if (!response.ok) {
      setError(json.error || "An unknown error occurred");
      setEmptyFields(json.emptyFields);
      console.log(json);
    }

    if (response.ok) {
      setError(null);
      setTitle("");
      setDescription("");
      setEmptyFields([]);
      dispatch({ type: "CREATE_IDEA", payload: json });
      onClose();
    }
  };

  return (
    <Dialog
      open={isVisible}
      onClose={onClose}
      className="fixed inset-0 z-10 overflow-y-auto"
    >
      <DialogBackdrop className="fixed inset-0 bg-black opacity-30" />
      <div className="flex items-center justify-center min-h-screen">
        <DialogPanel className="bg-white rounded-lg max-w-md mx-auto p-6 z-20">
          <DialogTitle
            as="h3"
            className="text-lg font-medium leading-6 text-gray-900"
          >
            Create a New Idea
          </DialogTitle>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Idea Title:</label>
              <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={
                  emptyFields.includes("title")
                    ? "mt-1 text-sm leading-6 text-gray-600 border-2 border-rose-600/50"
                    : "mt-1 text-sm leading-6 "
                }
              />
            </div>
            <div>
              <label>Idea Description:</label>
              <input
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                className={
                  emptyFields.includes("description")
                    ? "mt-1 text-sm leading-6 text-gray-600 border-2 border-rose-600/50"
                    : "mt-1 text-sm leading-6 "
                }
              />
            </div>
            <div>
              <button className="bg-transparent hover:bg-green-500 text-black font-semibold hover:text-white py-2 px-4 border border-black hover:border-transparent rounded ml-5">
                Submit
              </button>
              <button
                className="bg-transparent hover:bg-red-500 text-black font-semibold hover:text-white py-2 px-4 border border-black hover:border-transparent rounded ml-5"
                onClick={(e) => {
                  e.preventDefault();
                  onClose();
                }}
              >
                Cancel
              </button>
            </div>
            {error && <div className="error">{error}</div>}
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
}

export default IdeaForm;
