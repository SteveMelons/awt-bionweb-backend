import { Box, useTheme } from "@material-ui/core";
import React, { createRef, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { User } from "../types/User";
import StudectCard from "./StudectCard";
import "../StudectCarousel.css";
import { mapNumberRange } from "../utils/mapNumberRange";
import { useEffect } from "react";

interface StudectCarouselProps {
  users: User[];
}

const StudectCarousel: React.FC<StudectCarouselProps> = ({ users }) => {
  const theme = useTheme();

  const [sliderState, setSliderState] = useState(80);

  const ref = createRef<HTMLElement>();

  useEffect(() => {
    if (ref?.current?.offsetWidth) {
      const number = mapNumberRange(
        ref?.current?.offsetWidth,
        2560,
        320,
        10,
        90
      );
      setSliderState(number);
    }
  }, []);

  window.addEventListener("resize", () => {
    if (ref?.current?.offsetWidth) {
      const number = mapNumberRange(
        ref?.current?.offsetWidth,
        2560,
        320,
        10,
        90
      );
      setSliderState(number);
    }
  });

  return (
    <Box
      ref={ref}
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
        centerSlidePercentage={sliderState}
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
