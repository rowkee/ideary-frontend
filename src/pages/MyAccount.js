import React from "react";
import { useEffect } from "react";
import { useIdeasContext } from "../hooks/useIdeasContext";
import useAuthContext from "../hooks/useAuthContext";

// components
import IdeaCard from "../components/IdeaCard";

function MyAccount() {
  const { ideas, dispatch } = useIdeasContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchIdeas = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}api/ideas/account?userId=${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const json = await response.json();
      console.log(json);
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
        {ideas &&
          ideas.map((idea) => (
            <IdeaCard key={idea._id} idea={idea} showDeleteButton={true} />
          ))}
      </div>
    </div>
  );
}

export default MyAccount;
