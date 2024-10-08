import React from "react";
import { useEffect } from "react";
import { useIdeasContext } from "../hooks/useIdeasContext";
import useAuthContext from "../hooks/useAuthContext";

// components
import IdeaCard from "../components/IdeaCard";
import IdeaForm from "../components/IdeaForm";

function MyAccount() {
  const { ideas, dispatch } = useIdeasContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchIdeas = async () => {
      const response = await fetch("http://localhost:4000/api/ideas/account", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_IDEAS", payload: json });
      }
    };
    if (user) {
      fetchIdeas();
    }
  }, [dispatch, user]);

  return (
    <div>
      <h1 className="text-4xl font-bold">My Posts</h1>
      <div className="ideas">
        {ideas && ideas.map((idea) => <IdeaCard key={idea._id} idea={idea} />)}
      </div>
      <IdeaForm />
    </div>
  );
}

export default MyAccount;
