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
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <div
          className="hero bg-base-200 min-screen"
          style={{
            backgroundImage: 'url("/hero.jpg")',
            backgroundSize: "cover",
          }}
        >
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h1 className="text-5xl font-bold">
                Welcome to the Home of Ideas
              </h1>
              <div className="py-6">
                "Great ideas are worth exactly shit"
                <div className="text-lg">
                  Unless you share and build together.
                </div>
              </div>
              <Link to="/ideas" className="btn btn-primary">
                Find a great idea
              </Link>
            </div>
          </div>
        </div>
        <h1 className="text-2xl font-bold ml-8">Latest Ideas</h1>
        <Carousel />
      </div>
    </div>
  );
}

export default Home;
