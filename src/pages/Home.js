import React from "react";
import { useEffect } from "react";
import { useIdeasContext } from "../hooks/useIdeasContext";

function Home() {
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
      <h1 className="text-4xl font-bold">Homepage</h1>
    </div>
  );
}

export default Home;
