import { Theme } from "@material-ui/core/styles";
import StudectCard from "./StudectCard";
import { makeStyles, createStyles } from "@material-ui/styles";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import "./StudectCarousel.css";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      margin: theme.spacing(6),
      padding: theme.spacing(3),
    },
  })
);

export default function StudectCarousel() {
  const classes = useStyles();

  /*     function StudectList(props) {
            const students = props.students;
            const studentList = students.map((student) =>
                <div key={student.id}>
                    <StudectCard student={student} />
                </div >
            );
            return (
                <div>{studentList}</div>
            );
        } */

  return (
    <div className={classes.root}>
      <Carousel
        autoPlay
        centerMode={true}
        centerSlidePercentage={31}
        showArrows={true}
      >
        {/**Here we need to map the Studectcards. The amount must be always > 1 */}
        <div>{/* <StudectCard /> */}</div>
        <div>{/* <StudectCard /> */}</div>
      </Carousel>
    </div>
    //<StudectList students={students} />
  );
}
