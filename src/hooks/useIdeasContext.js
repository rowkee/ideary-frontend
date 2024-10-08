import { useContext } from "react";
import { IdeasContext } from "../context/IdeasContext.js";

export const useIdeasContext = () => {
  const context = useContext(IdeasContext);

  if (!context) {
    throw Error("useIdeasContext must be used within an IdeasContextProvider");
  }

  return context;
};
