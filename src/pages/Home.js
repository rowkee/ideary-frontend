import React from "react";
import { useEffect } from "react";
import { useIdeasContext } from "../hooks/useIdeasContext";

// components
import IdeaCard from "../components/IdeaCard";
import IdeaForm from "../components/IdeaForm";

function Home() {
  const { ideas, dispatch } = useIdeasContext();

  useEffect(() => {
    const fetchIdeas = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/ideas`
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
      <h1 className="text-4xl font-bold">Home</h1>
      <div className="ideas">
        {ideas && ideas.map((idea) => <IdeaCard key={idea._id} idea={idea} />)}
      </div>
      <IdeaForm />
    </div>
  );
}

export default Home;
