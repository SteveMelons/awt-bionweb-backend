import { Box, useTheme } from "@material-ui/core";
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { User } from "../types/User";
import StudectCard from "./StudectCard";
import "../StudectCarousel.css";

interface StudectCarouselProps {
  users: User[];
}

const StudectCarousel: React.FC<StudectCarouselProps> = ({ users }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        flexGrow: 1,
        marginX: theme.spacing(6),
        alignItems: "stretch",
        width: "100%",
      }}
    >
      <Carousel
        autoPlay
        centerMode
        centerSlidePercentage={40}
        showArrows
        infiniteLoop
        emulateTouch
        showThumbs={false}
      >
        {users.map((user, i) => (
          <StudectCard key={user.id} color={i % 3} user={user} />
        ))}
      </Carousel>
    </Box>
  );
};

export default StudectCarousel;
