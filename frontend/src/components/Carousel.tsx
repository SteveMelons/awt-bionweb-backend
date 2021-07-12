import React from "react";
import { User } from "../types/User";
import StudectCard from "./StudectCard";

interface CarouselProps {
  users: User[];
}

const Carousel: React.FC<CarouselProps> = ({ users }) => {
  return (
    <>
      {users.map((user) => (
        <StudectCard user={user} onClickFavorite={() => {}} />
      ))}
    </>
  );
};

export default Carousel;
