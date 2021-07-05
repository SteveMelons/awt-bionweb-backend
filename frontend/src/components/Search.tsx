import {
  makeStyles,
  Theme,
  createStyles,
  FormControl,
  InputLabel,
  MenuItem,
  Typography,
  Slider,
  FormControlLabel,
  Button,
  Select,
  Checkbox,
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minWidth: 333,
      maxWidth: 444,
      flexGrow: 1,
      margin: theme.spacing(1),
      padding: theme.spacing(1),
      backgroundColor: theme.palette.background.paper,
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 666,
    },
  })
);

const Search: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <h1>Studect Search</h1>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">
          Please choose your university
        </InputLabel>
        <Select>
          <MenuItem value={"Universität Duisburg"}>
            Universität Duisburg
          </MenuItem>
        </Select>
      </FormControl>

      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">
          Please choose your study program
        </InputLabel>
        <Select>
          <MenuItem value={"Angewandte Informatik"}>
            Angewandte Informatik
          </MenuItem>
          <MenuItem value={"Komedia"}>Komedia</MenuItem>
        </Select>
      </FormControl>

      <FormControl className={classes.formControl}>
        <Typography id="semester-slider" gutterBottom>
          Your actual semester{" "}
        </Typography>
        <Slider
          aria-labelledby="semester-slider"
          valueLabelDisplay="auto"
          defaultValue={1}
          step={1}
          marks
          min={1}
          max={12}
        />
      </FormControl>

      <FormControl className={classes.formControl}>
        <Typography id="people-slider" gutterBottom>
          How many people you are looking for{" "}
        </Typography>
        <Slider
          aria-labelledby="people-slider"
          valueLabelDisplay="auto"
          defaultValue={1}
          step={1}
          marks
          min={1}
          max={10}
        />
      </FormControl>

      <Typography gutterBottom>Preference for same course</Typography>
      <FormControlLabel
        control={<Checkbox name="check1" color="primary" />}
        label="Same course"
      />
      <FormControlLabel
        control={<Checkbox name="check2" color="primary" />}
        label="Does not matter"
      />

      <div>
        <Button variant="contained" color="primary" type="submit">
          Find students
        </Button>
      </div>
    </div>
  );
};

export default Search;
