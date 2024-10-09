import React from "react";
import { useState } from "react";
import { useIdeasContext } from "../hooks/useIdeasContext";
import useAuthContext from "../hooks/useAuthContext";

function IdeaForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [error, setError] = useState(null);
  const { dispatch } = useIdeasContext();
  const [emptyFields, setEmptyFields] = useState([]);
  const { user } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in.");
      return;
    }

    const idea = { title, description, author };

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
      setAuthor("");
      setEmptyFields([]);
      dispatch({ type: "CREATE_IDEA", payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Create a New Idea</h3>
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
      <label>Idea Author:</label>
      <input
        type="text"
        onChange={(e) => setAuthor(e.target.value)}
        value={author}
        className={
          emptyFields.includes("author")
            ? "mt-1 text-sm leading-6 text-gray-600 border-2 border-rose-600/50"
            : "mt-1 text-sm leading-6 "
        }
      />

      <button>Submit</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}

export default IdeaForm;
