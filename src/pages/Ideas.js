import React from "react";
import { useEffect } from "react";
import { useIdeasContext } from "../hooks/useIdeasContext";

// components
import IdeaCard from "../components/IdeaCard";

function Ideas() {
  const { ideas, dispatch } = useIdeasContext();

  useEffect(() => {
    const fetchIdeas = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}api/ideas`
      );
      const json = await response.json();
      if (response.ok) {
        dispatch({ type: "SET_IDEAS", payload: json });
      }
    };
    fetchIdeas();
  }, [dispatch]);

  return (
    <div>
      <h1 className="text-4xl font-bold ml-6">IDEAAAAASSSSSS</h1>
      <div className="flex flex-auto flex-wrap justify-center">
        {ideas &&
          ideas.map((idea) => (
            <IdeaCard key={idea._id} idea={idea} showDeleteButton={false} />
          ))}
      </div>
    </div>
  );
}

export default Ideas;
