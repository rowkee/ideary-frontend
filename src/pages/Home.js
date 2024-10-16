import React from "react";
import { useEffect } from "react";
import { useIdeasContext } from "../hooks/useIdeasContext";
import { Link } from "react-router-dom";
import Carousel from "../components/Carousel";

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
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Welcome to the Home of Ideas</h1>
            <div className="py-6">
              A not-so-great man once said "Great ideas are worth exactly shit"
              <br></br>
              <div>......and he was partially right</div>
              <div className="text-lg">Ideas that are not shared are shit.</div>
            </div>
            <Link to="/ideas" className="btn btn-primary">
              See Ideas
            </Link>
          </div>
        </div>
      </div>
      <div>
        <Carousel />
      </div>
    </div>
  );
}

export default Home;
