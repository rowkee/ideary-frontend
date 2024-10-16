import React from "react";
import { useIdeasContext } from "../hooks/useIdeasContext";
import IdeaCard from "./IdeaCard";

function Carousel() {
  const { ideas } = useIdeasContext();

  return (
    <div className="carousel carousel-center bg-neutral rounded-box max-w-full space-x-4 p-4">
      <div className="carousel-item">
        {ideas &&
          ideas
            .slice(0, 5)
            .map((idea) => (
              <IdeaCard key={idea._id} idea={idea} showDeleteButton={false} />
            ))}
      </div>
    </div>
  );
}

export default Carousel;
